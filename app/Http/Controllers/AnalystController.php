<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Sample;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index()
    {
        $order = Order::where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $stats = [
            'total' => Order::count(),
            'accepted' => Order::where('status', 'in_progress')->count(),
            'finished' => Order::where('status', 'completed')->count(),
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
        $order = $orders->load('samples');

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
        'laporan_path' => $path,
        'waktu_laporan' => now(),
    ]);

    return back()->with('success', 'Laporan berhasil diupload.');
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
}
