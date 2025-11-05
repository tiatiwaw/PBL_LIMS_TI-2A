<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\User;

use Carbon\Carbon;

class ManagerController extends Controller
{
    public function index()
    {
        // Dashboard snapshot metrics
        $totalOrders = Order::count();
        // $data = Order::with('n_analyses_methods_orders')->get();
        $totalPrice = Order::withSum('n_analyses_methods_orders', 'price')->get();
        $grandTotal = $totalPrice->sum('n_analyses_methods_orders_sum_price');
        // dd( $totalPrice );
        $totalUsers = User::count();
        $ordersToday = Order::whereDate('created_at', Carbon::today())->count();
        $pendingReports = Order::where('status', 'pending')->count();

        // Recent orders for quick glance (last 10)
        $recentOrders = Order::with(['clients', 'analyses_methods'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($o) {
                return [
                    'id' => $o->id,
                    'user' => optional($o->clients)->name,
                    'title' => $o->title,
                    'estimasi' => $o->estimate_date,
                    'report_issued_at' => $o->report_issued_at,
                    'tipe' => $this->mapOrderType($o->order_type),
                    'status' => $this->mapStatusLabel($o->status),
                    'order_number' => $o->order_number,
                    'analyses_method' => $o->analyses_methods->pluck('analyses_method')->join(', '),
                ];
            });

        return Inertia::render('manager/index', [
            'totalOrders' => $totalOrders,
            'totalUsers' => $totalUsers,
            'ordersToday' => $ordersToday,
            'pendingReports' => $pendingReports,
            'recentOrders' => $recentOrders,
            'totalPrice' => $totalPrice,
            'grandTotal' => $grandTotal,
        ]);
    }

    public function reportValidation(Request $request)
    {
        // Simple filter validation
        $validated = $request->validate([
            'status' => ['nullable', 'string'],
            'q' => ['nullable', 'string'],
        ]);

        $query = Order::query()->with(['samples', 'clients', 'analysts']);

        // Filter by status if provided
        if (!empty($validated['status']) && $validated['status'] !== 'all') {
            $query->where('status', strtolower($validated['status']));
        }

        // Basic search across title, order number, client name
        if (!empty($validated['q'])) {
            $q = $validated['q'];
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")
                    ->orWhere('order_number', 'like', "%{$q}%")
                    ->orWhereHas('clients', function ($c) use ($q) {
                        $c->where('name', 'like', "%{$q}%");
                    })
                    ->orWhereHas('samples', function ($s) use ($q) {
                        $s->where('name', 'like', "%{$q}%");
                    });
            });
        }

        // Map to lightweight shape used by the table
        $reportData = $query->latest()->get()->map(function ($o, $idx) {
            $sampleName = optional($o->samples->first())->name; // pick first sample if available
            // Join analysts' names if present
            $analystNames = $o->analysts->pluck('name')->filter()->values()->all();
            return [
                'no' => $idx + 1,
                'id' => $o->id,
                'sample' => $sampleName,
                'client' => optional($o->clients)->name,
                'analis' => !empty($analystNames) ? implode(', ', $analystNames) : null,
                'status' => $this->mapStatusLabel($o->status),
            ];
        });

        return Inertia::render('manager/report-validation/index', [
            'reportData' => $reportData,
        ]);
    }

    public function orders()
    {
        // Orders listing with optional filters
        $orders = Order::with(['clients', 'analyses_methods'])
            ->latest()
            ->get()
            ->map(function ($o, $idx) {
                return [
                    'no' => $idx + 1,
                    'id' => $o->id,
                    'user' => optional($o->clients)->name,
                    'title' => $o->title,
                    'estimasi' => $o->estimate_date,
                    'report_issued_at' => $o->report_issued_at,
                    'tipe' => $this->mapOrderType($o->order_type),
                    'status' => $this->mapStatusLabel($o->status),
                    'order_number' => $o->order_number,
                    'analyses_method' => optional($o->analyses_methods)->analyses_method,
                    'report_file_path' => $o->report_file_path,
                    'result_value' => $o->result_value,
                    'catatan' => $o->notes,
                ];
            });

        return Inertia::render('manager/orders/index', [
            'ordersData' => $orders,
        ]);
    }

    public function users()
    {
        // Users listing (lightweight fields for table)
        $users = User::orderByDesc('created_at')
            ->get()
            ->map(function ($u, $idx) {
                return [
                    'no' => $idx + 1,
                    'id' => $u->id,
                    'name' => $u->name,
                    'role' => $u->role,
                    'email' => $u->email,
                    'created_at' => $u->created_at,
                ];
            });

        return Inertia::render('manager/users/index', [
            'usersData' => $users,
        ]);
    }

    public function detailOrder(Request $request)
    {
        $data = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        $order = Order::with(['clients', 'samples', 'samples.sample_categories', 'analyses_methods', 'analysts'])
            ->find($data['id']);

        if (!$order) {
            abort(404);
        }

        // Shape data to the UI's current expectation (close to mock structure)
        $detail = [
            'id' => $order->id,
            'client' => optional($order->clients)->name,
            'status' => $order->status,
            'orderType' => $order->order_type,
            'orderDate' => optional($order->created_at) ? $order->created_at->toDateString() : null,
            'estimatedDate' => $order->estimate_date,
            'metodeAnalisis' => optional($order->analyses_methods)->analyses_method,
            'laporanTerbit' => $order->report_issued_at,
            'notes' => $order->notes,
            'samples' => $order->samples->map(function ($s) {
                return [
                    'id' => $s->id,
                    'kategori' => optional($s->sample_categories)->name ?? null,
                    'nama' => $s->name,
                    'bentuk' => $s->form,
                    'metodePengawetan' => $s->preservation_method,
                    'volume' => (string) $s->sample_volume,
                    'kondisi' => $s->condition,
                    'temperatur' => $s->temperature,
                    // Parameter/method fields would come from relations if modeled; placeholders for now
                    'parameter' => [
                        'name' => null,
                        'category' => null,
                        'detectionLimit' => null,
                    ],
                    'method' => [
                        'name' => null,
                        'reference' => null,
                        'duration' => null,
                        'validityPeriod' => null,
                    ],
                ];
            }),
            'analysts' => $order->analysts->map(function ($a) {
                return [
                    'name' => $a->name,
                    'role' => $a->specialist,
                    'verified' => true,
                ];
            }),
        ];

        return Inertia::render('manager/report-validation/detail/index', [
            'detailData' => $detail,
        ]);
    }

    private function mapStatusLabel(?string $status): ?string
    {
        if (!$status) return null;
        return match ($status) {
            'completed' => 'Completed',
            'in_progress' => 'In Progress',
            'pending' => 'Pending',
            'disapproved' => 'Disapproved',
            'approved' => 'Approved',
            'received' => 'Received',
            default => ucfirst($status),
        };
    }

    private function mapOrderType(?string $type): ?string
    {
        if (!$type) return null;
        return match ($type) {
            'internal' => 'Internal',
            'external' => 'Eksternal',
            'urgent' => 'Urgent',
            'regular' => 'Regular',
            default => ucfirst($type),
        };
    }
}
