<?php

namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with([
            'clients.users',
            'analysesMethods',
            'samples.sample_categories',
        ])
            ->whereIn('status', ['received', 'paid', 'received_test'])
            ->orderByRaw("CASE WHEN order_type = 'urgent' THEN 0 ELSE 1 END")
            ->orderBy('order_date', 'asc')
            ->get();
        return response()->json($orders);
    }

    public function show(string $id)
    {
        try {
            $order = Order::with([
                'clients.users',
                'analysesMethods',
                'samples.sample_categories',
            ])->findOrFail($id);

            return response()->json($order);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data order tidak ditemukan.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
