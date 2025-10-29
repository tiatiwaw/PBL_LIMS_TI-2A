<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class ManagerController extends Controller
{
    public function index()
    {
        $totalOrders = Order::count();
        // $totalOrders = 100;
        return Inertia::render(
            'manager/index', [
                'totalOrders' => $totalOrders,
            ]
        );
    }

    public function reportValidation()
    {
        return Inertia::render('manager/report-validation/index');
    }

    public function orders()
    {

        return Inertia::render('manager/orders/index');
    }

    public function users()
    {
        return Inertia::render('manager/users/index');
    }

    public function detailOrder()
    {
        return Inertia::render('manager/report-validation/detail/index');
    }
}