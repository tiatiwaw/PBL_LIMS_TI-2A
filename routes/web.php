<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\StaffController;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Route untuk guest (login + register)
Route::middleware('guest')
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::inertia('/login', 'auth/login/index')->name('login.form');  // GET /auth/login untuk form
        Route::post('/login', [AuthController::class, 'login'])->name('login');  // POST /auth/login untuk proses
    });

// Admin
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');
        
        Route::prefix('tools')
            ->name('tools.')
            ->group(function () {
                Route::get('/equipments', [AdminController::class, 'equipment'])->name('equipments');
                Route::get('/brands', [AdminController::class, 'brands'])->name('brands');
        });

        Route::prefix('materials')
            ->name('materials.')
            ->group(function () {
                Route::get('/reagents', [AdminController::class, 'reagents'])->name('reagents');
                Route::get('/grades', [AdminController::class, 'grades'])->name('grades');
                Route::get('/suppliers', [AdminController::class, 'suppliers'])->name('suppliers');
        });
        
        Route::prefix('sampling')
            ->name('sampling.')
            ->group(function () {
                Route::get('/sample', [AdminController::class, 'sample'])->name('sample');
                Route::get('/category', [AdminController::class, 'category'])->name('category');
        });
        
        Route::prefix('test')
            ->name('test.')
            ->group(function () {
                Route::get('/parameter', [AdminController::class, 'parameter'])->name('parameter');
                Route::get('/test-method', [AdminController::class, 'method'])->name('method');
                Route::get('/unit-value', [AdminController::class, 'unitValue'])->name('unit');
                Route::get('/standard-reference', [AdminController::class, 'standardReference'])->name('standard');
        });
        
        Route::get('/log-activity', [AdminController::class, 'logActivity'])->name('log');
        Route::get('/users', [AdminController::class, 'users'])->name('users');
    });

// Analyst
Route::middleware(['auth', 'analyst'])
    ->prefix('analyst')
    ->name('analyst.')
    ->group(function () {
        Route::get('/', [AnalystController::class, 'index'])->name('index');
        Route::get('/inbox', [AnalystController::class, 'inbox'])->name('inbox');
        Route::get('/history', [AnalystController::class, 'history'])->name('history');
    });

//Manager
Route::middleware(['auth', 'manager'])
    ->prefix('manager')
    ->name('manager.')
    ->group(function () {
        Route::get('/', [ManagerController::class, 'index'])->name('index');

        Route::prefix('report-validation')
            ->name('report.validation.')
            ->group(function () {
                Route::get('/', [ManagerController::class, 'reportValidation'])->name('index');
                Route::get('/detail', [ManagerController::class, 'detailOrder'])->name('detail');
        });

        Route::get('/orders', [ManagerController::class, 'orders'])->name('orders');
        Route::get('/users', [ManagerController::class, 'users'])->name('users');
    });

// Staff
Route::middleware(['auth', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function () {
        Route::redirect('/', '/staff/manage-clients');

        Route::get('/manage-clients', [StaffController::class, 'managementClient'])->name('clients');
        Route::get('/samples', [StaffController::class, 'sample'])->name('sample');
        Route::get('/orders', [StaffController::class, 'order'])->name('order');
    });

// Route untuk logout (hanya untuk user yang sudah login)
Route::get('/logout', [AuthController::class, 'logout'])
    ->name('auth.logout')
    ->middleware('auth');

require __DIR__ . '/auth.php';
