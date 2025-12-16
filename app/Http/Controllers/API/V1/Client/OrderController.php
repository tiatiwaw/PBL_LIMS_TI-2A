<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class OrderController extends Controller
{
    /**
     * Get client orders
     */
    public function show($id): JsonResponse
    {
        $user = Auth::user();

        // Ambil client ID dari user yang login
        $clientId = $user->clients->id;
        
        $order = Order::with([
                'samples.sample_categories', 
                'clients',
                'analysesMethods' // Gunakan relationship many-to-many
            ])
            ->where('client_id',$clientId)
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false, 
                'message' => 'Order tidak ditemukan'
            ], 404);
        }

        // Ambil nama metode analisis dari field 'analyses_method'
        $metodeAnalisis = $order->analysesMethods->isNotEmpty() 
            ? $order->analysesMethods->pluck('analyses_method')->join(', ') 
            : 'Tidak ada metode';

        $orderData = [
            'id' => $order->id, 
            'id_pemesanan' => $order->order_number ?? 'M-' . $order->id,
            'id_client' => $order->client_id,
            'judul' => $order->title ?? '-',
            'metode_analisis' => $metodeAnalisis, 
            'nilai_hasil' => $order->result_value ?? '98',
            'tanggal_order' => $order->order_date ? Carbon::parse($order->order_date)->format('d/m/Y') : null,
            'tanggal_estimasi' => $order->estimate_date ? Carbon::parse($order->estimate_date)->format('d/m/Y') : null,
            'waktu_laporan' => $order->report_issued_at ? Carbon::parse($order->report_issued_at)->format('d/m/Y H:i:s') : null,
            'direktori_file' => $order->report_file_path ?? 'C:/ /',
            'catatan' => $order->notes ?? '-',
            'tipe_pemesanan' => $order->order_type ?? 'Internal'
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'order_details' => $orderData,
                'table_data_sample' => $order->samples,
            ]
        ]); 
    }

        /**
     * Download laporan hasil analisis (PDF/DOC/ZIP)
     */
    public function downloadReport($orderId)
    {
        $order = Order::findOrFail($orderId);

        if (!$order->result_value) {
            abort(404, 'Laporan belum digenerate.');
        }

        $realPath = storage_path('app/public/reports/client/' . $order->report_file_path);

        if (!file_exists($realPath)) {
            abort(404, 'File laporan tidak ditemukan.');
        }

        return response()->download(
            $realPath,
            'Laporan_Order_' . $order->id . '.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }    
}