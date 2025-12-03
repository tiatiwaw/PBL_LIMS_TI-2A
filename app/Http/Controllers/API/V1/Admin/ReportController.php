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

    public function inventory(Request $request)
    {
        // Accept year and month query params. Frontend may send 'all' to indicate no filter.
        $year = $request->query('year');
        $month = $request->query('month');

        $equipmentsQuery = Equipment::with('brand_types');
        $reagentsQuery = Reagent::with(['suppliers', 'grades']);
        $ordersQuery = Order::with([
            'samples.n_parameter_methods.equipments',
            'samples.n_parameter_methods.reagents'
        ]);

        if ($year !== null && $year !== 'all') {
            $equipmentsQuery->whereYear('purchase_year', (int) $year);
            $reagentsQuery->whereYear('created_at', (int) $year);
            $ordersQuery->whereYear('order_date', (int) $year);
        }

        if ($month !== null && $month !== 'all') {
            // Note: frontend month may be zero-based (0 = January). Convert to 1-based for SQL.
            $monthInt = (int) $month;
            if ($monthInt >= 0 && $monthInt <= 11) {
                $monthInt = $monthInt;
            }
            $equipmentsQuery->whereMonth('purchase_year', $monthInt);
            $reagentsQuery->whereMonth('created_at', $monthInt);
            $ordersQuery->whereMonth('order_date', $monthInt);
        }

        $equipments = $equipmentsQuery->get();
        $reagents = $reagentsQuery->get();
        $orders = $ordersQuery->get();

        $suppliers = Supplier::all();
        $brands = BrandType::all();
        $grades = Grade::all();

        // Compute available years for filters (distinct years across models)
        $equipmentYears = Equipment::selectRaw('YEAR(purchase_year) as year')->distinct()->pluck('year')->filter()->unique()->values()->all();
        $reagentYears = Reagent::selectRaw('YEAR(created_at) as year')->distinct()->pluck('year')->filter()->unique()->values()->all();
        $orderYears = Order::selectRaw('YEAR(order_date) as year')->distinct()->pluck('year')->filter()->unique()->values()->all();

        $allYears = array_values(array_unique(array_merge($equipmentYears, $reagentYears, $orderYears)));
        rsort($allYears);

        return response()->json([
            'equipments' => $equipments,
            'reagents' => $reagents,
            'suppliers' => $suppliers,
            'brands' => $brands,
            'grades' => $grades,
            'orders' => $orders,
            'selected_filters' => [
                'year' => $year,
                'month' => $month,
            ],
            'available_years' => [
                'all' => $allYears,
                'equipments' => $equipmentYears,
                'reagents' => $reagentYears,
                'orders' => $orderYears,
            ],
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
