<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function profile()
    {
        return Inertia::render('client/profile');
    }

    public function index()
    {
        return Inertia::render('client/index');
    }

    public function history()
    {
        return Inertia::render('client/history/index');
    }
}
