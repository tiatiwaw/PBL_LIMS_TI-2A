<?php

namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use App\Models\Equipment;
use App\Models\NParameterMethod;
use App\Models\Order;
use App\Models\NReagent;
use App\Models\Reagent;
use App\Models\TestMethod;
use App\Models\TestParameter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ParameterController extends Controller
{
    /**
     * Menampilkan detail satu Test Parameter berdasarkan ID
     */
    public function show($id)
    {
        // 1. Ambil Data Order & Sampel (Spesifik ID)
        $order = Order::with(['samples.sample_categories', 'clients.users'])->findOrFail($id);
        $samples = $order->samples;

        // 2. Ambil Data NParameterMethod (Safe Mode)
        // Kita ambil ID dari sample yang ada di order ini
        $sampleIds = $samples->pluck('id');

        // Cek apakah ada sample? Kalau kosong, return array kosong biar gak error di query
        if ($sampleIds->isNotEmpty()) {
            $n_parameter_methods = NParameterMethod::whereIn('sample_id', $sampleIds)
                ->with(['test_parameters.unit_values', 'test_methods', 'equipments.brand_types', 'reagents'])
                ->get();
        } else {
            $n_parameter_methods = collect([]); // Return collection kosong
        }

        // 3. Ambil SEMUA Data Master DENGAN RELASI
        // Mengambil seluruh isi tabel untuk kebutuhan dropdown/referensi
        $test_parameters = TestParameter::with(['unit_values', 'reference_standards'])->get();
        $test_methods    = TestMethod::with(['reference_standards'])->get();
        $reagents        = Reagent::with(['suppliers', 'grades'])->get();
        $equipments      = Equipment::with(['brand_types'])->where('status', 'available')->get();
        $analysts        = Analyst::with(['users'])->get();

        // 4. Return Response
        return response()->json([
            'order'               => $order,           // Data detail order
            'samples'             => $samples,         // Data sampel terkait order
            'n_parameter_methods' => $n_parameter_methods, // Hasil tes terkait (bisa kosong, aman)

            // Data Master (Full List)
            'test_parameters'     => $test_parameters,
            'test_methods'        => $test_methods,
            'reagents'            => $reagents,
            'equipments'          => $equipments,
            'analysts'            => $analysts,
        ]);
    }

    /**
     * Menyimpan data Test Parameter baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'orderId'                    => 'required|exists:orders,id',
            'samples'                    => 'required|array',
            'samples.*.sample_id' => 'required|exists:samples,id',
            'samples.*.parameter_id' => 'required|exists:test_parameters,id',
            'samples.*.method_id'        => 'required|exists:test_methods,id',
            'samples.*.equipments'       => 'array',
            'samples.*.equipments.*'     => 'exists:equipments,id',
            'samples.*.reagents'         => 'array',
            'samples.*.reagents.*'       => 'exists:reagents,id',
        ]);

        DB::transaction(function () use ($validated) {

            foreach ($validated['samples'] as $sample) {

                // insert N_PARAMETER_METHODS
                $npm = NParameterMethod::create([
                    'sample_id'         => $sample['sample_id'],
                    'test_parameter_id' => $sample['parameter_id'],
                    'test_method_id'    => $sample['method_id'],
                    'result'            => null,
                    'status'            => 'in_progress',
                ]);

                // insert reagents
                foreach ($sample['reagents'] ?? [] as $reagentId) {
                    NReagent::create([
                        'n_parameter_method_id' => $npm->id,
                        'reagent_id'            => $reagentId,
                    ]);
                }

                // insert equipments (tanpa ubah status di sini)
                foreach ($sample['equipments'] ?? [] as $eqId) {
                    DB::table('n_equipments')->insert([
                        'n_parameter_method_id' => $npm->id,
                        'equipment_id'          => $eqId,
                        'created_at'            => now(),
                        'updated_at'            => now(),
                    ]);
                }
            }
        });

        return response()->json([
            'message' => 'Parameter method berhasil dibuat'
        ], 201);
    }


    /**
     * Mengupdate data Test Parameter
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'samples'                    => 'required|array',
            'samples.*.sample_id' => 'required|exists:samples,id',
            'samples.*.parameter_id' => 'required|exists:test_parameters,id',
            'samples.*.method_id'        => 'required|exists:test_methods,id',
            'samples.*.equipments'       => 'array',
            'samples.*.equipments.*'     => 'exists:equipments,id',
            'samples.*.reagents'         => 'array',
            'samples.*.reagents.*'       => 'exists:reagents,id',
        ]);

        DB::transaction(function () use ($validated) {

            foreach ($validated['samples'] as $sample) {

                $npm = NParameterMethod::where('sample_id', $sample['sample_id'])
                    ->firstOrFail();

                // update core info
                $npm->update([
                    'test_parameter_id' => $sample['parameter_id'],
                    'test_method_id'    => $sample['method_id'],
                ]);

                // replace reagents
                NReagent::where('n_parameter_method_id', $npm->id)->delete();
                foreach ($sample['reagents'] ?? [] as $reagentId) {
                    NReagent::create([
                        'n_parameter_method_id' => $npm->id,
                        'reagent_id'            => $reagentId,
                    ]);
                }

                // replace equipments (tanpa ubah status di sini)
                DB::table('n_equipments')
                    ->where('n_parameter_method_id', $npm->id)
                    ->delete();

                foreach ($sample['equipments'] ?? [] as $eqId) {
                    DB::table('n_equipments')->insert([
                        'n_parameter_method_id' => $npm->id,
                        'equipment_id'          => $eqId,
                        'created_at'            => now(),
                        'updated_at'            => now(),
                    ]);
                }
            }
        });

        return response()->json([
            'message' => 'Parameter method berhasil diperbarui'
        ], 200);
    }

    /**
     * TUGAS SUPERVISOR:
     * 1. Masukin notes, estimasi selesai, dan pilih Analyst (Bisa banyak).
     * 2. Ganti status order dari 'paid' jadi 'in_progress'.
     * 3. Ubah status equipment menjadi 'unavailable' untuk semua equipment yang ada di n_parameter_methods
     */
    public function assignAnalyst(Request $request)
    {
        // 1. Validasi Input
        // Kita ubah nama parameternya jadi 'analysts' biar cocok sama index.jsx
        $request->validate([
            'orderId'         => 'required|exists:orders,id',
            'notes'           => 'nullable|string',
            'estimate_date' => 'required|date',
            'analysts'        => 'required|array|min:1', // Wajib array & minimal 1
            'analysts.*'      => 'exists:analysts,id',   // Cek validitas ID
        ]);

        // 2. Ambil Data Order
        $order = Order::findOrFail($request->orderId);

        // 3. Ambil semua samples yang terkait dengan order ini
        $sampleIds = $order->samples->pluck('id')->toArray();

        // 4. Ambil semua n_parameter_methods untuk samples ini
        $nParameterMethods = NParameterMethod::whereIn('sample_id', $sampleIds)
            ->with('equipments')
            ->get();

        // 5. Validasi semua equipment harus 'available'
        // Jika ada yang sudah 'unavailable', return error
        foreach ($nParameterMethods as $npm) {
            foreach ($npm->equipments as $equipment) {
                if ($equipment->status !== 'available') {
                    return response()->json([
                        'success' => false,
                        'message' => "Equipment '{$equipment->name}' tidak tersedia. Silakan pilih equipment yang lain."
                    ], 422);
                }
            }
        }

        // 6. Gunakan Transaksi Database
        DB::beginTransaction();

        // 7. Update status equipment menjadi 'unavailable'
        foreach ($nParameterMethods as $npm) {
            foreach ($npm->equipments as $equipment) {
                $equipment->update([
                    'status' => 'unavailable'
                ]);
            }
        }

        // 8. Update Data Order
        $order->update([
            'notes'         => $request->notes,
            'estimate_date' => $request->estimate_date,
            // 'status'        => 'in_progress',
        ]);

        $order->analysts()->sync($request->analysts);

        // Simpan perubahan
        DB::commit();

        $order->load('analysts');

        return response()->json([
            'success' => true,
            'message' => 'Order berhasil diproses ke Analyst dan status equipment telah diperbarui.',
            'data'    => $order
        ], 200);
    }
}
