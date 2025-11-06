<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnalystController extends Controller
{
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
        // Pastikan file report ada
        if (!$order->report_file_path || !Storage::exists($order->report_file_path)) {
            return back()->with('error', 'File laporan tidak ditemukan.');
        }

        // Ambil nama file agar hasil download rapi
        $filename = 'Laporan_' . ($order->order_number ?? $order->id) . '.pdf';

        // Kembalikan file untuk diunduh
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
}
