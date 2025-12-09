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
        if (!$user || !$user->clients) {
            return response()->json([
                'success' => false,
                'message' => 'Client profile not found'
            ], 404);
        }
        $client = $user->clients->id;

        if (!$request->filled('method')) {
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
            ->where('id', $orderId)
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

        $method = $request->input('method');

        $orderData = (object) [
            'id' => $orders->id,
            'name' => $orders->clients->name ?? '-',
            'order_number' => $orders->order_number ?? 'M-' . $orders->id,
            'title' => $orders->title ?? 'Pembayaran Layanan',
            'price' => $total,
            'quantity' => 1
        ];

        $tripay = new TripayController();
        $tripayResponse = $tripay->requestTransaction($method, $orderData);
        
        $transactionData = isset($tripayResponse->data) ? $tripayResponse->data : $tripayResponse;
        
        if (!isset($transactionData->reference)) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get transaction reference',
                'transaction_response' => $tripayResponse
            ], 500);
        }

        $nAnalysesId = $orders->n_analyses_methods_orders()->exists()
            ? $orders->n_analyses_methods_orders()->first()->id
            : null;

        // Tentukan status awal berdasar response gateway (fallback UNPAID)
        $gatewayStatus = strtolower(data_get($transactionData, 'status', ''));
        $status = $gatewayStatus === 'paid' ? 'PAID' : 'UNPAID';

        Transaction::create([
            'user_id' => $user->id,
            'n_analyses_methods_order_id' => $nAnalysesId ?? $orders->id,
            'reference' => data_get($transactionData, 'reference'),
            'merchant_ref' => data_get($transactionData, 'merchant_ref') ?? data_get($transactionData, 'merchantRef'),
            'total_price' => data_get($transactionData, 'amount', $total),
            'status' => $status
        ]);

        if ($status === 'PAID') {
            $orders->update(['status' => 'paid']);
            
            $redirectUrl = route('receipt.show', ['order_number' => $orders->order_number]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Transaction successfully created.',
            'data' => [
                'reference' => data_get($transactionData, 'reference'),
                'merchant_ref' => data_get($transactionData, 'merchant_ref') ?? data_get($transactionData, 'merchantRef'),
                'amount' => data_get($transactionData, 'amount'),
                'payment_method' => $method,
                'checkout_url' => data_get($transactionData, 'checkout_url'),
                'status' => strtoupper($status),
                'expired_time' => isset($transactionData->expired_time) 
                    ? date('Y-m-d H:i:s', $transactionData->expired_time) 
                    : null,
                'redirect_url' => $redirectUrl ?? null,
                'customer' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'customer_phone' => $user->clients->phone_number ?? '-',
                ],
                'order' => [
                    'name' => $orderData->title,
                    'price' => $orderData->price,
                    'quantity' => 1,
                    'subtotal' => $subtotal,
                    'admin_fee' => $admin,
                    'total' => $total
                ],
                'instructions' => data_get($transactionData, 'instructions')
            ]
        ]);
    }
}