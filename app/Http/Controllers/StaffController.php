<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{

    // public function index()
    // {
    //     return Inertia::render('staff/index');
    // }
    public function sample()
    {
        return Inertia::render('staff/samples/index');
    }
    public function managementClient()
    {
        return Inertia::render('staff/clients/index');
    }
    public function order()
    {
        return Inertia::render('staff/orders/index');
    }
}
