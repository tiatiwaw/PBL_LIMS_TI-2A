<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\BrandType;
use App\Models\Equipment;
use App\Models\Grade;
use App\Models\Order;
use App\Models\Reagent;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Mengirimkan data untuk OrdersReportDashboard.
     * Mengembalikan data order beserta relasi sample, metode analisis, dan klien.
     */
    public function orders()
    {
        // Mengambil order dengan relasi yang diperlukan untuk perhitungan KPI dan Tabel
        $orders = Order::with([
            'clients',                  // Untuk nama klien
            'analysesMethods',          // Untuk menghitung metode & pivot price
            'samples.sample_categories', // Untuk kategori sampel
            'samples.n_parameter_methods.equipments', // Untuk statistik penggunaan alat
            'samples.n_parameter_methods.reagents.suppliers', // Untuk statistik penggunaan reagen & supplier
            'analysts'                  // Untuk data analis yang mengerjakan
        ])
            ->orderBy('order_date', 'desc')
            ->get();

        return response()->json($orders);
    }

    /**
     * Mengirimkan data untuk AdminReportInventory.
     * Mengembalikan data master inventory dan data order untuk history penggunaan.
     */
    public function inventory()
    {
        // 1. Data Master Inventory
        $equipments = Equipment::with('brand_types')->get();
        $reagents = Reagent::with(['suppliers', 'grades'])->get();
        $suppliers = Supplier::all();
        $brands = BrandType::all();
        $grades = Grade::all();

        // 2. Data Order untuk menghitung "Alat/Reagen Sering Dipakai"
        // Kita butuh order -> sample -> n_parameter_methods -> equipment/reagent
        $orders = Order::with([
            'samples.n_parameter_methods.equipments',
            'samples.n_parameter_methods.reagents'
        ])->get();

        return response()->json([
            'equipments' => $equipments,
            'reagents' => $reagents,
            'suppliers' => $suppliers,
            'brands' => $brands,
            'grades' => $grades,
            'orders' => $orders
        ]);
    }

    /**
     * Mengirimkan data untuk UserReportDashboard.
     * Mengembalikan data user (analyst/client/admin) dan data order untuk performa.
     */
    public function users()
    {
        // 1. Data User untuk demografi (Total Analis, Client, dll)
        $users = User::all();

        // 2. Data Order untuk menghitung KPI "Top Client" dan "Top Analyst"
        // Perlu relasi ke samples untuk menghitung jumlah sampel yang dikerjakan analis
        $orders = Order::with([
            'clients',
            'analysts',
            'samples'
        ])->get();

        return response()->json([
            'users' => $users,
            'orders' => $orders
        ]);
    }

    /**
     * Mengirimkan data untuk SalesReportDashboard (Transactions).
     * Fokus pada nilai uang di pivot table analyses_methods.
     */
    public function transactions()
    {
        $orders = Order::with([
            'clients',
            'analysesMethods' // Penting: Pivot 'price' ada di sini
        ])
            ->where('status', '!=', 'disapproved') // Opsional: Filter order yang valid saja
            ->orderBy('order_date', 'desc')
            ->get();

        return response()->json($orders);
    }
}
