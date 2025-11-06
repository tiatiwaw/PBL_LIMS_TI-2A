<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientController;

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
    Route::prefix('test')->name('.test')->group(function () {
        Route::get('/parameter', [AdminController::class, 'parameter'])->name('.parameter');
        Route::get('/test-method', [AdminController::class, 'method'])->name('.method');
        Route::get('/unit-value', [AdminController::class, 'unitValue'])->name('.unit');
        Route::get('/standard-reference', [AdminController::class, 'standardReference'])->name('.standard');
        Route::get('/category', [AdminController::class, 'category'])->name('.category');
        Route::get('/category', [AdminController::class, 'category'])->name('.category');
    });
    Route::get('/log-activity', [AdminController::class, 'logActivity'])->name('.log');
    Route::get('/users', [AdminController::class, 'users'])->name('.users');
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
    Route::prefix('report-validation')->name('.report')->group(function () {
        Route::get('/', [ManagerController::class, 'reportValidation'])->name('.index');
        Route::get('/detail', [ManagerController::class, 'detailValidation'])->name('.detail');
    });
    Route::prefix('orders')->name('.orders')->group(function () {
        Route::get('/', [ManagerController::class, 'orders'])->name('.index');
        Route::get('/detail', [ManagerController::class, 'detailValidation'])->name('.detail');
    });
    Route::prefix('orders')->name('.orders')->group(function () {
        Route::get('/', [ManagerController::class, 'orders'])->name('.index');
        Route::get('/detail', [ManagerController::class, 'detailOrder'])->name('.detail');
    });
    Route::get('/users', [ManagerController::class, 'users'])->name('.users');
});

// Di dalam file: routes/web.php

// Di dalam file: routes/web.php

// Staff
Route::prefix('staff')->name('staff.')->group(function () {
Route::prefix('staff')->name('staff.')->group(function () {
    Route::redirect('/', '/staff/manage-clients');

    // --- Manajemen Klien ---
    Route::get('/manage-clients', [StaffController::class, 'clientIndex'])->name('client.index');
    Route::post('/manage-clients', [StaffController::class, 'clientStore'])->name('client.store');
    Route::put('/manage-clients/{client}', [StaffController::class, 'clientUpdate'])->name('client.update');
    Route::delete('/manage-clients/{client}', [StaffController::class, 'clientDestroy'])->name('client.destroy');

    // // --- Manajemen Sample (RUTE BARU DITAMBAHKAN) ---
    // Route::post('/samples', [StaffController::class, 'sampleStore'])->name('sample.store');

    // --- Rute Lain ---
    Route::get('/orders', [StaffController::class, 'order'])->name('order.index');
    Route::post('/orders/sample', [StaffController::class, 'sampleStore'])->name('sample.store');
    Route::post('/orders', [StaffController::class, 'storeOrder'])->name('order.store');
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
