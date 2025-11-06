<?php

namespace App\Http\Controllers;

use App\Models\Client;
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

    public function search(Request $request)
    {
        $keyword = $request->input('q');

        $clients = Client::query()
            ->where('name', 'like', "%{$keyword}%")
            ->orWhere('email', 'like', "%{$keyword}%")
            ->orWhere('phone', 'like', "%{$keyword}%")
            ->limit(10)
            ->get(['id', 'name', 'email', 'phone']);

        return response()->json($clients);
    }
}