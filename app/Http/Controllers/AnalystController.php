<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index()
    {
        $order = Order::where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $stats = [
            'total' => Order::count(),
            'accepted' => Order::where('status', 'in_progress')->count(),
            'finished' => Order::where('status', 'completed')->count(),
        ];

        return Inertia::render('Analyst/Dashboard', [
            'orders' => $order,
            'stats' => $stats,
        ]);
    }

    public function accept(Order $order)
    {
        if ($order->status === 'approved') {
            $order->update(['status' => 'in_progress']);
        }

        return redirect()->route('analyst.order.detail', $order->id);
    }

    public function order() {
        return Inertia::render('analyst/order');
    }

    public function detail(Order $orders) {
        return Inertia::render('analyst/order-detail', [
            'order' => $orders
        ]);
    }

    public function dashboard() {
        return Inertia::render('analyst/dashboard');
    }
}
