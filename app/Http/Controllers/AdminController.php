<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Equipment;
use App\Models\Reagent;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;
use App\Models\Order;

class AdminController extends Controller
{
    public function index()
    {
        $totalUser = User::count();
        $totalEquipment = Equipment::count();
        $totalReagent = Reagent::count();
        $totalSample = Sample::count();
        $totalParameter = TestParameter::count();
        $totalMethod = TestMethod::count();
        $monthlyTrendData = $this->monthlyTrendData();
        $resourceDistribution = $this->resourceDistribution();

        // dd($totalReagent);

        return Inertia::render('admin/index', [
            'totalUser' => $totalUser,
            'totalEquipment' => $totalEquipment,
            'totalReagent' => $totalReagent,
            'totalSample' => $totalSample,
            'totalParameter' => $totalParameter,
            'totalMethod' => $totalMethod,
            'monthlyTrendData' => $monthlyTrendData,
            'resourceDistribution' => $resourceDistribution,
        ]);
    }

    public function monthlyTrendData()
    {
        $data = collect(range(5, 0))->map(function ($i) {
            $month = now()->subMonths($i);

            return [
                'month' => $month->format('M'),
                'clients' => User::where('role', 'client')
                    ->whereMonth('created_at', $month->month)
                    ->whereYear('created_at', $month->year)
                    ->count(),
                'sampel' => Sample::whereMonth('created_at', $month->month)
                    ->whereYear('created_at', $month->year)
                    ->count(),
                'pengujian' => Order::whereMonth('created_at', $month->month)
                    ->whereYear('created_at', $month->year)
                    ->count(),
            ];
        })->values();

        // Jika dipanggil dari controller index(), kirimkan data mentahnya
        return $data;
    }

    public function resourceDistribution()
    {
        return [
            ['name' => 'Peralatan', 'value' => Equipment::count(), 'color' => '#10b981'], // hijau
            ['name' => 'Reagen', 'value' => Reagent::count(), 'color' => '#3b82f6'], // biru
            ['name' => 'Parameter', 'value' => TestParameter::count(), 'color' => '#8b5cf6'], // ungu
            ['name' => 'Metode Uji', 'value' => TestMethod::count(), 'color' => '#f59e0b'], // oranye
        ];
    }


    public function equipment()
    {
        return Inertia::render('admin/tools/equipments/index');
    }

    public function brands()
    {
        return Inertia::render('admin/tools/brands/index');
    }

    public function reagents()
    {
        return Inertia::render('admin/materials/reagents/index');
    }

    public function grades()
    {
        return Inertia::render('admin/materials/grades/index');
    }

    public function suppliers()
    {
        return Inertia::render('admin/materials/suppliers/index');
    }

    public function sample()
    {
        return Inertia::render('admin/sampling/sample/index');
    }

    public function category()
    {
        return Inertia::render('admin/sampling/category/index');
    }

    public function parameter()
    {
        return Inertia::render('admin/test/parameter/index');
    }

    public function method()
    {
        return Inertia::render('admin/test/method/index');
    }

    public function unitValue()
    {
        return Inertia::render('admin/test/unit-value/index');
    }

    public function standardReference()
    {
        return Inertia::render('admin/test/standard-reference/index');
    }

    public function logActivity()
    {
        return Inertia::render('admin/log-activity/index');
    }

    public function users()
    {
        return Inertia::render('admin/users/index');
    }
}
