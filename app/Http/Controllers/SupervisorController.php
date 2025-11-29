<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    public function ordersFollowUp()
    {
        return Inertia::render('supervisor/orders/follow-up/index');
    }
    public function ordersHistory()
    {
        return Inertia::render('supervisor/orders/history/index');
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
}
