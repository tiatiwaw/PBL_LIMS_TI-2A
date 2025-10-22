<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerController extends Controller
{
    public function index()
    {
        return Inertia::render('manager/index');
    }

    public function reportValid()
    {
        return Inertia::render('manager/report-validation/index');
    }

    public function orders()
    {

        return Inertia::render('manager/orders/index');
    }

    public function users()
    {
        // Ganti nama file 'Users' sesuai dengan nama file JSX Anda
        return Inertia::render('manager/users/index');
    }
}