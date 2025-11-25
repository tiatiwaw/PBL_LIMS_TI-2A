<?php

namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use App\Models\Equipment;
use App\Models\NParameterMethod;
use App\Models\Order;
use App\Models\Reagent;
use App\Models\TestMethod;
use App\Models\TestParameter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParameterController extends Controller
{
    /**
     * Menampilkan semua data Test Parameter
     */
    public function index()
    {
        try {
            // Mengambil semua parameter beserta relasi Unit dan Standar Acuan
            $parameters = TestParameter::with([
                'unit_values',         // Relasi ke tabel unit_values
                'reference_standards'  // Relasi ke tabel reference_standards
            ])->latest()->get();

            return response()->json([
                'success' => true,
                'message' => 'List Data Test Parameters',
                'data'    => $parameters
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data parameter.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menampilkan detail satu Test Parameter berdasarkan ID
     */
    public function show($id)
    {
        // 1. Ambil Data Order & Sampel (Spesifik ID)
        $order = Order::with('samples')->findOrFail($id);
        $samples = $order->samples;

        // 2. Ambil Data NParameterMethod (Safe Mode)
        // Kita ambil ID dari sample yang ada di order ini
        $sampleIds = $samples->pluck('id');

        // Cek apakah ada sample? Kalau kosong, return array kosong biar gak error di query
        if ($sampleIds->isNotEmpty()) {
            $n_parameter_methods = NParameterMethod::whereIn('sample_id', $sampleIds)->get();
        } else {
            $n_parameter_methods = collect([]); // Return collection kosong
        }

        // 3. Ambil SEMUA Data Master (Tanpa Relasi / Filter Order)
        // Mengambil seluruh isi tabel untuk kebutuhan dropdown/referensi
        $test_parameters = TestParameter::all();
        $test_methods    = TestMethod::all();
        $reagents        = Reagent::all();
        $equipments      = Equipment::all();
        $analysts        = Analyst::all();

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
        // Validasi input
        $validator = Validator::make($request->all(), [
            'unit_value_id'   => 'required|exists:unit_values,id',
            'reference_id'    => 'required|exists:reference_standards,id',
            'name'            => 'required|string|max:255',
            'category'        => 'required|string|max:255',
            'detection_limit' => 'nullable|string|max:255',
            'quality_standard' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            $parameter = TestParameter::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Test Parameter berhasil dibuat',
                'data'    => $parameter
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan parameter.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mengupdate data Test Parameter
     */
    public function update(Request $request, $id)
    {
        try {
            $parameter = TestParameter::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'unit_value_id'   => 'required|exists:unit_values,id',
                'reference_id'    => 'required|exists:reference_standards,id',
                'name'            => 'required|string|max:255',
                'category'        => 'required|string|max:255',
                'detection_limit' => 'nullable|string',
                'quality_standard' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors'  => $validator->errors()
                ], 422);
            }

            $parameter->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Test Parameter berhasil diupdate',
                'data'    => $parameter
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data parameter tidak ditemukan.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate parameter.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus data Test Parameter
     */
    public function destroy($id)
    {
        try {
            $parameter = TestParameter::findOrFail($id);
            $parameter->delete();

            return response()->json([
                'success' => true,
                'message' => 'Test Parameter berhasil dihapus'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data parameter tidak ditemukan.',
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus parameter.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
