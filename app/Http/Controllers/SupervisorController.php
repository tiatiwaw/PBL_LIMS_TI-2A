<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    public function orders()
    {
        return Inertia::render('supervisor/orders/index');
    }
    public function analysts()
    {
        return Inertia::render('supervisor/analysts/index');
    }
    public function ordersDetail($id)
    {
        return Inertia::render('supervisor/orders/detail/index', [
            'canValidate' => true,
            'id' => $id
        ]);
    }
    public function parameters()
    {
        return Inertia::render('supervisor/orders/index');
    }
    public function parametersDetail()
    {
        return Inertia::render('supervisor/orders/parameters/detail/index');
    }
    public function parametersFirst()
    {
        return Inertia::render('supervisor/orders/parameters/first/index');
    }
    public function parametersSecond()
    {
        return Inertia::render('supervisor/orders/parameters/second/index');
    }
    public function parametersReview()
    {
        return Inertia::render('supervisor/orders/parameters/review/index');
    }
}
