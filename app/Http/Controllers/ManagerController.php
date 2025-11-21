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
        return Inertia::render('manager/report-validation/index');
    }

    public function reportValidations()
    {
        $reports = Order::with('clients:id,name')
            ->where('status', 'pending')
            ->select('id', 'order_number', 'client_id', 'status')
            ->latest()
            ->get()
            ->map(function ($order, $index) {
                return [
                    'no'     => $index + 1,
                    'sample' => $order->order_number,
                    'client' => $order->clients->name ?? '-',
                    'status' => $order->status,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $reports
        ]);
    }

    public function detailValidation()
    {
        return Inertia::render('manager/detail/index', [
            'canValidate' => true,
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