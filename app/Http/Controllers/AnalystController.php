<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Sample;
use App\Models\NParameterMethod;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnalystController extends Controller
{
    // -------------------- WEB VERSION --------------------
    // Show
    public function index()
    {
        $order = Order::where('status', 'pending')
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get();
        
        $stats = [
            'totalOrder' => Order::count(),
            'processedOrder' => Order::where('status', 'in_progress')->count(),
            'completedOrder' => Order::where('status', 'completed')->count(),
        ];
        
        return Inertia::render('analyst/dashboard', [
            'orders' => $order,
            'stats' => $stats,
        ]);
    }
    
    public function dashboard() {
        return Inertia::render('analyst/dashboard');
    }

    public function profile() {
        return Inertia::render('analyst/profile');
    }
    
    public function order() {
        $order = Order::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('analyst/order', [
            'orders' => $order
        ]);
    }

    public function detail(Order $orders)
    {
        $order = $orders->load('samples.sample_categories');

        return Inertia::render('analyst/order-detail', [
            'order' => $order,
            'samples' => $order->samples,
        ]);
    }

    public function accept(Order $order)
    {
        if ($order->status === 'pending') {
            $order->update(['status' => 'in_progress']);
        }

        return redirect()->route('analyst.order.detail', $order->id);
    }
    
    // Status Sample Uji
    public function confirm(Sample $sample)
    {
        $sample->update(['status' => 'Done']);
        return back()->with('success', 'Sampel telah dikonfirmasi selesai.');
    }

    public function unconfirm(Sample $sample)
    {
        $sample->update(['status' => 'In Progress']);
        return back()->with('success', 'Sampel dibatalkan statusnya.');
    }
    // Reports
    public function saveReport(Request $request, $orderId)
    {
        $request->validate([
            'results' => 'required|array',
        ]);

        foreach ($request->results as $result) {
            if (!isset($result['sample_id']) || !isset($result['result'])) {
                continue;
            }

            NParameterMethod::where('sample_id', $result['sample_id'])
                ->update(['result' => $result['result']]);
        }

        return back()->with('success', 'Hasil uji berhasil disimpan.');
    }



    public function submitReport($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Ambil semua sample lewat pivot n_order_samples
        $samples = $order->samples()->get();

        if ($samples->isEmpty()) {
            return back()->with('error', 'Tidak ada sampel untuk dibuatkan laporan.');
        }

        // Ambil semua data parameter-method berdasarkan sample
        $data = [];
        foreach ($samples as $sample) {
            $data[$sample->id] = [
                'sample' => $sample->name,
                'parameters' => NParameterMethod::with([
                    // relasi utama
                    'test_parameters.unit_values',
                    'test_parameters.reference_standards',
                    'test_methods.reference_standards'
                ])
                ->where('sample_id', $sample->id)
                ->get()
                ->map(function ($param) {
                    return [
                        'parameter_name' => $param->test_parameters->name ?? '-',
                        'unit' => $param->test_parameters->unit_values->value ?? '-',
                        'reference' => $param->test_parameters->reference_standards->name ?? '-',
                        'method' => $param->test_methods->name ?? '-',
                        'method_reference' => $param->test_methods->reference_standards->name ?? '-',
                        'result' => $param->result ?? '-',
                    ];
                }),
            ];
        }

        // Generate PDF
        $pdf = Pdf::loadView('pdf.report', [
            'order' => $order,
            'data' => $data,
        ]);

        // Simpan ke storage
        $fileName = 'report_order_' . $order->id . '.pdf';
        $filePath = 'reports/' . $fileName;
        Storage::disk('public')->put($filePath, $pdf->output());

        // Update path ke tabel orders.result_value
        $order->update(['result_value' => $filePath]);

        return back()->with('success', 'Report berhasil dibuat dan disimpan.');
    }


   public function downloadReport($orderId)
    {
        $order = \App\Models\Order::findOrFail($orderId);

        if (!$order->result_value) {
            return back()->with('error', 'File report belum tersedia.');
        }
        $relativePath = $order->result_value; 
        $storagePath = Storage::disk('public')->path($relativePath);

        if (!file_exists($storagePath)) {
            return back()->with('error', 'File report tidak ditemukan di server.');
        }

        return response()->download($storagePath, basename($storagePath), [
            'Content-Type' => 'application/pdf',
        ]);
    }



    // -------------------- API VERSION --------------------

    public function apiDashboard()
    {
        return response()->json([
            'status' => true,
            'data' => [
                'orders' => Order::where('status', 'pending')
                    ->orderBy('created_at', 'desc')
                    ->take(5)
                    ->get(),
                'stats' => [
                    'totalOrder' => Order::count(),
                    'processedOrder' => Order::where('status', 'in_progress')->count(),
                    'completedOrder' => Order::where('status', 'completed')->count(),
                ]
            ]
        ]);
    }

    public function apiAccept(Order $order)
    {
        if ($order->status === 'pending') {
            $order->update(['status' => 'in_progress']);
        }

        return response()->json([
            'status' => true,
            'message' => 'Order diterima.',
            'data' => $order
        ]);
    }

    public function apiOrders()
    {
        return response()->json([
            'status' => true,
            'data' => Order::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function apiOrderDetail($id)
    {
        $order = Order::with('samples.sample_categories')->find($id);

        if (!$order) {
            return response()->json(['status' => false, 'message' => 'Order tidak ditemukan'], 404);
        }

        return response()->json(['status' => true, 'data' => $order]);
    }

    public function apiUploadReport(Request $request, Order $order)
    {
        $request->validate([
            'laporan' => 'required|mimes:pdf|max:5120'
        ]);

        $path = $request->file('laporan')->store('public/reports');

        $order->update([
            'report_file_path' => $path,
            'waktu_laporan' => now(),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Laporan berhasil diupload',
            'data' => $order
        ]);
    }

    public function apiDownloadReport(Order $order)
    {
        if (!$order->report_file_path || !Storage::exists($order->report_file_path)) {
            return response()->json(['status' => false, 'message' => 'File tidak ditemukan'], 404);
        }

        return response()->download(storage_path("app/" . $order->report_file_path));
    }

    public function apiConfirm(Sample $sample)
    {
        $sample->update(['status' => 'Done']);

        return response()->json(['status' => true, 'message' => 'Sampel dikonfirmasi', 'data' => $sample]);
    }

    public function apiUnconfirm(Sample $sample)
    {
        $sample->update(['status' => 'In Progress']);

        return response()->json(['status' => true, 'message' => 'Konfirmasi dibatalkan', 'data' => $sample]);
    }

    public function apiDashboardPage()
    {
        return response()->json(['status' => true, 'page' => 'dashboard']);
    }

    public function apiProfile()
    {
        return response()->json(['status' => true, 'page' => 'profile']);
    }
}
