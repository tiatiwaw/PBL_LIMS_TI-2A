<?php

namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with([
            'clients.users',
            'analysesMethods',
            'samples.sample_categories',
        ])
            ->whereIn('status', ['received', 'paid', 'received_test'])
            ->orderByRaw("CASE WHEN order_type = 'urgent' THEN 0 ELSE 1 END")
            ->orderBy('order_date', 'asc')
            ->get();
        return response()->json($orders);
    }

    public function show(string $id)
    {
        try {
            $order = Order::with([
                'clients.users',
                'analysesMethods',
                'samples.sample_categories',
            ])->findOrFail($id);

            return response()->json($order);
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

    public function updateStatus(Request $request, string $id)
    {
        // Validasi simpel (Otomatis error 422 jika gagal)
        $validated = $request->validate([
            'action' => 'required|in:approve,reject',
            'reason' => 'nullable|string'
        ]);

        // Cari Order (Otomatis error 404 jika tidak ketemu)
        $order = Order::findOrFail($id);

        // Cek Status Awal (Hanya boleh jika 'received')
        if ($order->status !== 'received') {
            return response()->json([
                'message' => 'Gagal. Status order saat ini bukan received.'
            ], 400);
        }

        // Logika Update Status
        if ($validated['action'] === 'approve') {
            $order->status = 'pending_payment';
        } else {
            $order->status = 'dissaproved';
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
