<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        return Inertia::render('staff/index');
    }

    public function order()
    {
        return Inertia::render('order/index');
    }

    public function clients()
    {
        return Inertia::render('staff/clients/index');
    }
}
