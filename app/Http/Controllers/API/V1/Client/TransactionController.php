<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\API\V1\Payment\TripayController;
use App\Http\Controllers\Controller;
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

        $dbTransaction = Transaction::where('reference', $reference)->first();

        $response = (array) $detail;

        if ($dbTransaction) {
            $status = strtoupper($dbTransaction->status);
            
            $response['status'] = $status;
            $response['original_gateway_status'] = $detail->status ?? null;
            $response['transaction_id'] = $dbTransaction->id;
            
            $tripayStatus = isset($detail->status) ? strtoupper($detail->status) : null;
            $response['is_match_status'] = ($tripayStatus === $status);
            
            if ($status === 'PAID' && Auth::check() && Auth::user()->clients) {
                $clientId = Auth::user()->clients->id;
                
                $order = null;
                
                if (isset($detail->order_items) && count($detail->order_items) > 0) {
                    $orderName = $detail->order_items[0]->name;
                    
                    if (strpos($orderName, 'Order ke-') !== false) {
                        $order = Order::where('client_id', $clientId)
                            ->where('title', $orderName)
                            ->first();
                    }
                }
                
                if (!$order) {
                    $order = Order::where('client_id', $clientId)
                        ->orderBy('created_at', 'DESC')
                        ->first();
                }
                
                if ($order) {
                    $response['redirect_url'] = route('client.orders.receipt.show', ['order_number' => $order->order_number]);
                    $response['order_id'] = $order->id;
                    $response['order_number'] = $order->order_number;
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Transaction detail successfully retrieved.',
            'data' => $response
        ]);
    }

    public function store(Request $request, $order = null)
    {
        $orderId = $order ?? $request->order_id;

        if (!$orderId) {
            return response()->json([
                'success' => false,
                'message' => 'Order ID is required.'
            ], 400);
        }

        $user = Auth::user();
        if (!$user || !$user->clients) {
            return response()->json([
                'success' => false,
                'message' => 'Client profile not found'
            ], 404);
        }

        if (!$request->filled('method')) {
            return response()->json([
                'success' => false,
                'message' => 'Payment method is required'
            ], 400);
        }

        $orderRecord = Order::with(['clients', 'analysesMethods'])
            ->where('client_id', $user->clients->id)
            ->where('id', $orderId)
            ->first();

        if (!$orderRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        $subtotal = $orderRecord->analysesMethods->sum(function($method) {
            return $method->pivot->price;
        });

        $total = $subtotal + 2000;
        $method = $request->input('method');

        $orderData = (object) [
            'id' => $orderRecord->id,
            'name' => $orderRecord->clients->name ?? '-',
            'order_number' => $orderRecord->order_number ?? 'M-' . $orderRecord->id,
            'title' => $orderRecord->title ?? 'Pembayaran Layanan',
            'price' => $total,
            'quantity' => 1
        ];

        $tripay = new TripayController();
        $tripayResponse = $tripay->requestTransaction($method, $orderData);
        
        $transactionData = $tripayResponse->data ?? $tripayResponse;
        
        if (!isset($transactionData->reference)) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get transaction reference'
            ], 500);
        }

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'n_analyses_methods_order_id' => $orderRecord->id,
            'reference' => $transactionData->reference,
            'merchant_ref' => $transactionData->merchant_ref ?? ($transactionData->merchantRef ?? null),
            'total_price' => $transactionData->amount ?? $total,
            'status' => 'UNPAID'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction successfully created.',
            'data' => [
                'reference' => $transactionData->reference,
                'merchant_ref' => $transactionData->merchant_ref ?? ($transactionData->merchantRef ?? null),
                'amount' => $transactionData->amount,
                'payment_method' => $method,
                'checkout_url' => $transactionData->checkout_url,
                'status' => strtoupper($transaction->status),
                'expired_time' => isset($transactionData->expired_time) 
                    ? date('Y-m-d H:i:s', $transactionData->expired_time) 
                    : null,
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
                    'admin_fee' => 2000,
                    'total' => $total
                ],
                'instructions' => $transactionData->instructions ?? null
            ]
        ]);
    }
}