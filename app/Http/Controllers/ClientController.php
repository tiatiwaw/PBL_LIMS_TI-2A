<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * API untuk autocomplete pencarian client
     * dipanggil saat staff mengetik nama/email/telepon
     */
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
