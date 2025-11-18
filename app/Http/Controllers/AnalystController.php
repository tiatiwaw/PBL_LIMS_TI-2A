<?php

namespace App\Http\Controllers;

use App\Models\NParameterMethod;
use Inertia\Inertia;
use App\Models\Sample;

class AnalystController extends Controller
{
    public function index()
    {
        dd(NParameterMethod::pluck('sample_id')->toArray());
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
