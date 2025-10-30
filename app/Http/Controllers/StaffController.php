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
        $samples = \App\Models\Sample::all();
        $methods = \App\Models\AnalysesMethod::all();
        $clients = \App\Models\Client::all();

        return Inertia::render('staff/orders/index', [
        'samples' => $samples,
        'methods' => $methods,
        'clients' => $clients,
        ]);
    }
}
