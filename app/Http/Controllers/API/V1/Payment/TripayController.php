<?php

namespace App\Http\Controllers\API\V1\Payment;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TripayController extends Controller
{
    public function paymentChannels($id): JsonResponse {
        $user = Auth::user();

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

        $metodeAnalisis = $order->analysesMethods->map(function ($method) {
            return [
                'analyses_method' => $method->analyses_method,
                'final_price'     => $method->pivot->price,
            ];
        });

        $subtotal = $metodeAnalisis->sum(fn($item) => $item['final_price'] ?? 0);
        $admin = 2000;

        $total = $subtotal + $admin;

        $orderData = [
            'name'       => $order->clients->name ?? '-',
            'title'             => $order->title ?? '-',
            'order_number'      => $order->order_number ?? 'M-' . $order->id,
            'status'            => $order->status ?? '-',
            'order_type'    => $order->order_type ?? 'Internal',
            'order_date'     => $order->order_date ? Carbon::parse($order->order_date)->format('d/m/Y') : null,
            'estimate_date'  => $order->estimate_date ? Carbon::parse($order->estimate_date)->format('d/m/Y') : null,
        ];

        //GetChannels Tripay
        $apiKey = config('tripay.api_key');

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_FRESH_CONNECT  => true,
        CURLOPT_URL            => 'https://tripay.co.id/api-sandbox/merchant/payment-channel',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => false,
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer '.$apiKey],
        CURLOPT_FAILONERROR    => false,
        CURLOPT_IPRESOLVE      => CURL_IPRESOLVE_V4
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);

        curl_close($curl);

        $decoded = json_decode($response);
        $response = property_exists($decoded, 'data') ? $decoded->data : $decoded;

        // return $response ? $response : $error;
        return response()->json([
            'success' => true,
            'data' => [
                'order_details'     => $orderData,
                'metode_analisis'   => $metodeAnalisis,
                'payment_summary'   => [
                    'subtotal' => $subtotal,
                    'admin'    => $admin,
                    'total'    => $total,
                ],
                'payment_channels'  => $response ? $response : $error,
            ]
        ]);
    }

    public function requestTransaction($method, $orders) {
        $merchantRef = 'PX-' . time();
        $user = Auth::user();
        
        $apiKey = config('tripay.api_key');
        $privateKey = config('tripay.private_key');
        $merchantCode = config('tripay.merchant_code');

        if (!isset($orders->title) || !isset($orders->price)) {
            return (object) [
                'success' => false,
                'message' => 'Order data is incomplete'
            ];
        }

        $amount = (int) $orders->price;
        
        $data = [
            'method'         => $method,
            'merchant_ref'   => $merchantRef,
            'amount'         => $amount,
            'customer_name'  => $user->name,
            'customer_email' => $user->email,
            'customer_phone' => $user->clients->phone_number ?? '-',
            'order_items'    => [
                [
                    'name'     => $orders->title,
                    'price'    => $amount,
                    'quantity' => 1
                ]
            ],
            // Signature harus menggunakan amount yang sama
            'signature'    => hash_hmac('sha256', $merchantCode.$merchantRef.$amount, $privateKey)
        ];

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_FRESH_CONNECT  => true,
            CURLOPT_URL            => 'https://tripay.co.id/api-sandbox/transaction/create',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => false,
            CURLOPT_HTTPHEADER     => [
                'Authorization: Bearer '.$apiKey,
                'Content-Type: application/json',
                'Accept: application/json'
            ],
            CURLOPT_FAILONERROR    => false,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => json_encode($data),
            CURLOPT_IPRESOLVE      => CURL_IPRESOLVE_V4,
            CURLOPT_TIMEOUT        => 30
        ]);

        $response = curl_exec($curl);
        $error = curl_error($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        
        curl_close($curl);

        // Handle curl error
        if ($error) {
            return (object) [
                'success' => false,
                'message' => 'CURL Error: ' . $error
            ];
        }

        $decoded = json_decode($response);
        
        // Check if response is valid JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            return (object) [
                'success' => false,
                'message' => 'Invalid JSON response: ' . $response
            ];
        }

        // Check Tripay API error
        if ($httpCode !== 200 || (isset($decoded->success) && !$decoded->success)) {
            return (object) [
                'success' => false,
                'message' => $decoded->message ?? 'Unknown error from payment gateway',
                'data' => $decoded
            ];
        }

        return (object) [
            'success' => true,
            'data' => $decoded->data ?? $decoded
        ];
    }

    function detailTransaction($reference) {
        $apiKey = config('tripay.api_key');
        $payload = [
            'reference' => $reference
        ];

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_FRESH_CONNECT  => true,
            CURLOPT_URL            => 'https://tripay.co.id/api-sandbox/transaction/detail?'.http_build_query($payload),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => false,
            CURLOPT_HTTPHEADER     => ['Authorization: Bearer '.$apiKey],
            CURLOPT_FAILONERROR    => false,
            CURLOPT_IPRESOLVE      => CURL_IPRESOLVE_V4
        ]);

        $response = curl_exec($curl);
        $error = curl_error($curl);

        curl_close($curl);

        
        // $response = json_decode($response)->data;
        // return $response ?: $error;
        $decoded = json_decode($response);
        $response = property_exists($decoded, 'data') ? $decoded->data : $decoded;

        return $response ?: $error;
    }
}
