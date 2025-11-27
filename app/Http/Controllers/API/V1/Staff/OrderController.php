<?php

namespace App\Http\Controllers\API\V1\Staff;

use App\Http\Controllers\Controller;
use App\Models\AnalysesMethod;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\NAnalysesMethodsOrder;
use App\Models\NOrderSample;
use App\Models\Order;
use App\Models\SampleCategory;

class OrderController extends Controller
{

    public function index()
    {
        $methods = AnalysesMethod::all();
        $clients = Client::all();
        $categories = SampleCategory::all();
        // 🔹 Buat nomor order otomatis
        $lastOrder = Order::latest('id')->first();
        $nextNumber = str_pad(($lastOrder ? $lastOrder->id + 1 : 1), 4, '0', STR_PAD_LEFT);
        $orderNumber = 'ORD-' . now('Asia/Jakarta')->format('Ymd') . '-' . $nextNumber;

        return response()->json([
            'methods' => $methods,
            'clients' => $clients,
            'categories' => $categories,
            'orderNumber' => $orderNumber,
        ]);
    }
    /**
     * Mendapatkan supervisor_id berikutnya dengan rotasi otomatis
     */
    private function getNextSupervisorId()
    {
        // Ambil semua supervisor (user dengan role supervisor)
        $supervisors = \App\Models\User::role('supervisor')->orderBy('id')->pluck('id')->toArray();

        if (empty($supervisors)) {
            return null;
        }

        // Ambil supervisor_id terakhir dari order
        $lastOrder = Order::latest('id')->first();
        $lastSupervisorId = $lastOrder?->supervisor_id;

        if (!$lastSupervisorId) {
            // Jika belum ada order sebelumnya, mulai dari supervisor pertama
            return $supervisors[0];
        }

        // Cari index dari supervisor_id terakhir
        $currentIndex = array_search($lastSupervisorId, $supervisors);

        // Jika supervisor tidak ditemukan atau sudah di akhir, kembali ke awal
        if ($currentIndex === false || $currentIndex >= count($supervisors) - 1) {
            return $supervisors[0];
        }

        // Return supervisor berikutnya
        return $supervisors[$currentIndex + 1];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'selectedKlien.id' => ['required', 'exists:clients,id'],
            'nomorOrder' => ['required', 'string'],
            'judulOrder' => ['required', 'string'],
            'metodeAnalisis' => ['array'],
            'metodeAnalisis.*.id' => ['nullable', 'integer'],
            'metodeAnalisis.*.price' => ['nullable', 'integer'],
            'metodeAnalisis.*.description' => ['nullable', 'string'],
            'tipeOrder' => ['required', 'string', 'in:internal,regular,external,urgent'],
            'tanggalOrder' => ['nullable', 'date'],
            'estimasiSelesai' => ['nullable', 'date'],
            'catatan' => ['nullable', 'string'],
            'totalHarga' => ['required', 'integer'],
            'samples' => ['array'],
            'samples.*.id' => ['nullable', 'integer'],
            'samples.*.name' => ['nullable', 'string'],
            'samples.*.form' => ['nullable', 'string'],
            'samples.*.condition' => ['nullable', 'string'],
            'samples.*.sample_category_id' => ['nullable', 'integer'],
            'samples.*.sample_volume' => ['nullable', 'string'],
        ]);

        DB::transaction(function () use ($data) {
            // 🔹 Dapatkan supervisor_id berikutnya dengan rotasi
            $supervisorId = $this->getNextSupervisorId();

            // 🔹 Simpan order utama
            $order = Order::create([
                'client_id' => $data['selectedKlien']['id'],
                'supervisor_id' => $supervisorId,
                'order_number' => $data['nomorOrder'],
                'title' => $data['judulOrder'],
                'result_value' => '-',
                'order_date' => now('Asia/Jakarta')->toDateString(),
                'estimate_date' => $data['estimasiSelesai'] ?? null,
                'report_issued_at' => null,
                'report_file_path' => '-',
                'notes' => $data['catatan'] ?? '-',
                'order_type' => $data['tipeOrder'],
                'status' => 'received',
            ]);

            // 🔹 Simpan sample order
            foreach ($data['samples'] as $sampleData) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sampleData['id'],
                    'sample_volume' => $sampleData['sample_volume'] ?? null,
                ]);
            }

            // simpan analyses method order
            foreach ($data['metodeAnalisis'] as $methodData) {
                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $methodData['id'],
                    'price' => $methodData['price'],
                    'description' => $methodData['description'] ?? '-',
                ]);
            }
        });

        return response()->json([
            'message' => 'Order berhasil dibuat.',
            'data' => $data,
        ], 201);
    }
}
