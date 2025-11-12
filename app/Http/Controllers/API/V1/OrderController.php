<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Menampilkan semua data order dengan relasi lengkap.
     * Dikhususkan untuk role Admin yang butuh melihat semua data.
     */
    public function index()
    {
        // Eager load semua relasi bertingkat yang diminta
        $orders = Order::with([
            // 1. Relasi langsung dari Order: Klien & User-nya
            'clients.users',

            // 2. Relasi langsung dari Order: Analis yg ditugaskan
            'analysts',

            // 3. Relasi langsung dari Order: Paket metode yg dibeli
            'analysesMethods',

            // 4. Relasi bertingkat: Order -> Sampel -> Kategori Sampel
            'samples.sample_categories',

            // 5. Relasi terdalam:
            // Order -> Sampel -> nParameterMethods (Tugas Tes)
            'samples.n_parameter_methods' => function ($query) {
                // Dari setiap Tugas Tes, ambil relasi-relasinya
                $query->with([
                    // 5a. Tugas Tes -> Parameter -> Unit & Standar
                    'test_parameters.unit_values',
                    'test_parameters.reference_standards',

                    // 5b. Tugas Tes -> Metode -> Standar
                    'test_methods.reference_standards',

                    // 5c. Tugas Tes -> Alat -> Merek
                    'equipments.brand_types',

                    // 5d. Tugas Tes -> Bahan -> Supplier & Grade
                    'reagents.suppliers',
                    'reagents.grades'
                ]);
            }
        ])->get();

        // Kembalikan sebagai response JSON
        return response()->json($orders);
    }
}
