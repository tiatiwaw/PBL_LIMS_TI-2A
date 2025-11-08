<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use App\Models\Sample;
use App\Models\SampleCategory;
use App\Models\NOrderSample;
use App\Models\Order;
use App\Models\AnalysesMethod;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    // ================================
    // KLIEN
    // ================================
    public function index()
    {
        $clients = Client::with('users')->get();

        return Inertia::render('staff/clients/index', [
            'clientData' => $clients,
        ]);
    }

    // ================================
    // ORDER
    // ================================
    public function indexOrder()
    {
        $samples = Sample::with('sample_categories')->get();
        $methods = AnalysesMethod::all();
        $clients = Client::all();
        $categories = SampleCategory::all();
        // 🔹 Buat nomor order otomatis
        $lastOrder = Order::latest('id')->first();
        $nextNumber = str_pad(($lastOrder ? $lastOrder->id + 1 : 1), 4, '0', STR_PAD_LEFT);
        $orderNumber = 'ORD-' . now('Asia/Jakarta')->format('Ymd') . '-' . $nextNumber;

        return Inertia::render('staff/orders/index', [
            'samples' => $samples,
            'methods' => $methods,
            'clients' => $clients,
            'categories' => $categories,
            'orderNumber' => $orderNumber,
        ]);
    }
}
