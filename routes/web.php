<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\ManagerController;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Admin
Route::prefix('admin')->name('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('.index');
    Route::get('/beranda', [AdminController::class, 'beranda'])->name('.beranda');
    Route::get('/alat', [AdminController::class, 'alat'])->name('.alat');
    Route::get('/bahan', [AdminController::class, 'bahan'])->name('.bahan');
    Route::get('/aktivitas_log', [AdminController::class, 'aktivitas_log'])->name('.aktivitas_log');
    Route::get('/pengguna', [AdminController::class, 'pengguna'])->name('.pengguna');
    Route::get('/master_data', [AdminController::class, 'master_data'])->name('.master_data');

});

// Analyst
Route::prefix('analyst')->name('analyst')->group(function () {
    Route::get('/', [AnalystController::class, 'index'])->name('.index');
    Route::get('/inbox', [AnalystController::class, 'inbox'])->name('.inbox');
    Route::get('/history', [AnalystController::class, 'history'])->name('.history');
});

//Manager
Route::prefix('manager')->name('manager')->group(function () {
    Route::get('/', [ManagerController::class, 'index'])->name('.index');
    Route::get('/validasi-laporan', [ManagerController::class, 'validasiLaporan'])->name('.validasi-laporan');
    Route::get('/orders', [ManagerController::class, 'orders'])->name('.orders');
    Route::get('/users', [ManagerController::class, 'users'])->name('.users');
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
