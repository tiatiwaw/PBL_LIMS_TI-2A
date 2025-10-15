<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Admin
Route::controller(AdminController::class)->name('admin')->group(function () {
    Route::get('/admin', 'index')->name('admin');
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
