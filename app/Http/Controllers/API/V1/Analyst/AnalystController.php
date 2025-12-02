<?php

namespace App\Http\Controllers\API\V1\Analyst;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Sample;
use App\Models\NParameterMethod;
use App\Models\Reagent;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AnalystController extends Controller
{
    protected function analyst()
    {
        return Auth::user();
    }

    public function dashboard(Request $request): JsonResponse
    {
        $analyst = $this->analyst();
        $orders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->id));
        $stats = [
            'totalOrder' => $orders->count(),
            'processedOrder' => $orders->where('status', 'in_progress')->count(),
            'completedOrder' => $orders->where('status', 'completed')->count(),
        ];

        $pendingOrders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->id))->where('status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'analyst' => $analyst,
            'orders' => $pendingOrders,
            'stats' => $stats,
        ]);
    }

    public function orders()
    {
        $analyst = $this->analyst();

        $orders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->id))
            ->whereNot('status', 'pending')
            ->latest()
            ->get();

        return response()->json(['orders' => $orders]);
    }

    public function detail(Order $order)
    {
        $order->load([
            'samples',
            'samples.sample_categories',
            'samples.n_parameter_methods.test_parameters.unit_values',
            'samples.n_parameter_methods.reagents',
            'samples.n_parameter_methods.equipments',
            'samples.test_method',
        ]);

        return response()->json([
            'order' => $order,
            'samples' => $order->samples,
        ]);
    }

    public function accept(Order $order)
    {
        if ($order->status === 'pending') {
            $order->update(['status' => 'in_progress']);
        }

        return response()->json([
            'message' => 'Order diterima.',
            'order' => $order,
        ]);
    }

    public function confirm(Sample $sample)
    {
        $sample->update(['status' => 'done']);
        return response()->json([
            'message' => 'Sampel telah dikonfirmasi selesai.',
            'sample' => $sample,
        ]);
    }

    public function unconfirm(Sample $sample)
    {
        $sample->update(['status' => 'in_progress']);
        return response()->json([
            'message' => 'Status sampel dibatalkan.',
            'sample' => $sample,
        ]);
    }

    public function saveReport(Request $request)
    {
        $validated = $request->validate([
            'results' => 'required|array',
        ]);

        foreach ($validated['results'] as $result) {
            NParameterMethod::where('sample_id', $result['sample_id'])
                ->where('test_parameter_id', $result['parameter']['id'])
                ->update(['result' => $result['result']]);

            $sample = Sample::findOrFail($result['sample_id']);
            $totalParams = NParameterMethod::where('sample_id', $sample->id)->count();
            $allDone = NParameterMethod::where('sample_id', $sample->id)
                ->whereNotNull('result')
                ->count();

            $sample->status = $allDone == $totalParams ? 'done' : 'in_progress';
            $sample->save();
        }

        return response()->json(['message' => 'Hasil uji berhasil disimpan.']);
    }

    public function submitReport($orderId)
    {
        $order = Order::findOrFail($orderId);

        $samples = $order->samples()->with([
            'parameter.unit_values',
            'parameter.reference_standards',
        ])->get();

        if ($samples->isEmpty()) {
            return response()->json(['error' => 'Tidak ada sampel untuk dibuatkan laporan.'], 400);
        }

        $data = $samples->map(function ($sample) {
            return [
                'sample' => $sample->name,
                'parameters' => $sample->parameter->map(function ($param) {
                    return [
                        'parameter_name' => $param->name ?? '-',
                        'unit' => $param->unit_values->value ?? '-',
                        'reference' => $param->reference_standards->name ?? '-',
                        'result' => $param->pivot->result ?? '-',
                    ];
                })->toArray(),
            ];
        })->toArray();

        // Generate PDF
        $pdf = Pdf::loadView('pdf.report', [
            'order' => $order,
            'data' => $data,
        ]);

        $fileName = 'report_order_' . $order->id . '.pdf';
        $filePath = 'reports/' . $fileName;
        Storage::disk('public')->put($filePath, $pdf->output());

        $order->update(['result_value' => $filePath]);

        return response()->json([
            'message' => 'Report berhasil dibuat dan disimpan.',
            'file_path' => $filePath,
        ]);
    }

    public function downloadReport($orderId)
    {
        $order = Order::findOrFail($orderId);

        if (!$order->result_value) {
            abort(404, 'Laporan belum digenerate.');
        }

        $filePath = storage_path('app/public/' . $order->result_value);

        if (!file_exists($filePath)) {
            abort(404, 'File laporan tidak ditemukan.');
        }

        // Kirim file langsung → browser otomatis download
        return response()->download(
            $filePath,
            'Laporan_Order_' . $order->id . '.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }

    /**
     * Menyimpan data penggunaan reagent dan update stok.
     */
    public function saveReagentUsage(Request $request): JsonResponse
    {
        // 1. Validasi Input Array
        $request->validate([
            'usages' => 'required|array',
            'usages.*.sample_id' => 'required|exists:samples,id',
            'usages.*.reagent_id' => 'required|exists:reagents,id',
            // Gunakan min:0 agar user bisa membatalkan input (set ke 0) jika salah ketik
            'usages.*.volume_used' => 'required|numeric|min:0',
        ]);

        $responseData = [];
        $errors = [];

        try {
            // Gunakan Transaction agar aman (jika 1 gagal, semua batal)
            DB::transaction(function () use ($request, &$responseData, &$errors) {

                foreach ($request->usages as $index => $usage) {
                    $sampleId = $usage['sample_id'];
                    $reagentId = $usage['reagent_id'];
                    $newUsage = (float) $usage['volume_used'];

                    // A. Cari NParameterMethod berdasarkan sample_id
                    $nParameterMethod = NParameterMethod::where('sample_id', $sampleId)->first();

                    if (!$nParameterMethod) {
                        continue;
                    }

                    // B. Cari Data Reagent (Master) & Data Pivot (History Pemakaian)
                    // LockForUpdate untuk mencegah race condition saat stok menipis
                    $reagentMaster = Reagent::where('id', $reagentId)->lockForUpdate()->first();

                    $reagentPivot = $nParameterMethod->reagents()
                        ->where('reagents.id', $reagentId)
                        ->first();

                    if ($reagentMaster && $reagentPivot) {
                        // C. Hitung Selisih (Delta)
                        // Nilai lama di database (jika null anggap 0)
                        $oldUsage = (float) ($reagentPivot->pivot->used_reagent ?? 0);

                        // Delta: Berapa banyak perubahan yang terjadi
                        // Contoh: Lama 2, Baru 5. Delta = 3 (Stok harus dikurangi 3)
                        // Contoh: Lama 5, Baru 2. Delta = -3 (Stok harus ditambah 3/dikembalikan)
                        $difference = $newUsage - $oldUsage;

                        // Jika ada perubahan nilai
                        if ($difference != 0) {

                            // D. Validasi Stok (Hanya jika stok berkurang / Delta Positif)
                            if ($difference > 0) {
                                if ($reagentMaster->stock < $difference) {
                                    // Lempar exception agar transaction di-rollback
                                    throw new \Exception("Stock reagent '{$reagentMaster->name}' tidak mencukupi! Sisa: {$reagentMaster->stock}, Dibutuhkan tambahan: {$difference}");
                                }

                                // Kurangi Stock
                                $reagentMaster->decrement('stock', $difference);
                            } else {
                                // Jika difference negatif (misal input dikurangi), kembalikan ke stock
                                // abs() mengubah -3 menjadi 3
                                $reagentMaster->increment('stock', abs($difference));
                            }

                            // E. Update Tabel Pivot (n_reagent -> column used_reagent)
                            // Kita pakai updateExistingPivot (bukan create) supaya tidak duplikat row
                            $nParameterMethod->reagents()->updateExistingPivot($reagentId, [
                                'used_reagent' => $newUsage
                            ]);
                        }

                        // Simpan data untuk respon
                        $responseData[] = [
                            'sample_id' => $sampleId,
                            'reagent_name' => $reagentMaster->name,
                            'used_reagent' => $newUsage,
                            'remaining_stock' => $reagentMaster->stock
                        ];
                    }
                }
            });

            return response()->json([
                'message' => 'Reagent usage recorded & stock updated successfully.',
                'results' => $responseData
            ], 201); // 201 Created/Success

        } catch (\Exception $e) {
            // Tangkap error stok tidak cukup atau error database lainnya
            return response()->json([
                'message' => 'Gagal menyimpan data reagent.',
                'error' => $e->getMessage()
            ], 400); // 400 Bad Request
        }
    }
}
