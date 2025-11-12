<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrdersController extends Controller
{
    /**
     * Menampilkan semua data order.
     */
    public function index()
    {
        try {
            // Ambil data order beserta relasi client, samples, dan analysts
            $orders = Order::with(['clients', 'samples', 'analysts'])->get();

            return response()->json($orders);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
