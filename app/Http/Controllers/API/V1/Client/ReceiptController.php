<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\API\V1\Payment\TripayController;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReceiptController extends Controller
{
    public function index(Request $request, $order_number)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.'
            ], 401);
        }

        $clientId = $user->clients->id ?? null;

        if (!$clientId) {
            return response()->json([
                'success' => false,
                'message' => 'Client profile not found.'
            ], 404);
        }

        $orders = Order::with(['analysesMethods', 'clients', 'n_analyses_methods_orders'])
            ->where('order_number', $order_number)
            ->where('client_id', $clientId)
            ->first();

        if (!$orders) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found for this client.'
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

        // optional payment method coming from query ?method=...
        // $paymentMethod = $request->query('method') ?? null;

        $orderSummary = [
            'order_number' => $orders->order_number,
            'title'        => $orders->title ?? '-',
            'customer_name'     => $orders->clients->name ?? '-',
            'subtotal' => $subtotal,
            'admin'    => $admin,
            'total'    => $total,
        ];

        $nAnalysesIds = $orders->n_analyses_methods_orders->pluck('id')->toArray();

        $transaction = null;

        if (!empty($nAnalysesIds)) {
            $transaction = Transaction::whereIn('n_analyses_methods_order_id', $nAnalysesIds)
                ->where('user_id', $user->id)
                ->orderByDesc('created_at')
                ->first();
        }

        if (!$transaction) {
            $transaction = Transaction::where('n_analyses_methods_order_id', $orders->id)
                ->where('user_id', $user->id)
                ->orderByDesc('created_at')
                ->first();
        }

        $tripayDetail = null;

        $reference = $transaction->reference ?? null;
        if ($reference) {
            $tripay = new TripayController();
            $tripayDetail = $tripay->detailTransaction($reference);
        }

        $getTripay = function ($key) use ($tripayDetail) {
            if (is_string($tripayDetail) || $tripayDetail === null) return null;
            return data_get($tripayDetail, $key);
        };

        $paymentMethod = $request->query('method') ?? $getTripay('payment_method') ?? null;

        if (is_string($tripayDetail) && !$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Failed fetching tripay detail.',
                'error' => $tripayDetail,
                'order' => $orderSummary
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Receipt retrieved.',
            'data' => [
                'order' => $orderSummary,
                'reference' => $reference,
                'merchant_ref' => $getTripay('merchant_ref') ?? ($transaction->merchant_ref ?? null),
                'amount' => $getTripay('amount') ?? ($transaction->total_price ?? null),
                'status' => strtoupper($getTripay('status') ?? ($transaction->status ?? 'UNPAID')),
                'payment_method' => $paymentMethod,
                'order_date' => $orders->order_date ? $orders->created_at : null,
                'expired_time' => $getTripay('expired_time') ? date('Y-m-d H:i:s', $getTripay('expired_time')) : null,
            ],
        ]);
    }
}
