<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\ClientController;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Analyst
Route::prefix('analyst')->name('analyst')->group(function () {
    Route::get('/', [AnalystController::class, 'index'])->name('.index');
    Route::get('/inbox', [AnalystController::class, 'inbox'])->name('.inbox');
    Route::get('/inbox/details', [AnalystController::class, 'show'])->name('.inbox.show');
    Route::get('/history', [AnalystController::class, 'history'])->name('.history');
});

Route::prefix('client')->name('client')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->name('.index');
    Route::get('/dashboard', [ClientController::class, 'dashboard'])->name('.dashboard');
    Route::get('/details', [ClientController::class, 'show'])->name('.show');
    Route::get('/history', [ClientController::class, 'history'])->name('.history');
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