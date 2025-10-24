<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.beranda');
    }
    public function beranda()
    {
        return Inertia::render('admin/beranda');
    }
    public function alat()
    {
        return Inertia::render('admin/alat');
    }
     public function bahan()
    {
        return Inertia::render('admin/bahan');
    }
     public function aktivitas_log()
    {
        return Inertia::render('admin/aktivitas_log');
    }
         public function pengguna()
    {
        return Inertia::render('admin/pengguna');
    }
             public function master_data()
    {
        return Inertia::render('admin/master_data');
    }

}
