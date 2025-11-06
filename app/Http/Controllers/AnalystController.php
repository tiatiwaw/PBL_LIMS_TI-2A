<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnalystController extends Controller
{
    // -------------------- WEB VERSION --------------------

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

    public function accept(Order $order)
    {
        if ($order->status === 'pending') {
            $order->update(['status' => 'in_progress']);
        }

        return redirect()->route('analyst.order.detail', $order->id);
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

    public function uploadReport(Request $request, Order $order)
    {
        $request->validate([
            'laporan' => 'required|mimes:pdf|max:5120'
        ]);

        $path = $request->file('laporan')->store('public/reports');

        $order->update([
            'report_file_path' => $path,
            'waktu_laporan' => now(),
        ]);

        return back()->with('success', 'Laporan berhasil diupload.');
    }

    public function downloadReport(Order $order)
    {
        if (!$order->report_file_path || !Storage::exists($order->report_file_path)) {
            return back()->with('error', 'File laporan tidak ditemukan.');
        }

        $filename = 'Laporan_' . ($order->order_number ?? $order->id) . '.pdf';

        return Storage::download($order->report_file_path, $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    }

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

    public function dashboard() {
        return Inertia::render('analyst/dashboard');
    }

    public function profile() {
        return Inertia::render('analyst/profile');
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
