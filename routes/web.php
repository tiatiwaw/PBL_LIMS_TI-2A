<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\ManagerController;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Admin
Route::prefix('admin')->name('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('.index');
    Route::prefix('tools')->name('.tools')->group(function () {
        Route::get('/equipments', [AdminController::class, 'equipment'])->name('.equipments');
        Route::get('/brands', [AdminController::class, 'brands'])->name('.brands');
    });
    Route::prefix('materials')->name('.materials')->group(function () {
        Route::get('/reagents', [AdminController::class, 'reagents'])->name('.reagents');
        Route::get('/grades', [AdminController::class, 'grades'])->name('.grades');
        Route::get('/suppliers', [AdminController::class, 'suppliers'])->name('.suppliers');
    });
    Route::prefix('sampling')->name('.sampling')->group(function () {
        Route::get('/sample', [AdminController::class, 'sample'])->name('.sample');
        Route::get('/category', [AdminController::class, 'category'])->name('.category');
    });
    Route::prefix('test')->name('.test')->group(function () {
        Route::get('/parameter', [AdminController::class, 'parameter'])->name('.parameter');
        Route::get('/test-method', [AdminController::class, 'method'])->name('.method');
        Route::get('/unit-value', [AdminController::class, 'unitValue'])->name('.unit');
        Route::get('/standard-reference', [AdminController::class, 'standardReference'])->name('.standard');
    });
    Route::get('/log-activity', [AdminController::class, 'logActivity'])->name('.log');
    Route::get('/users', [AdminController::class, 'users'])->name('.users');
});

// Analyst
Route::prefix('analyst')->name('analyst')->group(function () {
    Route::get('/', [AnalystController::class, 'index'])->name('.index');
    Route::get('/inbox', [AnalystController::class, 'inbox'])->name('.inbox');
    Route::get('/inbox/details', [AnalystController::class, 'show'])->name('.inbox.show');
    Route::get('/order', [AnalystController::class, 'order'])->name('.order');
    Route::get('/order/details', [AnalystController::class, 'detail'])->name('.order.detail');
    Route::get('/dashboard', [AnalystController::class, 'dashboard'])->name('.dashboard');

});

// Client
Route::prefix('client')->name('client')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->name('.index');
    Route::get('/dashboard', [ClientController::class, 'dashboard'])->name('.dashboard');
    Route::get('/order/details', [ClientController::class, 'show'])->name('.show');
    Route::get('/order/history', [ClientController::class, 'history'])->name('.history');
});

//Manager
Route::prefix('manager')->name('manager')->group(function () {
    Route::get('/', [ManagerController::class, 'index'])->name('.index');
    Route::prefix('report-validation')->name('.report')->group(function () {
        Route::get('/', [ManagerController::class, 'reportValidation'])->name('.index');
        Route::get('/detail', [ManagerController::class, 'detailOrder'])->name('.detail');
    });
    Route::get('/orders', [ManagerController::class, 'orders'])->name('.orders');
    Route::get('/users', [ManagerController::class, 'users'])->name('.users');
});

// Staff
Route::prefix('staff')->name('staff')->group(function () {
    Route::redirect('/', '/staff/manage-clients');

    Route::get('/manage-clients', [StaffController::class, 'managementClient'])->name('.clients');
    Route::get('/samples', [StaffController::class, 'sample'])->name('.sample');
    Route::get('/orders', [StaffController::class, 'order'])->name('.order');
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