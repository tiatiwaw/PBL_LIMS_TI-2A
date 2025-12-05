<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\API\V1\Payment\TripayController;
use App\Http\Controllers\Controller;
use App\Models\NAnalysesMethodsOrder;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function show($reference)
    {
        $tripay = new TripayController();
        $detail = $tripay->detailTransaction($reference);

        return response()->json([
            'success' => true,
            'message' => 'Transaction detail successfully retrieved.',
            'data' => $detail
        ]);
    }

    public function store(Request $request, $order = null)
    {
        if (!$order && !$request->has('order_id')) {
            return response()->json([
                'success' => false,
                'message' => 'Order ID is required. Please provide order ID in URL or request body.'
            ], 400);
        }
        
        $orderId = $order ?? $request->order_id;

        $user = Auth::user();
        if (!$user->clients) {
            return response()->json([
                'success' => false,
                'message' => 'Client profile not found'
            ], 404);
        }
        $client = $user->clients->id;

        if (!$request->has('method') || empty($request->method)) {
            return response()->json([
                'success' => false,
                'message' => 'Payment method is required'
            ], 400);
        }

        $orders = Order::with([
                'clients',
                'analysesMethods'
            ])
            ->where('client_id', $client)
            ->where('id', $orderId) // Pakai $orderId yang sudah di-resolve
            ->first();

        if (!$orders) {
            return response()->json([
                'success' => false,
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        $analysesMethodSum = $orders->analysesMethods->map(function ($method) {
            return [
                'analyses_method' => $method->analyses_method,
                'total_amount'     => $method->pivot->price,
            ];
        });

        $subtotal = $analysesMethodSum->sum(fn($item) => $item['total_amount'] ?? 0);
        $admin = 2000;

        $total = $subtotal + $admin;

        $method = $request->method;

        $orderData = (object) [
            'id' => $orders->id,
            'name' => $orders->clients->name ?? '-',
            'order_number' => $orders->order_number ?? 'M-' . $orders->id,
            'title' => $orders->title ?? 'Pembayaran Layanan',
            'price' => $total,
            'quantity' => 1
        ];

        $tripay = new TripayController();
        $transaction = $tripay->requestTransaction($method, $orderData);
        
        $transactionData = isset($transaction->data) ? $transaction->data : $transaction;
        
        if (!isset($transactionData->reference)) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get transaction reference',
                'transaction_response' => $transaction
            ], 500);
        }

        Transaction::create([
            'user_id' => Auth::user()->id,
            'n_analyses_methods_order_id' => $orders->id,
            'reference' => $transactionData->reference,
            'merchant_ref' => $transactionData->merchant_ref ?? null,
            'total_price' => $transactionData->amount ?? $total, // FIX: Pakai $total
            'payment_status' => $transactionData->status ?? 'PENDING'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction successfully created.',
            'data' => [
                'reference' => $transactionData->reference,
                'merchant_ref' => $transactionData->merchant_ref,
                'amount' => $transactionData->amount,
                'payment_method' => $method,
                'checkout_url' => $transactionData->checkout_url,
                'status' => $transactionData->status,
                'expired_time' => isset($transactionData->expired_time) 
                    ? date('Y-m-d H:i:s', $transactionData->expired_time) 
                    : null,
                'customer' => [
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email
                ],
                'order' => [
                    'name' => $orderData->title,
                    'price' => $orderData->price,
                    'quantity' => 1,
                    'subtotal' => $subtotal, // Tambahkan detail
                    'admin_fee' => $admin,
                    'total' => $total
                ]
            ]
        ]);
    }
}
