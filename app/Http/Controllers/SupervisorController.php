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
    public function parameters($id)
    {
        return Inertia::render('supervisor/orders/parameters/index', [
            'id' => $id
        ]);
    }
    public function parametersDetail()
    {
        return Inertia::render('supervisor/orders/parameters/detail/index');
    }
}
