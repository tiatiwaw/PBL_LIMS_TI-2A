<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\StaffController;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Admin
Route::controller(AdminController::class)->name('admin')->group(function () {
    Route::get('/admin', 'index')->name('admin');
    Route::get('/admin/users', 'users')->name('.users');
});

// Staff
Route::prefix('staff')->name('staff')->group(function () {
    Route::get('/', [StaffController::class, 'index'])->name('.index');
    Route::get('/clients', [StaffController::class, 'clients'])->name('.clients');
    
    Route::get('/sample', [StaffController::class, 'sample'])->name('.sample'); 
    Route::get('/samples', function () {
        return inertia('staff/samples/index');
    })->name('.samples');

    Route::get('/order', [StaffController::class, 'order'])->name('.order'); 
    Route::get('/orders', function () {
        return inertia('staff/orders/index');
    })->name('.orders');
});

// Analyst
Route::prefix('analyst')->name('analyst')->group(function () {
    Route::get('/', [AnalystController::class, 'index'])->name('.index');
    Route::get('/inbox', [AnalystController::class, 'inbox'])->name('.inbox');
    Route::get('/history', [AnalystController::class, 'history'])->name('.history');
});

// Login
Route::controller(LoginController::class)->name('login')->group(function () {
    Route::get('/auth/login', 'index')->name('login');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
