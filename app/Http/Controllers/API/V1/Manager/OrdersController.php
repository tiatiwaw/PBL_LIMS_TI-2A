<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrdersController extends Controller
{
    // GET /api/v1/manager/orders
    public function index()
    {
        try {
            $orders = Order::all();
            return response()->json($orders, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch orders',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // PUT /api/v1/manager/orders/{id}
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        //
        $validated = $request->validate([
            'status' => 'required|string|max:255',
        ]);

        try {
            $order->update($validated);
            return response()->json($order, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update order',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
