<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // <-- Pastikan ini ada

class ManagerController extends Controller
{
    public function index()
    {
        // Mengarah ke file: /resources/js/Pages/Manager/Index.jsx
        return Inertia::render('manager/index');
    }

    public function validasiLaporan()
    {
        return Inertia::render('manager/reportvalid');
    }

    public function orders()
    {
    
        return Inertia::render('manager/orders');
    }

    public function users()
    {
        // Ganti nama file 'Users' sesuai dengan nama file JSX Anda
        return Inertia::render('manager/users');
    }
}