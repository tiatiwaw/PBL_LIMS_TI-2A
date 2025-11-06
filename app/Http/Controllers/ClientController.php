<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('client/index');
    }

    public function dashboardStats()
    {
        return Inertia::render('client/dashboard/stats');
    }

    public function dashboardOrders()
    {
        return Inertia::render('client/dashboard/orders');
    }

    public function detailsOrder($id)
    {
        return Inertia::render('client/details/order', ['id' => $id]);
    }

    public function detailsSamples($id)
    {
        return Inertia::render('client/details/samples', ['id' => $id]);
    }

    public function detailsSampleInfo($id)
    {
        return Inertia::render('client/details/sample-info', ['id' => $id]);
    }

    public function historyTimeline()
    {
        return Inertia::render('client/history/timeline');
    }
}