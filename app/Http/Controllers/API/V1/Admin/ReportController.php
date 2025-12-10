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
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // Pastikan ini diimpor untuk logika sertifikat

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
        $year = $request->input('year');
        $month = $request->input('month');

        $applyDateFilter = function ($query, $column) use ($year, $month) {
            if ($year && $year !== 'all') {
                $query->whereYear($column, $year);
            }
            if ($month && $month !== 'all') {
                $query->whereMonth($column, $month);
            }
        };


        $equipmentQuery = Equipment::query()->where(function ($q) use ($applyDateFilter) {
            $applyDateFilter($q, 'equipments.purchase_year');
        });

        $reagentQuery = Reagent::query()->where(function ($q) use ($applyDateFilter) {
            $applyDateFilter($q, 'reagents.created_at');
        });

        $totalEquipment = (clone $equipmentQuery)->count();
        $totalReagents = (clone $reagentQuery)->count();
        $totalBrands = BrandType::count();
        $totalSuppliers = Supplier::count();

        $statusStats = (clone $equipmentQuery)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $topEquipment = DB::table('n_order_samples')
            ->join('orders', 'n_order_samples.order_id', '=', 'orders.id')
            ->join('n_parameter_methods', 'n_order_samples.sample_id', '=', 'n_parameter_methods.sample_id')
            ->join('n_equipments', 'n_parameter_methods.id', '=', 'n_equipments.n_parameter_method_id')
            ->join('equipments', 'n_equipments.equipment_id', '=', 'equipments.id')
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('orders.order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('orders.order_date', $month))
            ->select('equipments.name', DB::raw('count(*) as usage_count'))
            ->groupBy('equipments.name')
            ->orderByDesc('usage_count')
            ->first();

        $topReagent = DB::table('n_order_samples')
            ->join('orders', 'n_order_samples.order_id', '=', 'orders.id')
            ->join('n_parameter_methods', 'n_order_samples.sample_id', '=', 'n_parameter_methods.sample_id')
            ->join('n_reagents', 'n_parameter_methods.id', '=', 'n_reagents.n_parameter_method_id')
            ->join('reagents', 'n_reagents.reagent_id', '=', 'reagents.id')
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('orders.order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('orders.order_date', $month))
            ->select('reagents.name', DB::raw('count(*) as usage_count'))
            ->groupBy('reagents.name')
            ->orderByDesc('usage_count')
            ->first();

        $statusChart = [
            ['name' => 'Tersedia', 'value' => $statusStats['available'] ?? 0, 'color' => '#2CACAD'],
            ['name' => 'Dipakai', 'value' => $statusStats['unavailable'] ?? 0, 'color' => '#3B82F6'],
            ['name' => 'Perbaikan', 'value' => $statusStats['maintenance'] ?? 0, 'color' => '#024D60'],
            ['name' => 'Rusak', 'value' => $statusStats['broken'] ?? 0, 'color' => '#02364B'],
        ];

        $brandChart = (clone $equipmentQuery)
            ->join('brand_types', 'equipments.brand_type_id', '=', 'brand_types.id')
            ->select('brand_types.name', DB::raw('count(*) as value'))
            ->groupBy('brand_types.name')
            ->orderByDesc('value')
            ->limit(10)
            ->get();

        $supplierChart = (clone $reagentQuery)
            ->join('suppliers', 'reagents.supplier_id', '=', 'suppliers.id')
            ->select('suppliers.name', DB::raw('count(*) as value'))
            ->groupBy('suppliers.name')
            ->orderByDesc('value')
            ->limit(10)
            ->get();

        $gradeChart = (clone $reagentQuery)
            ->join('grades', 'reagents.grade_id', '=', 'grades.id')
            ->select('grades.name', DB::raw('count(*) as value'))
            ->groupBy('grades.name')
            ->orderByDesc('value')
            ->get()
            ->map(function ($item, $key) {
                $colors = ['#2CACAD', '#024D60', '#3B82F6', '#02364B'];
                $item->color = $colors[$key % count($colors)];
                return $item;
            });

        $trendData = (clone $equipmentQuery)
            ->select(
                DB::raw($year === 'all' ? 'YEAR(equipments.purchase_year) as label' : 'MONTHNAME(equipments.purchase_year) as label'),
                DB::raw('count(*) as count')
            )
            ->groupBy('label')
            ->orderBy('label')
            ->get()
            ->map(fn($item) => [
                'name' => $year === 'all' ? (string)$item->label : substr($item->label, 0, 3),
                'fullName' => (string)$item->label,
                'count' => $item->count
            ]);

        $yearsAvailable = Equipment::selectRaw('YEAR(purchase_year) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter();

        return response()->json([
            'meta' => [
                'years' => $yearsAvailable->values()
            ],
            'kpi' => [
                'total_equipment' => $totalEquipment,
                'total_reagents' => $totalReagents,
                'total_brands' => $totalBrands,
                'total_suppliers' => $totalSuppliers,
                'available_equipment' => $statusStats['available'] ?? 0,
                'unavailable_equipment' => $statusStats['unavailable'] ?? 0,
                'maintenance_equipment' => $statusStats['maintenance'] ?? 0,
                'broken_equipment' => $statusStats['broken'] ?? 0,
                'top_equipment' => $topEquipment ? ['name' => $topEquipment->name, 'count' => $topEquipment->usage_count] : ['name' => '-', 'count' => 0],
                'top_reagent' => $topReagent ? ['name' => $topReagent->name, 'count' => $topReagent->usage_count] : ['name' => '-', 'count' => 0],
            ],
            'charts' => [
                'status' => array_values(array_filter($statusChart, fn($i) => $i['value'] > 0)),
                'brands' => $brandChart,
                'suppliers' => $supplierChart,
                'grades' => $gradeChart,
                'trend' => $trendData
            ]
        ]);
    }

    public function users(Request $request)
    {
        $year = $request->input('year');
        $month = $request->input('month');
    
        $userQuery = User::query()
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('created_at', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('created_at', $month));
    
        $allUsers = User::all();
        $filteredAllIds = $userQuery->pluck('id');
        $filteredClientIds = (clone $userQuery)->where('role', 'client')->pluck('id');
        $filteredAnalystIds = (clone $userQuery)->where('role', 'analyst')->pluck('id');
        $filteredAnalystSample = DB::table('n_analysts')->distinct()->pluck('analyst_id');

    
        $totalPengguna = $filteredAllIds->count();
        $totalAnalyst = $filteredAnalystIds->count();
        $totalClient = $filteredClientIds->count();
        $totalKaryawan = User::whereIn('id', $filteredAllIds)
            ->whereNotIn('role', ['admin', 'client'])
            ->count();
    
        // =====================================================
        // 1. CLIENT RANKING & ACTIVITY
        // =====================================================
        $clientRanking = Order::whereIn('client_id', $filteredClientIds)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('order_date', $month))
            ->select('client_id', DB::raw('COUNT(*) as orders'))
            ->groupBy('client_id')
            ->orderByDesc('orders')
            ->limit(10)
            ->get();
    
        $clientRankingData = $clientRanking->map(function ($client) use ($allUsers) {
            $user = $allUsers->firstWhere('id', $client->client_id);
            return [
                'name' => $user->name ?? 'Client Tidak Ditemukan',
                'orders' => $client->orders
            ];
        })->values();
    
        $clientActivityTableData = $clientRankingData->take(5)->map(fn($item) => [
            'client_name' => $item['name'],
            'total_order' => $item['orders']
        ])->values();
    
        $topClientData = $clientRankingData->first() ?? ['name' => '-', 'orders' => 0];
    
        // =====================================================
        // 2. ROLE DISTRIBUTION
        // =====================================================
        $roleDistribution = User::whereIn('id', $filteredAllIds)
            ->select('role', DB::raw('COUNT(*) as value'))
            ->groupBy('role')
            ->get()
            ->map(fn($i) => ['name' => ucfirst($i->role), 'value' => $i->value])
            ->values();
    
        // =====================================================
        // 3. ANALYST ACTIVITY & PERFORMANCE
        // =====================================================
        $analystActivity = DB::table('n_analysts')
            ->join('users', 'n_analysts.analyst_id', '=', 'users.id')
            ->join('orders', 'n_analysts.order_id', '=', 'orders.id')
            ->whereIn('users.id', $filteredAnalystSample)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('orders.order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('orders.order_date', $month))
            ->select(
                'users.id',
                'users.name',
                DB::raw('COUNT(n_analysts.id) as total_samples')
            )
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total_samples')
            ->get();

        $analystActivityData = $analystActivity->map(fn($i) => [
            'name' => $i->name,
            'tests' => $i->total_samples
        ])->values();
    
        $analystPerformanceTableData = $analystActivity->take(5)->map(fn($item) => [
            'analyst_name' => $item->name,
            'total_sample' => $item->total_samples
        ])->values();
    
        $topAnalystData = $analystActivity->first()
            ? ['name' => $analystActivity->first()->name, 'samples' => $analystActivity->first()->total_samples]
            : ['name' => '-', 'samples' => 0];
    
        // =====================================================
        // 4. ORDERS & SAMPLES
        // =====================================================
        $ordersFiltered = Order::whereIn('client_id', $filteredClientIds)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('order_date', $month));
    
        $totalOrders = $ordersFiltered->count();
        $totalSamples = $ordersFiltered->withCount('samples')->get()->sum('samples_count');
    
        $avgSamplesPerOrder = $totalOrders > 0
            ? round($totalSamples / $totalOrders, 2)
            : 0;
    
        // =====================================================
        // 5. AVAILABLE YEARS
        // =====================================================
        $yearsAvailable = User::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter()
            ->values();
    
        // =====================================================
        // 6. TREND (REPLACED WITH YOUR 12-MONTH VERSION)
        // =====================================================
        if ($year && $year !== 'all') {
            // === BULANAN: selalu 12 bulan Jan–Dec ===
            $months = collect([
                'January','February','March','April','May','June',
                'July','August','September','October','November','December'
            ]);
    
            $trend = $months->map(function ($month) use ($userQuery, $year) {
                return [
                    'name' => substr($month, 0, 3),
                    'fullName' => $month,
                    'count' => (clone $userQuery)
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', Carbon::parse($month)->month)
                        ->count()
                ];
            });
        } else {
            // === TAHUNAN ===
            $trend = User::select(
                    DB::raw('YEAR(created_at) as label'),
                    DB::raw('COUNT(*) as count')
                )
                ->groupBy('label')
                ->orderBy('label')
                ->get()
                ->map(fn($i) => [
                    'name' => (string)$i->label,
                    'fullName' => (string)$i->label,
                    'count' => $i->count
                ]);
        }
    
        // =====================================================
        // 7. TRAINING ANALYST & CERTIFICATES
        // =====================================================
        $trainingAnalyst = DB::table('analysts')
            ->leftJoin('n_training_analysts', 'analysts.id', '=', 'n_training_analysts.analyst_id')
            ->leftJoin('trainings', 'n_training_analysts.training_id', '=', 'trainings.id')
            ->join('users', 'analysts.user_id', '=', 'users.id')
            ->whereIn('users.id', $filteredAnalystIds)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('trainings.date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('trainings.date', $month))
            ->select(
                'analysts.name',
                DB::raw('COUNT(trainings.id) as total_training')
            )
            ->groupBy('analysts.name')
            ->orderByDesc('total_training')
            ->get()
            ->map(fn($i) => [
                'name' => $i->name,
                'total_training' => (int)$i->total_training
            ]);
    
        $trainingCerts = DB::table('n_training_analysts')
            ->join('trainings', 'n_training_analysts.training_id', '=', 'trainings.id')
            ->join('analysts', 'n_training_analysts.analyst_id', '=', 'analysts.id')
            ->join('users', 'analysts.user_id', '=', 'users.id')
            ->whereIn('users.id', $filteredAnalystIds)
            ->select(
                'trainings.name as training_name',
                'trainings.date as training_date',
                'analysts.name as analyst_name'
            )
            ->get()
            ->map(function ($row) {
                $trainingDate = Carbon::parse($row->training_date);
                $expiry = $trainingDate->copy()->addYear();
    
                return [
                    'analyst_name' => $row->analyst_name,
                    'training_name' => $row->training_name,
                    'training_date' => $trainingDate->format('Y-m-d'),
                    'expires_at' => $expiry->format('Y-m-d'),
                    'status' => $expiry->isPast()
                        ? 'expired'
                        : ($expiry->isBefore(now()->addDays(30))
                            ? 'near_expired'
                            : 'valid')
                ];
            });
    
        $certificateSummary = [
            'expired' => $trainingCerts->where('status', 'expired')->count(),
            'near_expired' => $trainingCerts->where('status', 'near_expired')->count(),
            'valid' => $trainingCerts->where('status', 'valid')->count(),
        ];
    
        $certificateDetail = $trainingCerts->values();
    
        // =====================================================
        // RETURN
        // =====================================================
        return response()->json([
            'meta' => [
                'years' => $yearsAvailable
            ],
            'kpi' => [
                'total_pengguna' => $totalPengguna,
                'total_analyst' => $totalAnalyst,
                'total_client' => $totalClient,
                'total_karyawan_non_admin' => $totalKaryawan,
                'top_client' => $topClientData,
                'top_analyst' => $topAnalystData,
                'avg_analyst_per_order' => $avgSamplesPerOrder
            ],
            'charts' => [
                'clientRankingData' => $clientRankingData,
                'roleDistribution' => $roleDistribution,
                'analystActivityData' => $analystActivityData,
                'analystPerformance' => $analystPerformanceTableData,
                'clientActivity' => $clientActivityTableData,
    
                // TREND CHART (modified)
                'trend' => $trend,
    
                'training_analyst' => $trainingAnalyst,
                'certificate_expiration' => $certificateSummary,
                'certificate_detail' => $certificateDetail
            ]
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