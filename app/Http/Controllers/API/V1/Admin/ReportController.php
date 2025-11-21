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

class ReportController extends Controller
{
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
        $users = User::all();

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
