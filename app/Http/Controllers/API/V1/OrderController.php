<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::with([
            'clients.users',
            'analysts',
            'analysesMethods',
            'samples.sample_categories',
            'samples.n_parameter_methods' => function ($query) {
                $query->with([
                    'test_parameters.unit_values',
                    'test_parameters.reference_standards',
                    'test_methods.reference_standards',
                    'equipments.brand_types',
                    'reagents.suppliers',
                    'reagents.grades'
                ]);
            }
        ])->get();
        return response()->json(['orders' => $orders]);
    }

    public function show(string $id)
    {
        try {
            $order = Order::with([
                'clients.users',
                'analysts.users',
                'analysts.trainings',
                'analysts.certificates',
                'analysesMethods',
                'samples.sample_categories',
                'samples.n_parameter_methods' => function ($query) {
                    $query->with([
                        'test_parameters.unit_values',
                        'test_parameters.reference_standards',
                        'test_methods.reference_standards',
                        'equipments.brand_types',
                        'reagents.suppliers',
                        'reagents.grades'
                    ]);
                }
            ])->findOrFail($id);

            return response()->json(['order' => $order]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data order tidak ditemukan.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function downloadReport(string $id)
    {
        try {
            $order = Order::findOrFail($id);

            // Cek apakah status complete
            if ($order->status !== 'completed') {
                return response()->json([
                    'success' => false,
                    'message' => 'Laporan hanya dapat diunduh untuk order yang sudah selesai.',
                ], 403);
            }

            // Cek apakah file path ada
            if (!$order->report_file_path) {
                return response()->json([
                    'success' => false,
                    'message' => 'File laporan tidak tersedia.',
                ], 404);
            }

            // Cek apakah file ada di storage
            if (!Storage::disk('public')->exists($order->report_file_path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File laporan tidak ditemukan di storage.',
                ], 404);
            }

            // Download file
            $filePath = Storage::disk('public')->path($order->report_file_path);
            $fileName = 'Laporan_' . $order->order_number . '.pdf';
            
            return response()->download($filePath, $fileName);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data order tidak ditemukan.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengunduh laporan.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
