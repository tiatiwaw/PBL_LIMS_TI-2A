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
use Illuminate\Support\Facades\DB; 

class ReportController extends Controller
{
    // ... (Fungsi orders dan inventory tidak diubah)

    public function orders()
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
        ])->orderBy('order_date', 'desc')->get();

        return response()->json($orders);
    }

    public function inventory()
    {
        $equipments = Equipment::with('brand_types')->get();
        $reagents = Reagent::with(['suppliers', 'grades'])->get();
        $suppliers = Supplier::all();
        $brands = BrandType::all();
        $grades = Grade::all();

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

    public function users()
    {
        // PERHITUNGAN ANALITIK RINGKAS (Metrik Users)
        
        $totalAnalyst = User::whereHas('roles', function ($query) {
             $query->where('name', 'analyst');
        })->count();

        $totalCustomer = User::whereHas('roles', function ($query) {
            $query->where('name', 'client');
        })->count();
        
        $totalOrderAllTime = Order::count();

        // ----------------------------------------------------
        // LOGIKA PERBAIKAN TOP CUSTOMER (Handle NULL lebih baik)
        // ----------------------------------------------------
        $topCustomerName = '-';
        $topCustomerOrders = 0;

        // Hanya jalankan query agregat jika ada order
        if ($totalOrderAllTime > 0) {
            $topCustomerVolume = Order::select('client_id', DB::raw('count(*) as total_orders'))
                ->groupBy('client_id')
                ->orderByDesc('total_orders')
                ->first(); 
            
            if ($topCustomerVolume) {
                $topCustomerOrders = $topCustomerVolume->total_orders;
                $topCustomer = User::find($topCustomerVolume->client_id);
                
                // Set nama jika user ditemukan, jika tidak, biarkan default '-'
                if ($topCustomer) {
                    $topCustomerName = $topCustomer->name;
                }
            }
        }
        
        // Mengambil orders LENGKAP untuk filter tanggal di frontend (WAJIB)
        $orders = Order::with([
            'clients', // Relasi untuk mendapatkan nama client
            'analysts', // Relasi untuk mendapatkan nama analyst
            'samples' // Relasi untuk menghitung jumlah tes
        ])->get();
        
        // Mengirim DATA ANALITIK RINGKAS
        return response()->json([
            // Data analitik utama
            'totalAnalyst' => $totalAnalyst,
            'totalCustomer' => $totalCustomer,
            'totalOrderNonAdmin' => $totalOrderAllTime, 

            // Data Top Customer yang sudah ter-handle nilainya
            'topCustomer' => [
                'name' => $topCustomerName,
                'totalOrders' => $topCustomerOrders
            ],
            // Data orders mentah dikirim untuk diolah di frontend
            'orders' => $orders,
        ]);
    }

    public function transactions()
    {
        $orders = Order::with([
            'clients',
            'analysesMethods'
        ])
            ->where('status', '!=', 'disapproved')
            ->orderBy('order_date', 'desc')
            ->get();

        return response()->json($orders);
    }
}