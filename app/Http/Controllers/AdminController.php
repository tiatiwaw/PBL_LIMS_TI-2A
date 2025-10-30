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

    public function equipment()
    {
        return Inertia::render('admin/tools/equipments/index');
    }

    public function brands()
    {
        return Inertia::render('admin/tools/brands/index');
    }

    public function reagents()
    {
        return Inertia::render('admin/materials/reagents/index');
    }

    public function grades()
    {
        return Inertia::render('admin/materials/grades/index');
    }

    public function suppliers()
    {
        return Inertia::render('admin/materials/suppliers/index');
    }

    public function parameter()
    {
        return Inertia::render('admin/test/parameter/index');
    }

    public function method()
    {
        return Inertia::render('admin/test/method/index');
    }

    public function unitValue()
    {
        return Inertia::render('admin/test/unit-value/index');
    }

    public function standardReference()
    {
        return Inertia::render('admin/test/standard-reference/index');
    }

    public function category()
    {
        return Inertia::render('admin/test/category/index');
    }

    public function logActivity()
    {
        return Inertia::render('admin/log-activity/index');
    }

    public function users()
    {
        return Inertia::render('admin/users/index');
    }
}
