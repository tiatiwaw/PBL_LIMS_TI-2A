<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/index');
    }

    public function users()
    {
        return Inertia::render('admin/ManageUsers');
    }
}
