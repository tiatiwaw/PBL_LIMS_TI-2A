<?php

namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Equipment;
use App\Models\NReagent;
use App\Models\Reagent;
use App\Services\ReportGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function index()
    {
        // 🔹 Dapatkan ID supervisor yang sedang login
        $supervisorId = auth('sanctum')->user()?->id;

        $orders = Order::with([
            'clients.users',
            'analysesMethods',
            'samples.sample_categories',
        ])
            ->where('supervisor_id', $supervisorId)
            ->whereIn('status', ['received', 'paid', 'received_test'])
            ->orderByRaw("CASE WHEN order_type = 'urgent' THEN 0 ELSE 1 END")
            ->orderBy('order_date', 'asc')
            ->get();
        return response()->json($orders);
    }

    public function history()
    {
        $supervisorId = auth('sanctum')->user()?->id;

        $orders = Order::with([
            'clients.users',
            'analysesMethods',
            'samples.sample_categories',
        ])
            ->where('supervisor_id', $supervisorId)
            ->orderByRaw("CASE WHEN order_type = 'urgent' THEN 0 ELSE 1 END")
            ->orderBy('order_date', 'asc')
            ->get();
        return response()->json($orders);
    }

    public function show(string $id)
    {
        try {
            // 🔹 Dapatkan ID supervisor yang sedang login
            $supervisorId = auth('sanctum')->user()?->id;

            $order = Order::with([
                'supervisors',
                'clients.users',
                'analysts.users',
                'analysts.trainings',
                'analysts.certificates',
                'analysesMethods',
                'samples.sample_categories',
                'samples.n_parameter_methods' => function ($query) {
                    $query->where('status', '!=', 'failed');
                },
                'samples.n_parameter_methods.test_parameters.unit_values',
                'samples.n_parameter_methods.test_parameters.reference_standards',
                'samples.n_parameter_methods.test_methods.reference_standards',
                'samples.n_parameter_methods.equipments.brand_types',
                'samples.n_parameter_methods.reagents.suppliers',
                'samples.n_parameter_methods.reagents.grades',
            ])
                ->where('supervisor_id', $supervisorId)
                ->findOrFail($id);

            return response()->json($order);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data order tidak ditemukan atau Anda tidak memiliki akses.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data order.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function updateStatus(Request $request, string $id)
    {
        // Validasi simpel (Otomatis error 422 jika gagal)
        $validated = $request->validate([
            'action' => 'required|in:approve,validate_test,reject',
            'reason' => 'nullable|string',
            'result_value' => 'nullable|string'
        ]);

        // 🔹 Dapatkan ID supervisor yang sedang login
        $supervisorId = auth('sanctum')->user()?->id;

        // Cari Order (Otomatis error 404 jika tidak ketemu atau bukan milik supervisor ini)
        $order = Order::where('supervisor_id', $supervisorId)->findOrFail($id);

        // Cek Status Awal (Hanya boleh jika 'received')
        if ($order->status !== 'received') {
            return response()->json([
                'message' => 'Gagal. Status order saat ini bukan received.'
            ], 400);
        }

        // Logika Update Status
        if ($validated['action'] === 'approve') {
            $order->status = 'pending_payment';
        } else if ($validated['action'] === 'validate_test') {
            $order->status = 'pending';
            $order->result_value = $validated['result_value'];
        } else {
            $order->status = 'disapproved';
            // Opsional: Simpan alasan reject ke notes jika ada
            if ($request->filled('reason')) {
                $order->notes = $request->reason;
            }
        }

        $order->save();

        return response()->json([
            'message' => 'Status order berhasil diperbarui',
            'data'    => $order
        ]);
    }
}
