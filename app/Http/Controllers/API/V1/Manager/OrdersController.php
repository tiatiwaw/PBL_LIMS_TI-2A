<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrdersController extends Controller
{
    public function index()
    {
        try {
            $orders = Order::with('clients')->get()->map(function($order){
                $order->client = $order->clients ?? (object)[
                    'id' => null, 'name' => '-', 'email' => '-', 'phone' => '-'
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
                'id' => null, 'name' => '-', 'email' => '-', 'phone' => '-'
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
                'id' => null, 'name' => '-', 'email' => '-', 'phone' => '-', 'address' => '-'
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
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:pending',
        ]);

        try {
            $order->update($validated);
            return response()->json($order, 200);

        } catch (\Throwable $e) {
            return response()->json([
                'error'   => 'Gagal mengupdate order',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}