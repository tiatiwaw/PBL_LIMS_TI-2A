<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index() {
        return redirect()->route('analyst.inbox');
    }

    public function inbox() {
        return Inertia::render('analyst/inbox');
    }

    public function history() {
        return Inertia::render('analyst/history');
    }

    public function show() {
        return Inertia::render('analyst/inbox-detail');
    }
}
