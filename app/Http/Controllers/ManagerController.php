<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // <-- Pastikan ini ada

class ManagerController extends Controller
{
    public function index()
    {
        return redirect()->route('manager.index');
    }
    public function beranda(){
        // Mengarah ke file: /resources/js/Pages/Manager/Index.jsx
        return Inertia::render('manager/beranda/index');
    }

    public function reportValid()
    {
        return Inertia::render('manager/reportvalid/index');
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