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
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function orders(Request $request)
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

        $ordersQuery = Order::with([
            'clients',
            'analysts',
            'analysesMethods',
            'samples.sample_categories',
            'samples.n_parameter_methods' => function ($q) {
                $q->with([
                    'test_parameters',
                    'test_methods'
                ]);
            }
        ])->orderBy('order_date', 'desc');

        $applyDateFilter($ordersQuery, 'order_date');

        $orders = $ordersQuery->get();

        $totalOrders = $orders->count();
        $completedOrders = $orders->where('status', 'completed')->count();
        $totalSamples = $orders->reduce(function ($carry, $order) {
            return $carry + ($order->samples ? $order->samples->count() : 0);
        }, 0);

        $totalAnalysisMethods = 0;
        $methodsCount = [];
        $paramsCount = [];
        $typeCounts = ['internal' => 0, 'regular' => 0, 'external' => 0, 'urgent' => 0];
        $statusDist = [];
        $typeDist = [];
        $samplesPerOrder = [];
        $categoryDist = [];

        $statusLabelsMap = [
            'pending' => 'Menunggu',
            'completed' => 'Selesai',
            'processing' => 'Diproses',
        ];

        foreach ($orders as $order) {
            if (isset($typeCounts[$order->order_type])) {
                $typeCounts[$order->order_type]++;
            }

            $statusLabel = $statusLabelsMap[$order->status] ?? $order->status;
            if (!isset($statusDist[$statusLabel])) $statusDist[$statusLabel] = 0;
            $statusDist[$statusLabel]++;

            $typeLabel = $order->order_type;
            if (!isset($typeDist[$typeLabel])) $typeDist[$typeLabel] = 0;
            $typeDist[$typeLabel]++;

            $sampleCount = $order->samples ? $order->samples->count() : 0;
            $totalSamples += 0;
            $samplesPerOrder[] = [
                'order' => $order->order_number ?? "Order-{$order->id}",
                'count' => $sampleCount
            ];

            if ($order->samples) {
                foreach ($order->samples as $sample) {
                    $catName = $sample->sample_categories->name ?? 'Tanpa Kategori';
                    if (!isset($categoryDist[$catName])) $categoryDist[$catName] = 0;
                    $categoryDist[$catName]++;

                    if ($sample->n_parameter_methods) {
                        $pmList = is_array($sample->n_parameter_methods) ? $sample->n_parameter_methods : [$sample->n_parameter_methods];
                        foreach ($pmList as $pm) {
                            if (!empty($pm->test_parameters->name)) {
                                $pn = $pm->test_parameters->name;
                                if (!isset($paramsCount[$pn])) $paramsCount[$pn] = ['count' => 0, 'firstSeen' => strtotime($order->order_date)];
                                $paramsCount[$pn]['count']++;
                                $paramsCount[$pn]['firstSeen'] = min($paramsCount[$pn]['firstSeen'], strtotime($order->order_date));
                            }

                            if (!empty($pm->test_methods->name)) {
                                $mn = $pm->test_methods->name;
                                if (!isset($methodsCount[$mn])) $methodsCount[$mn] = ['count' => 0, 'firstSeen' => strtotime($order->order_date)];
                                $methodsCount[$mn]['count']++;
                                $methodsCount[$mn]['firstSeen'] = min($methodsCount[$mn]['firstSeen'], strtotime($order->order_date));
                                $totalAnalysisMethods++;
                            }
                        }
                    }
                }
            }
        }

        $formatForChart = function ($assoc, $limit = 5, $withColor = false) {
            $items = [];
            foreach ($assoc as $k => $v) {
                if (is_array($v) && isset($v['count'])) {
                    $value = $v['count'];
                } else {
                    $value = $v;
                }
                if ($value > 0) {
                    $items[] = ['name' => $k, 'value' => $value];
                }
            }
            usort($items, function ($a, $b) {
                return $b['value'] <=> $a['value'];
            });
            return array_slice($items, 0, $limit);
        };

        $statusChart = $formatForChart($statusDist, 9);
        $typeChart = $formatForChart($typeDist, 4);
        $methodsChart = $formatForChart(array_map(function ($v) {
            return is_array($v) ? $v['count'] : $v;
        }, $methodsCount), 7);
        $categoriesChart = $formatForChart($categoryDist, 6);

        $yearsAvailable = Order::selectRaw('YEAR(order_date) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter();

        uasort($paramsCount, function ($a, $b) {
            if ($a['count'] !== $b['count']) {
                return $b['count'] <=> $a['count'];
            }
            return $a['firstSeen'] <=> $b['firstSeen'];
        });

        $kpi = [
            'total_orders' => $totalOrders,
            'completed_orders' => $completedOrders,
            'total_samples' => $totalSamples,
            'total_analysis_methods' => $totalAnalysisMethods,
            'top_test_methods' => array_map(
                fn($item) => $item['name'],
                array_slice($methodsChart, 0, 5)
            ),
            'top_test_parameters' => array_keys(array_slice($paramsCount, 0, 5)),
        ];

        return response()->json([
            'meta' => [
                'years' => $yearsAvailable->values()
            ],
            'kpi' => $kpi,
            'charts' => [
                'status' => $statusChart,
                'type' => $typeChart,
                'samples_per_order' => $samplesPerOrder,
                'methods' => $methodsChart,
                'categories' => $categoriesChart
            ]
        ]);
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

        $trendReagent = Reagent::select(
            DB::raw('MONTHNAME(created_at) as label'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('label')
            ->orderByRaw('MONTH(created_at)')
            ->get()
            ->map(fn($item) => [
                'name'     => substr($item->label, 0, 3),
                'count'    => $item->count
            ]);


        $yearsAvailable = Equipment::selectRaw('YEAR(purchase_year) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter();



        return response()->json([
            'meta' => [
                'years' => $yearsAvailable->values(),
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
                'trend' => $trendData,
                'reagent' => $trendReagent
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

        $clientRanking = Order::whereIn('client_id', $filteredClientIds)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('order_date', $month))
            ->select('client_id', DB::raw('COUNT(*) as orders'))
            ->groupBy('client_id')
            ->orderByDesc('orders')
            ->limit(5)
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

        $roleDistribution = User::whereIn('id', $filteredAllIds)
            ->select('role', DB::raw('COUNT(*) as value'))
            ->groupBy('role')
            ->get()
            ->map(fn($i) => ['name' => ucfirst($i->role), 'value' => $i->value])
            ->values();

        $analystActivity = DB::table('n_analysts')
            ->join('users', 'n_analysts.analyst_id', '=', 'users.id')
            ->join('orders', 'n_analysts.order_id', '=', 'orders.id')
            ->whereIn('users.id', $filteredAnalystSample)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('orders.order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('orders.order_date', $month))
            ->select('users.id', 'users.name', DB::raw('COUNT(n_analysts.id) as total_samples'))
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total_samples')
            ->get();

        $analystActivityData = $analystActivity->map(fn($i) => [
            'name' => $i->name,
            'tests' => $i->total_samples
        ])->values()->take(5);

        $analystPerformanceTableData = $analystActivity->take(5)->map(fn($item) => [
            'analyst_name' => $item->name,
            'total_sample' => $item->total_samples
        ])->values();

        $topAnalystData = $analystActivity->first()
            ? ['name' => $analystActivity->first()->name, 'samples' => $analystActivity->first()->total_samples]
            : ['name' => '-', 'samples' => 0];

        $ordersFiltered = Order::whereIn('client_id', $filteredClientIds)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('order_date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('order_date', $month));

        $totalOrders = $ordersFiltered->count();
        $totalSamples = $ordersFiltered->withCount('samples')->get()->sum('samples_count');

        $avgSamplesPerOrder = $totalOrders > 0 ? round($totalSamples / $totalOrders, 2) : 0;

        $yearsAvailable = User::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter()
            ->values();

        if ($year && $year !== 'all') {
            $months = collect(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
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
            $trend = User::select(DB::raw('YEAR(created_at) as label'), DB::raw('COUNT(*) as count'))
                ->groupBy('label')
                ->orderBy('label')
                ->get()
                ->map(fn($i) => [
                    'name' => (string)$i->label,
                    'fullName' => (string)$i->label,
                    'count' => $i->count
                ]);
        }

        $trainingAnalyst = DB::table('analysts')
            ->leftJoin('n_training_analysts', 'analysts.id', '=', 'n_training_analysts.analyst_id')
            ->leftJoin('trainings', 'n_training_analysts.training_id', '=', 'trainings.id')
            ->join('users', 'analysts.user_id', '=', 'users.id')
            ->whereIn('users.id', $filteredAnalystIds)
            ->when($year && $year !== 'all', fn($q) => $q->whereYear('trainings.date', $year))
            ->when($month && $month !== 'all', fn($q) => $q->whereMonth('trainings.date', $month))
            ->select('analysts.name', DB::raw('COUNT(trainings.id) as total_training'))
            ->groupBy('analysts.name')
            ->orderByDesc('total_training')
            ->get()
            ->map(fn($i) => [
                'name' => $i->name,
                'total_training' => (int)$i->total_training
            ])->take(5);

        $trainingCerts = DB::table('n_training_analysts')
            ->join('trainings', 'n_training_analysts.training_id', '=', 'trainings.id')
            ->join('analysts', 'n_training_analysts.analyst_id', '=', 'analysts.id')
            ->join('users', 'analysts.user_id', '=', 'users.id')
            ->whereIn('users.id', $filteredAnalystIds)
            ->select('trainings.name as training_name', 'trainings.date as training_date', 'analysts.name as analyst_name')
            ->get()
            ->map(function ($row) {
                $trainingDate = Carbon::parse($row->training_date);
                $expiry = $trainingDate->copy()->addYear();
                return [
                    'analyst_name' => $row->analyst_name,
                    'training_name' => $row->training_name,
                    'training_date' => $trainingDate->format('d-M-Y'),
                    'expires_at' => $expiry->format('d-M-Y'),
                    'status' => $expiry->isPast()
                        ? 'expired'
                        : ($expiry->isBefore(now()->addDays(30)) ? 'near_expired' : 'valid')
                ];
            });

        $certificateSummary = [
            'expired' => $trainingCerts->where('status', 'expired')->count(),
            'near_expired' => $trainingCerts->where('status', 'near_expired')->count(),
            'valid' => $trainingCerts->where('status', 'valid')->count()
        ];

        $certificateDetail = $trainingCerts->values();

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
                'trend' => $trend,
                'training_analyst' => $trainingAnalyst,
                'certificate_expiration' => $certificateSummary,
                'certificate_detail' => $certificateDetail
            ]
        ]);
    }

    public function transactions(Request $request)
    {
        $year = $request->input('year');
        $month = $request->input('month');

        $query = Order::with([
            'clients',
        ])->where('status', '!=', 'disapproved');

        if ($year && $year !== 'all') {
            $query->whereYear('order_date', $year);
        }
        if ($month && $month !== 'all') {
            $query->whereMonth('order_date', $month);
        }

        $orders = $query->orderBy('order_date', 'desc')->get();

        $totalRevenue = 0;
        $maxSingleOrderRevenue = 0;
        $clientRevenueMap = [];
        $methodStats = [];
        $trendMap = [];
        $orderTypeRevenueMap = [];

        foreach ($orders as $order) {
            $orderRevenue = 0;
            $orderDate = Carbon::parse($order->order_date);

            foreach ($order->analysesMethods as $method) {
                $price = (float) ($method->pivot->price ?? 0);

                $methodName = $method->name ?? $method->analyses_method ?? $method->pivot->description ?? 'Unknown Method';

                $orderRevenue += $price;

                if (!isset($methodStats[$methodName])) {
                    $methodStats[$methodName] = ['count' => 0, 'revenue' => 0];
                }
                $methodStats[$methodName]['count']++;
                $methodStats[$methodName]['revenue'] += $price;
            }

            $totalRevenue += $orderRevenue;

            if ($orderRevenue > $maxSingleOrderRevenue) {
                $maxSingleOrderRevenue = $orderRevenue;
            }

            $clientName = $order->clients->name ?? 'Umum/Tunai';
            if (!isset($clientRevenueMap[$clientName])) {
                $clientRevenueMap[$clientName] = 0;
            }
            $clientRevenueMap[$clientName] += $orderRevenue;

            $type = $order->order_type ?? 'unknown';
            if (!isset($orderTypeRevenueMap[$type])) {
                $orderTypeRevenueMap[$type] = 0;
            }
            $orderTypeRevenueMap[$type] += $orderRevenue;

            $trendKey = ($year === 'all')
                ? $orderDate->year
                : $orderDate->format('F');

            if (!isset($trendMap[$trendKey])) {
                $trendMap[$trendKey] = 0;
            }
            $trendMap[$trendKey] += $orderRevenue;
        }

        arsort($clientRevenueMap);
        $topClientName = array_key_first($clientRevenueMap);

        uasort($methodStats, fn($a, $b) => $b['count'] <=> $a['count']);
        $topMethodName = array_key_first($methodStats);
        $topMethodData = $methodStats[$topMethodName] ?? ['count' => 0, 'revenue' => 0];

        arsort($orderTypeRevenueMap);
        $topTypeName = array_key_first($orderTypeRevenueMap);

        $trendChart = [];
        foreach ($trendMap as $key => $value) {
            $trendChart[] = [
                'name' => ($year === 'all') ? (string)$key : substr($key, 0, 3),
                'fullName' => (string)$key,
                'revenue' => $value
            ];
        }
        if ($year === 'all') {
            usort($trendChart, fn($a, $b) => $a['name'] <=> $b['name']);
        }

        $methodDistribution = [];
        $i = 0;
        foreach ($methodStats as $name => $stat) {
            if ($i++ >= 5) break;
            $methodDistribution[] = ['name' => $name, 'value' => $stat['count']];
        }

        uasort($methodStats, fn($a, $b) => $b['revenue'] <=> $a['revenue']);
        $methodRevenueChart = [];
        $i = 0;
        foreach ($methodStats as $name => $stat) {
            if ($i++ >= 8) break;
            $methodRevenueChart[] = ['name' => $name, 'value' => $stat['revenue']];
        }

        $yearsAvailable = Order::selectRaw('YEAR(order_date) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter()
            ->values();

        $detailedOrders = $orders->map(function ($order) {
            $revenue = 0;
            foreach ($order->analysesMethods as $m) {
                $revenue += (float) ($m->pivot->price ?? 0);
            }

            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'client_name' => $order->clients->name ?? '-',
                'order_type' => $order->order_type,
                'order_date' => $order->order_date,
                'method_count' => $order->analysesMethods->count(),
                'revenue' => $revenue
            ];
        });

        return response()->json([
            'meta' => ['years' => $yearsAvailable],
            'kpi' => [
                'total_revenue' => $totalRevenue,
                'total_orders' => $orders->count(),
                'max_single_order' => $maxSingleOrderRevenue,
                'avg_revenue_order' => ($orders->count() > 0) ? $totalRevenue / $orders->count() : 0,
                'top_client' => [
                    'name' => $topClientName ?? '-',
                    'revenue' => $clientRevenueMap[$topClientName] ?? 0
                ],
                'top_method' => [
                    'name' => $topMethodName ?? '-',
                    'count' => $topMethodData['count'],
                    'avg_price' => ($topMethodData['count'] > 0) ? $topMethodData['revenue'] / $topMethodData['count'] : 0
                ],
                'top_order_type' => [
                    'name' => $topTypeName ?? '-',
                    'revenue' => $orderTypeRevenueMap[$topTypeName] ?? 0
                ]
            ],
            'charts' => [
                'trend' => $trendChart,
                'method_distribution' => $methodDistribution,
                'method_revenue' => $methodRevenueChart
            ],
            'orders' => $detailedOrders
        ]);
    }
}
