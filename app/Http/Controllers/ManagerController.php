<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Order;

class ManagerController extends Controller
{
    public function index()
    {
        return Inertia::render('manager/index');
    }

    public function reportValidation()
    {
        $reports = Order::with('clients:id,name')->get();

        return Inertia::render('manager/report-validation/index', [
            'reports' => $reports,
        ]);
    }

    public function reportValidations()
    {
         return Inertia::render('manager/detail/index');
    }
    
    public function detail($id)
    {
        $order = Order::with([
            'clients',
            'samples',
            'analysts',
            'analysesMethods',
            'samples.n_parameter_methods.test_parameters',
            'samples.n_parameter_methods.test_methods',
            'samples.n_parameter_methods.equipments',
            'samples.n_parameter_methods.reagents',
        ])->findOrFail($id);
    
        // ---- CLIENT (dipastikan ADA) ----
        // -------- FIX CLIENT ----------
        if (!$order->clients) {
            $order->client = (object)[
                'id'   => null,
                'name' => '-',
                'user' => (object)[
                    'name' => '-'
                ]
            ];
        } else {
            $order->client = (object)[
                'id'   => $order->clients->id,
                'name' => $order->clients->name,
                'user' => (object)[
                    'name' => $order->clients->user->name ?? '-'
                ]
            ];
        }
        unset($order->clients);

    
        // ---- SAMPLES (dipastikan ADA semua field) ----
        foreach ($order->samples as $sample) {
    
            $npm = $sample->n_parameter_methods;
    
            $sample->parameter = (object)[
                'name' => $npm->test_parameters->name ?? '-',
            ];
    
            $sample->method = (object)[
                'name' => $npm->test_methods->name ?? '-',
            ];
    
            // Equipment & reagents WAJIB array biar tidak .map error
            $sample->equipements = $npm->equipments ?? [];
            $sample->reagents    = $npm->reagents ?? [];
        }
    
        // ---- ANALYSTS (dipastikan array & ada name) ----
        $order->analysts = collect($order->analysts ?? [])->map(function ($a) {
            return (object)[
                'id'   => $a->id ?? null,
                'name' => $a->name ?? '-',  // <--- WAJIB
            ];
        });
    
        // ---- ANALYSIS METHODS (dipastikan array) ----
        $order->analysis_methods = $order->analysesMethods ?? [];
        unset($order->analysesMethods);
    
        return Inertia::render('manager/detail/index', [
            'id' => $id,
            'order' => $order,
            'canValidate' => true,
        ]);
    }
    
    public function show($id)
    {
        $order = Order::with([
            'client.user',
            'samples.parameter',
            'samples.method',
            'samples.equipments',
            'samples.reagents',
            'analysts',
            'analysis_methods',
        ])->findOrFail($id);
    
        return Inertia::render('manager/detail/index', [
            'id' => $id,
            'auth' => auth()->user(),
            'canValidate' => auth()->user()->hasRole('manager'),
            'order' => $order,
        ]);
    }
    

    public function orders()
    {
        $orders = Order::with([
            'samples:id,name',          // relasi sampel
            'clients:id,name',          // relasi client
            'analysts:id,name',         // relasi analis
        ])
        ->select('id', 'order_number', 'client_id', 'title', 'status')
        ->latest()
        ->get();

        return inertia('manager/orders/index', [
            'ordersData' => $orders
        ]);
    }

    public function detailOrder()
    {
        return Inertia::render('manager/detail/index', [
            'canValidate' => false,
        ]);
    }

    public function users()
    {
        return Inertia::render('manager/users/index');
    }
}