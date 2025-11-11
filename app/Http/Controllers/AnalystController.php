<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AnalystController extends Controller
{
    public function index()
    {
        return redirect()->route('analyst.dashboard');
    }

    public function dashboard()
    {
        // Hanya render page, data diambil di React via hooks
        return Inertia::render('analyst/dashboard');
    }

    public function profile()
    {
        return Inertia::render('analyst/profile');
    }

    public function order()
    {
        return Inertia::render('analyst/order');
    }

    public function detail($orderId)
    {
        return Inertia::render('analyst/order-detail', [
            'orderId' => $orderId // biar hook bisa fetch detail API
        ]);
    }
}
