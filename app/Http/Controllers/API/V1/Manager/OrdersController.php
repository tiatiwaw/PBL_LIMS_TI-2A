<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Services\ReportGeneratorService;
use Illuminate\Http\Request;
use App\Models\Order;

class OrdersController extends Controller
{
    public function index()
    {
        try {
            $orders = Order::with('clients')->get()->map(function ($order) {
                $order->client = $order->clients ?? (object)[
                    'id' => null,
                    'name' => '-',
                    'email' => '-',
                    'phone' => '-'
                ];
                unset($order->clients);
                return $order;
            });

            return response()->json($orders, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Gagal mengambil order',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function reportValidations()
    {
        $reports = Order::with('clients:id,name')
            ->where('status', 'pending')
            ->select('id', 'order_number', 'client_id', 'status', 'order_type')
            ->latest()
            ->get()
            ->map(function ($order, $index) {
                return [
                    'id'         => $order->id,
                    'no'         => $index + 1,
                    'sample'     => $order->order_number,
                    'client'     => $order->clients->name ?? '-',
                    'status'     => $order->status,
                    'order_type' => $order->order_type,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data'   => $reports
        ]);
    }

    public function detail($id)
    {
        try {
            $order = Order::with([
                'clients.users',
                'analysts.users',
                'analysts.trainings',
                'analysts.certificates',
                'analysesMethods',
                'samples.sample_categories',
                'samples.n_parameter_methods.test_parameters.unit_values',
                'samples.n_parameter_methods.test_parameters.reference_standards',
                'samples.n_parameter_methods.test_methods.reference_standards',
                'samples.n_parameter_methods.equipments.brand_types',
                'samples.n_parameter_methods.reagents.suppliers',
                'samples.n_parameter_methods.reagents.grades',
            ])->findOrFail($id);

            // Normalisasi data
            $order->client = $order->clients ?? (object)[
                'id' => null,
                'name' => '-',
                'email' => '-',
                'phone' => '-'
            ];
            unset($order->clients);

            $order->samples          = $order->samples ?? [];
            $order->analysts         = $order->analysts ?? [];
            $order->analyses_methods = $order->analysesMethods ?? [];
            unset($order->analysesMethods);

            return response()->json([
                "id"     => $id,
                "status" => "success",
                "data"   => $order
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "id"      => $id,
                "success" => false,
                "message" => "Gagal mengambil detail order.",
                "error"   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $order = Order::with([
                'clients.users',
                'analysts.users',
                'analysts.trainings',
                'analysts.certificates',
                'analysesMethods',
                'samples.sample_categories',
                'samples.n_parameter_methods.test_parameters.unit_values',
                'samples.n_parameter_methods.test_parameters.reference_standards',
                'samples.n_parameter_methods.test_methods.reference_standards',
                'samples.n_parameter_methods.equipments.brand_types',
                'samples.n_parameter_methods.reagents.suppliers',
                'samples.n_parameter_methods.reagents.grades',

            ])->findOrFail($id);

            $order->client = $order->clients ?? (object)[
                'id' => null,
                'name' => '-',
                'email' => '-',
                'phone' => '-',
                'address' => '-'
            ];
            unset($order->clients);

            $order->analyses_methods = $order->analysesMethods ?? [];
            unset($order->analysesMethods);

            return response()->json([
                "id"      => $id,
                'success' => true,
                'message' => 'Detail order berhasil diambil.',
                'data'    => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "id"      => $id,
                'success' => false,
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'action' => 'required|in:validate',
            'reason' => 'nullable|string',
        ]);

        try {
            $managerId = auth('sanctum')->user()?->id;

            $order = Order::with([
                'supervisors',
                'samples.sample_categories',
                'samples.n_parameter_methods.test_parameters.unit_values',
                'samples.n_parameter_methods.test_parameters.reference_standards',
                'samples.n_parameter_methods.test_methods',
            ])->findOrFail($id);

            // Cek status - hanya bisa validate jika status 'pending'
            if ($order->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Order hanya bisa divalidasi jika status pending.'
                ], 400);
            }

            // Generate report data
            $reportResult = ReportGeneratorService::generateFullReport(
                $order,
                null, // selectedSampleIds (null = semua sampel)
                $validated['reason'] ?? null,
                $managerId // Pass manager ID
            );

            if (!$reportResult['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $reportResult['message']
                ], 500);
            }

            // Update order
            $order->status = 'completed';
            $order->report_issued_at = now();
            $order->notes = $validated['reason'] ?? '';
            $order->report_file_path = $reportResult['file_path'];
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Order berhasil divalidasi dan laporan telah dibuat.',
                'data' => [
                    'order' => $order,
                    'report_file_path' => $reportResult['file_path']
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memvalidasi order.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
