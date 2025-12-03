<?php

namespace App\Http\Controllers\API\V1\Analyst;

use App\Models\Order;
use App\Models\Sample;
use App\Models\Reagent;
use App\Models\NReagent;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\NParameterMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        if (in_array($order->status, ['pending', 'paid'])) {
            // 1. Update status order
            $order->update(['status' => 'in_progress']);

            // 2. Update semua sample milik order
            $order->samples()
                ->where('status', 'pending')
                ->update(['status' => 'in_progress']);
        }

        return response()->json([
            'message' => 'Order diterima',
            'order' => $order,
            'samples_updated' => $order->samples()->get()
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
    public function saveReagentUsage(Request $request)
    {
        $request->validate([
            'n_parameter_method_id' => 'required|exists:n_parameter_methods,id',
            'reagent_id' => 'required|exists:reagents,id',
            'reagent_used' => 'required|numeric|min:1',
        ]);

        // Ambil reagent
        $reagent = Reagent::findOrFail($request->reagent_id);

        // Cek stock cukup
        if ($reagent->stock < $request->reagent_used) {
            return response()->json([
                'message' => 'Stock reagent tidak mencukupi!'
            ], 400);
        }

        // Kurangi stock reagent
        $reagent->decrement('stock', $request->reagent_used);

        // Catat ke N_Reagent
        $nReagent = NReagent::create([
            'n_parameter_method_id' => $request->n_parameter_method_id,
            'reagent_id' => $request->reagent_id,
            'reagent_used' => $request->reagent_used,
        ]);

        return response()->json([
            'message' => 'Reagent usage recorded & stock updated',
            'data' => $nReagent
        ], 201);
    }
}
