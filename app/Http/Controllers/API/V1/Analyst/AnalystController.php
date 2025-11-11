<?php

namespace App\Http\Controllers\API\V1\Analyst;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Sample;
use App\Models\NParameterMethod;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AnalystController extends Controller
{
    protected function analyst()
    {
        return Auth::user()->analysts;
    }

    public function dashboard()
    {
        $analyst = $this->analyst();

        $orders = Order::where('status', 'pending')
            ->whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->id))
            ->latest()
            ->take(5)
            ->get();

        $stats = [
            'totalOrder' => Order::count(),
            'processedOrder' => Order::where('status', 'in_progress')->count(),
            'completedOrder' => Order::where('status', 'completed')->count(),
        ];

        return response()->json([
            'analyst' => $analyst,
            'orders' => $orders,
            'stats' => $stats,
        ]);
    }

    public function orders()
    {
        $analyst = $this->analyst();

        $orders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->id))
            ->latest()
            ->get();

        return response()->json(['orders' => $orders]);
    }

    public function detail(Order $order)
    {
        $order->load([
            'samples',
            'samples.sample_categories',
            'samples.parameter.unit_values',
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

    public function saveReport(Request $request, $orderId)
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
            return response()->json(['error' => 'File report belum tersedia.'], 404);
        }

        $storagePath = Storage::disk('public')->path($order->result_value);

        if (!file_exists($storagePath)) {
            return response()->json(['error' => 'File tidak ditemukan di server.'], 404);
        }

        return response()->download($storagePath, basename($storagePath), [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
