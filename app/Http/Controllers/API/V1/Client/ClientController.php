<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\API\V1\Payment\TripayController;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ClientController extends Controller
{
    /**
     * Get client dashboard data
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        // Get orders with pagination
        $orders = Order::with('clients')
            ->where('client_id', $user->clients->id)
            ->latest()
            ->paginate(10);
        
        // Process table data
        $tableData = $orders->map(function ($order, $index) use ($orders) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'title' => $order->title,
                'estimate_date' => $order->estimate_date ? Carbon::parse($order->estimate_date)->format('d/m/Y') : null,
                'status' => $order->status, // PAKAI YANG BARU
            ];
        });

        // Stats
        $totalOrders = Order::where('client_id', $user->clients->id)
                            ->count();
        $processingOrders = Order::where('client_id', $user->clients->id)
                                ->where('status', 'in_progress')
                                ->count();
        $completedOrders = Order::where('client_id', $user->clients->id)
                            ->where('status', 'completed')
                            ->count();

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_orders' => $totalOrders,
                    'processing_orders' => $processingOrders,
                    'completed_orders' => $completedOrders,
                ],
                'orders' => $tableData,
                'pagination' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'per_page' => $orders->perPage(),
                    'total' => $orders->total(),
                ],
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ]
        ]);
    }

    /**
     * Download receipt (kuitansi)
     */
    public function downloadReceipt($order_number)
    {
        $user = Auth::user();
        
        $order = Order::where('order_number', $order_number)
            ->where('client_id', $user->clients->id)
            ->firstOrFail();

        if (!$order->receipt_file_path) {
            return response()->json([
                'success' => false,
                'message' => 'Receipt not yet generated.'
            ], 404);
        }

        $realPath = storage_path('app/' . $order->receipt_file_path);

        if (!file_exists($realPath)) {
            return response()->json([
                'success' => false,
                'message' => 'Receipt file not found at: ' . $realPath
            ], 404);
        }

        return response()->download(
            $realPath,
            'invoice-' . $order->order_number . '.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }

    /**
     * Download report (laporan hasil tes)
     */
    public function downloadReportFile($orderId)
    {
        $user = Auth::user();
        
        $order = Order::where('id', $orderId)
            ->where('client_id', $user->clients->id)
            ->firstOrFail();

        if (!$order->report_file_path) {
            return response()->json([
                'success' => false,
                'message' => 'Report file not yet generated.'
            ], 404);
        }

        // Path file laporan di storage/app/public/...
        $realPath = storage_path('app/public/' . $order->report_file_path);

        if (!file_exists($realPath)) {
            return response()->json([
                'success' => false,
                'message' => 'Report file not found at: ' . $realPath
            ], 404);
        }

        return response()->download(
            $realPath,
            'report_order_' . $order->order_number . '.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }

    /**
     * Get download options (receipt / report)
     */
    public function getDownloadOptions($order_number)
    {
        $user = Auth::user();
        $clientId = $user->clients->id ?? null;

        if (!$clientId) {
            return response()->json([
                'success' => false,
                'message' => 'Client profile not found.'
            ], 404);
        }

        $order = Order::where('order_number', $order_number)
            ->where('client_id', $clientId)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found.'
            ], 404);
        }

        $options = [
            [
                'label' => 'Download Receipt (Kuitansi)',
                'endpoint' => '/api/v1/client/orders/download-receipt/' . $order_number,
                'type' => 'receipt'
            ]
        ];

        if ($order->result_value && $order->status === 'completed') {
            $options[] = [
                'label' => 'Download Report (Laporan Hasil)',
                'endpoint' => '/api/v1/client/orders/download-report/' . $order->id,
                'type' => 'report'
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Download options retrieved.',
            'data' => [
                'order_number' => $order->order_number,
                'options' => $options
            ]
        ]);
    }

    public function payment(Order $order){
        $tripay = new TripayController();
        $channels = $tripay->paymentChannels($order->id);

        return response()->json([
            'success' => true,
            'message' => 'Payment successfully.',
            'order' => $order,
            'channels' => $channels
        ]);
    }
}