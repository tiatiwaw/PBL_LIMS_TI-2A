<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Get orders with pagination
        $orders = Order::with('clients')
            ->where('client_id', $user->id)
            ->latest()
            ->paginate(10);
        
        // Process table data
        $tableData = $orders->map(function ($order, $index) use ($orders) {
            return [
                'no' => $orders->firstItem() + $index,
                'no_order' => $order->order_number,
                'judul_analisis' => $order->title,
                'estimasi_selesai' => $order->estimate_date?->format('d/m/Y'),
                'tanggal_laporan' => $order->report_issued_at?->format('d/m/Y'),
                'tipe_order' => $order->order_type,
                'status' => $order->status,
            ];
        });

        // dd($tableData);
        // Stats
        $totalOrders = Order::where('client_id', $user->id)->count();
        $processingOrders = Order::where('client_id', $user->id)
                                ->where('status', 'in_progress')->count();
        $completedOrders = Order::where('client_id', $user->id)
                            ->where('status', 'approved')->count();

        return Inertia::render('client/index', [
            'stats' => compact('totalOrders', 'processingOrders', 'completedOrders'),
            'orders' => $tableData,
            'pagination' => [ // Tambahkan info pagination untuk frontend
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
            'user' => $user,
        ]);
    }

    public function profile()
    {
        return Inertia::render('client/profile');
    }

    public function history()
    {
        return Inertia::render('client/history/index');
    }

    public function search(Request $request)
    {
        $keyword = $request->input('q');

        $clients = Client::query()
            ->where('name', 'like', "%{$keyword}%")
            ->orWhere('email', 'like', "%{$keyword}%")
            ->orWhere('phone', 'like', "%{$keyword}%")
            ->limit(10)
            ->get(['id', 'name', 'email', 'phone']);

        return $clients;
    }
}