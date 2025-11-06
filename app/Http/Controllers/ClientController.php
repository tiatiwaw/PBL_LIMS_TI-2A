<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return redirect()->route('client.dashboard');
    }
    public function profile()
    {
        // Logic for displaying the client dashboard
        return Inertia::render('client/profile');
    }

    public function dashboard()
    {
        // Logic for displaying the client dashboard
        return Inertia::render('client/dashboard');
    }
    

    public function show()
    {
        // Logic for displaying the client dashboard
        return Inertia::render('client/details');
    }

    public function history()
    {
        // Logic for displaying the client dashboard
        return Inertia::render('client/history');
    }
}
