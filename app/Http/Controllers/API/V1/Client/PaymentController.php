<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Get client orders + summary pembayaran
     */
    public function show($id): JsonResponse
    {
        $user = Auth::user();

        // Ambil client ID dari user yang login
        $clientId = $user->clients->id;

        $order = Order::with([
                'clients',
                'analysesMethods'
            ])
            ->where('client_id', $clientId)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        /**
         * =====================
         *   METODE ANALISIS
         * =====================
         */
        $metodeAnalisis = $order->analysesMethods->map(function ($method) {
            return [
                'analyses_method' => $method->analyses_method,
                'harga_final'     => $method->pivot->price,
            ];
        });

        /**
         * =============================
         *   HITUNG PAYMENT SUMMARY
         * =============================
         */

        // SUBTOTAL
        $subtotal = $metodeAnalisis->sum(fn($item) => $item['harga_final'] ?? 0);

        // PPN 11%
        $ppn = floor($subtotal * 0.11);

        // DISKON tidak ada → selalu 0
        $diskon = 0;

        // ADMIN FEE statis → tidak tersimpan di database
        $admin = 2000;

        // TOTAL = subtotal + ppn + admin fee
        $total = $subtotal + $ppn + $admin;

        /**
         * =============================
         *   DATA ORDER UTAMA
         * =============================
         */
        $orderData = [
            'nama_client'       => $order->clients->name ?? '-',
            'judul'             => $order->title ?? '-',
            'id_pemesanan'      => $order->order_number ?? 'M-' . $order->id,
            'status'            => $order->status ?? '-',
            'tipe_pemesanan'    => $order->order_type ?? 'Internal',
            'tanggal_order'     => $order->order_date ? Carbon::parse($order->order_date)->format('d/m/Y') : null,
            'tanggal_estimasi'  => $order->estimate_date ? Carbon::parse($order->estimate_date)->format('d/m/Y') : null,
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'order_details'     => $orderData,
                'metode_analisis'   => $metodeAnalisis,
                'payment_summary'   => [
                    'subtotal' => $subtotal,
                    'ppn'      => $ppn,
                    'diskon'   => $diskon,
                    'admin'    => $admin,
                    'total'    => $total,
                ]
            ]
        ]);
    }
}
