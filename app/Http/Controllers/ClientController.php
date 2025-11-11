<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('client/index');
    }

    public function profile()
    {
        return Inertia::render('client/profile/index');
    }

    public function history()
    {
        return Inertia::render('client/history/index');
    }
}