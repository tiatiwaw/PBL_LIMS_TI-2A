<?php

namespace App\Http\Controllers;

use App\Models\Order;
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

    public function downloadReceipt($order_number)
    {
        return Inertia::render('client/receipt/index', [
            'order_number' => $order_number
        ]);
    }

    public function report()
    {
        return Inertia::render('client/report/index');
    }


    /**
     * Show order detail page
     */
    public function orderDetail($id)
    {
        return Inertia::render('client/detail/index', [
            'orderId' => $id
        ]);
    }

    public function orderPayment($id)
    {
        return Inertia::render('client/payment/index', [
            'orderId' => $id
        ]);
    }

    public function orderTransaction($reference)
    {
        return Inertia::render('client/transaction/index', [
            'reference' => $reference,
        ]);
    }

    public function orderStatus($order_number)
    {
        return Inertia::render('client/history/index', [
            'orderId' => $order_number,
        ]);
    }
}