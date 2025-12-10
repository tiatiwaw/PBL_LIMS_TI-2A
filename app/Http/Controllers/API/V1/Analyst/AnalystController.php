<?php

namespace App\Http\Controllers\API\V1\Analyst;

use App\Models\Order;
use App\Models\Sample;
use App\Models\Reagent;
use App\Models\NReagent;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\NParameterMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AnalystController extends Controller
{
    protected function analyst()
    {
        return Auth::user();
    }

    public function dashboard(Request $request): JsonResponse
    {
        $analyst = $this->analyst();
        $orders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->analyst->id));
        $pendingOrders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->analyst->id))->where('status', 'paid');
        $stats = [
            'pendingOrder' => $pendingOrders->count(),
            'processedOrder' => $orders->where('status', 'in_progress')->count(),
            'completedOrder' => $orders->where('status', 'completed')->count(),
        ];

        return response()->json([
            'analyst' => $analyst,
            'orders' => $pendingOrders->latest()
                ->take(5)
                ->get(),
            'stats' => $stats,
        ]);
    }

    public function orders()
    {
        $analyst = $this->analyst();

        $orders = Order::whereHas('analysts', fn($q) => $q->where('analysts.id', $analyst->analyst->id))
            ->whereIn('status', [
                'in_progress',
                'completed',
                'revision_test',
                'received_test',
            ])
            ->latest()
            ->get();

        return response()->json(['orders' => $orders]);
    }

    public function detail(Order $order)
    {
        $order->load([
            'samples',
            'samples.sample_categories',
            'samples.n_parameter_methods' => function ($query) {
                    $query->where('status', '!=', 'failed');
                },
            'samples.n_parameter_methods.test_parameters.unit_values',
            'samples.n_parameter_methods.reagents',
            'samples.n_parameter_methods.equipments',
            'samples.test_method',
        ]);

        return response()->json([
            'order' => $order,
            'samples' => $order->samples,
        ]);
    }

    public function accept(Order $order)
    {
        if (in_array($order->status, ['pending', 'paid'])) {
            $order->update(['status' => 'in_progress']);

            $order->samples()
                ->where('status', 'pending')
                ->update(['status' => 'in_progress']);
        }

        return response()->json([
            'message' => 'Order diterima',
            'order' => $order,
            'samples_updated' => $order->samples()->get()
        ]);
    }

    public function saveReport(Request $request)
    {
        $validated = $request->validate([
            'results' => 'required|array',
        ]);

        DB::beginTransaction();

        try {
            $sampleIds = [];

            foreach ($validated['results'] as $result) {
                // 1️⃣ Update n_parameter_method yang spesifik dengan result dan status success
                NParameterMethod::where('sample_id', $result['sample_id'])
                    ->where('test_parameter_id', $result['parameter']['id'])
                    ->update(['result' => $result['result'], 'status' => 'success']);

                // 2️⃣ Update status sample
                $sample = Sample::findOrFail($result['sample_id']);
                $totalParams = NParameterMethod::where('sample_id', $sample->id)->count();
                $allDone = NParameterMethod::where('sample_id', $sample->id)
                    ->whereNotNull('result')
                    ->count();

                $sample->status = $allDone == $totalParams ? 'done' : 'in_progress';
                $sample->save();

                // 3️⃣ Kumpulkan sample IDs
                $sampleIds[] = $result['sample_id'];
            }

            // 4️⃣ Update semua n_parameter_methods dari sample-sample tersebut 
            // yang masih status 'in_progress' menjadi 'success'
            NParameterMethod::whereIn('sample_id', array_unique($sampleIds))
                ->where('status', 'in_progress')
                ->update(['status' => 'success']);

            DB::commit();

            return response()->json(['message' => 'Hasil uji berhasil disimpan.']);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error menyimpan hasil uji',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function submitReport($orderId)
    {
        $order = Order::findOrFail($orderId);

        $order->status = 'received_test';
        $order->save();

        return response()->json([
            'message' => 'Order berhasil disubmit.',
        ]);
    }

    /**
     * Menyimpan data penggunaan reagent dan update stok.
     */
    public function saveReagentUsage(Request $request)
    {
        $request->validate([
            'reagent_id' => 'required|exists:reagents,id',
            'n_parameter_method_id' => 'required|exists:n_parameter_methods,id',
            'reagent_used' => 'required|numeric|min:0'
        ]);

        DB::beginTransaction();

        try {
            // 1️⃣ Ambil data dari pivot berdasarkan COMPOSITE KEY
            $nReagent = NReagent::where('reagent_id', $request->reagent_id)
                ->where('n_parameter_method_id', $request->n_parameter_method_id)
                ->lockForUpdate() // ✅ anti race condition stok
                ->firstOrFail();

            // 2️⃣ Ambil reagent utama
            $reagent = Reagent::where('id', $request->reagent_id)
                ->lockForUpdate()
                ->firstOrFail();

            // 3️⃣ Hitung stok baru
            $newStock = $reagent->stock - $request->reagent_used;

            if ($newStock < 0) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Stock tidak mencukupi'
                ], 400);
            }

            // 4️⃣ Update pemakaian reagent di pivot (tambahkan dari nilai yang ada)
            $nReagent->update([
                'reagent_used' => $nReagent->reagent_used + $request->reagent_used
            ]);

            // 5️⃣ Update stock utama reagent
            $reagent->update([
                'stock' => $newStock
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Reagent usage & stock berhasil diupdate',
                'n_reagents' => $nReagent,
                'reagent' => $reagent
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error updating data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
