<?php

namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        // 🔹 Dapatkan ID supervisor yang sedang login
        $supervisorId = auth('sanctum')->user()?->id;

        $orders = Order::with([
            'clients.users',
            'analysesMethods',
            'samples.sample_categories',
        ])
            ->where('supervisor_id', $supervisorId)
            ->whereIn('status', ['received', 'paid', 'received_test'])
            ->orderByRaw("CASE WHEN order_type = 'urgent' THEN 0 ELSE 1 END")
            ->orderBy('order_date', 'asc')
            ->get();
        return response()->json($orders);
    }

    public function history()
    {
        $supervisorId = auth('sanctum')->user()?->id;

        $orders = Order::with([
            'clients.users',
            'analysesMethods',
            'samples.sample_categories',
        ])
            ->where('supervisor_id', $supervisorId)
            ->orderByRaw("CASE WHEN order_type = 'urgent' THEN 0 ELSE 1 END")
            ->orderBy('order_date', 'asc')
            ->get();
        return response()->json($orders);
    }

    public function show(string $id)
    {
        try {
            // 🔹 Dapatkan ID supervisor yang sedang login
            $supervisorId = auth('sanctum')->user()?->id;

            $order = Order::with([
                'clients.users',
                'analysesMethods',
                'samples.sample_categories',
            ])
                ->where('supervisor_id', $supervisorId)
                ->findOrFail($id);

            return response()->json($order);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data order tidak ditemukan atau Anda tidak memiliki akses.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function updateStatus(Request $request, string $id)
    {
        // Validasi simpel (Otomatis error 422 jika gagal)
        $validated = $request->validate([
            'action' => 'required|in:approve,reject',
            'reason' => 'nullable|string'
        ]);

        // 🔹 Dapatkan ID supervisor yang sedang login
        $supervisorId = auth('sanctum')->user()?->id;

        // Cari Order (Otomatis error 404 jika tidak ketemu atau bukan milik supervisor ini)
        $order = Order::where('supervisor_id', $supervisorId)->findOrFail($id);

        // Cek Status Awal (Hanya boleh jika 'received')
        if ($order->status !== 'received') {
            return response()->json([
                'message' => 'Gagal. Status order saat ini bukan received.'
            ], 400);
        }

        // Logika Update Status
        if ($validated['action'] === 'approve') {
            $order->status = 'pending_payment';
        } else {
            $order->status = 'disapproved';
            // Opsional: Simpan alasan reject ke notes jika ada
            if ($request->filled('reason')) {
                $order->notes = $request->reason;
            }
        }

        $order->save();

        return response()->json([
            'message' => 'Status order berhasil diperbarui',
            'data'    => $order
        ]);
    }

    public function submitRepeatTest(Request $request, string $id)
    {
        // Validasi input
        $validated = $request->validate([
            'samples' => 'required|array|min:1',
            'samples.*' => 'integer',
            'notes' => 'required|string',
            'edited_data' => 'nullable|array'
        ]);


        $supervisorId = auth('sanctum')->user()?->id;
        $order = Order::with([
            'samples.n_parameter_methods' => function ($query) {
                $query->where('status', '!=', 'failed');
            },
            'samples.n_parameter_methods.reagents',
            'samples.n_parameter_methods.equipments',
            'samples.n_parameter_methods.test_parameters',
            'samples.n_parameter_methods.test_methods'
        ])->where('supervisor_id', $supervisorId)->findOrFail($id);

        // Process repeat test untuk setiap sample
        foreach ($validated['samples'] as $sampleId) {
            $sample = $order->samples()->find($sampleId);
            if (!$sample) continue;

            $sampleEdits = $validated['edited_data'][$sampleId] ?? [];

            // Ambil semua n_parameter_methods untuk sample ini (exclude yang failed)
            $nParamMethods = $sample->n_parameter_methods()
                ->where('status', '!=', 'failed')
                ->get();

            if ($nParamMethods->isEmpty()) {
                continue;
            }

            // Process setiap parameter method
            foreach ($nParamMethods as $oldNParam) {
                $paramId = $oldNParam->id;
                $editedParam = $sampleEdits['parameters'][$paramId] ?? null;

                // Mark yang lama sebagai 'failed'
                $oldNParam->status = 'failed';
                $oldNParam->save();

                // Selalu buat n_parameter_method baru untuk repeat test
                $newNParam = $oldNParam->replicate();
                $newNParam->status = 'in_progress';
                $newNParam->result = '-'; // Set result ke "-" atau kosong
                $newNParam->save();

                // Jika ada data edited untuk parameter ini, gunakan yang baru, kalo tidak gunakan yang lama
                $reagentsToAttach = [];
                $equipmentsToAttach = [];

                if ($editedParam) {
                    // Gunakan data dari form jika ada
                    $reagentsToAttach = $editedParam['reagents'] ?? [];
                    $equipmentsToAttach = $editedParam['equipments'] ?? [];
                } else {
                    // Jika tidak ada edit, copy dari n_parameter_method yang lama
                    $reagentsToAttach = $oldNParam->reagents()->pluck('reagent_id')->toArray();
                    $equipmentsToAttach = $oldNParam->equipments()->pluck('equipment_id')->toArray();
                }

                // Attach reagents ke pivot table n_reagents dengan timestamp
                if (!empty($reagentsToAttach)) {
                    $reagentData = [];
                    foreach ($reagentsToAttach as $reagentId) {
                        $reagentData[$reagentId] = [
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                    $newNParam->reagents()->attach($reagentData);
                }

                // Attach equipments ke pivot table n_equipments dengan timestamp
                if (!empty($equipmentsToAttach)) {
                    $equipmentData = [];
                    foreach ($equipmentsToAttach as $equipmentId) {
                        $equipmentData[$equipmentId] = [
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];

                        // Update status equipment menjadi 'unavailable'
                        Equipment::where('id', $equipmentId)->update(['status' => 'unavailable']);
                    }
                    $newNParam->equipments()->attach($equipmentData);
                }
            }
        }

        // Update order dengan catatan dan ubah status
        $order->notes = $validated['notes'];
        $order->status = 'revision_test';
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'Permintaan repeat test berhasil dikirim. Data parameter baru telah dibuat.',
            'data' => [
                'order' => $order
            ]
        ]);
    }
}
