<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\SupervisorController;

// Home
Route::controller(HomeController::class)->name('index')->group(function () {
    Route::get('/', 'index')->name('index');
});

// Login
Route::get('/login', function () {
    return redirect()->route('auth.login.form');
})->name('login');

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
        
        // Tools Routes
        Route::prefix('tools')
            ->name('tools.')
            ->group(function () {
                Route::get('/equipments', [AdminController::class, 'equipment'])->name('equipments');
                Route::post('/equipments', [AdminController::class, 'storeEquipment'])->name('equipments.store');
                Route::put('/equipments/{id}', [AdminController::class, 'updateEquipment'])->name('equipments.update');
                Route::delete('/equipments/{id}', [AdminController::class, 'destroyEquipment'])->name('equipments.destroy');
                
                Route::get('/brands', [AdminController::class, 'brands'])->name('brands');
                Route::post('/brands', [AdminController::class, 'storeBrand'])->name('brands.store');
                Route::put('/brands/{id}', [AdminController::class, 'updateBrand'])->name('brands.update');
                Route::delete('/brands/{id}', [AdminController::class, 'destroyBrand'])->name('brands.destroy');
        });

        // Materials Routes
        Route::prefix('materials')
            ->name('materials.')
            ->group(function () {
                Route::get('/reagents', [AdminController::class, 'reagents'])->name('reagents');
                Route::post('/reagents', [AdminController::class, 'storeReagent'])->name('reagents.store');
                Route::put('/reagents/{id}', [AdminController::class, 'updateReagent'])->name('reagents.update');
                Route::delete('/reagents/{id}', [AdminController::class, 'destroyReagent'])->name('reagents.destroy');
                
                Route::get('/grades', [AdminController::class, 'grades'])->name('grades');
                Route::post('/grades', [AdminController::class, 'storeGrade'])->name('grades.store');
                Route::put('/grades/{id}', [AdminController::class, 'updateGrade'])->name('grades.update');
                Route::delete('/grades/{id}', [AdminController::class, 'destroyGrade'])->name('grades.destroy');
                
                Route::get('/suppliers', [AdminController::class, 'suppliers'])->name('suppliers');
                Route::post('/suppliers', [AdminController::class, 'storeSupplier'])->name('suppliers.store');
                Route::put('/suppliers/{id}', [AdminController::class, 'updateSupplier'])->name('suppliers.update');
                Route::delete('/suppliers/{id}', [AdminController::class, 'destroySupplier'])->name('suppliers.destroy');
        });

        // Test Routes (menggabungkan sampling dan test)
        Route::prefix('tests')
            ->name('tests.')
            ->group(function () {
                // Parameters
                Route::get('/parameters', [AdminController::class, 'parameters'])->name('parameters');
                Route::post('/parameters', [AdminController::class, 'storeParameter'])->name('parameters.store');
                Route::put('/parameters/{id}', [AdminController::class, 'updateParameter'])->name('parameters.update');
                Route::delete('/parameters/{id}', [AdminController::class, 'destroyParameter'])->name('parameters.destroy');
                
                // Methods
                Route::get('/methods', [AdminController::class, 'methods'])->name('methods');
                Route::post('/methods', [AdminController::class, 'storeMethod'])->name('methods.store');
                Route::put('/methods/{id}', [AdminController::class, 'updateMethod'])->name('methods.update');
                Route::delete('/methods/{id}', [AdminController::class, 'destroyMethod'])->name('methods.destroy');
                
                // Units
                Route::get('/units', [AdminController::class, 'units'])->name('units');
                Route::post('/units', [AdminController::class, 'storeUnit'])->name('units.store');
                Route::put('/units/{id}', [AdminController::class, 'updateUnit'])->name('units.update');
                Route::delete('/units/{id}', [AdminController::class, 'destroyUnit'])->name('units.destroy');
                
                // Standards
                Route::get('/standards', [AdminController::class, 'standards'])->name('standards');
                Route::post('/standards', [AdminController::class, 'storeStandard'])->name('standards.store');
                Route::put('/standards/{id}', [AdminController::class, 'updateStandard'])->name('standards.update');
                Route::delete('/standards/{id}', [AdminController::class, 'destroyStandard'])->name('standards.destroy');
                
                // Categories
                Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
                Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
                Route::put('/categories/{id}', [AdminController::class, 'updateCategory'])->name('categories.update');
                Route::delete('/categories/{id}', [AdminController::class, 'destroyCategory'])->name('categories.destroy');
        });

        // Additional Routes
        Route::get('/orders', [AdminController::class, 'orders'])->name('orders');
        Route::get('/activities', [AdminController::class, 'activities'])->name('activities');
        
        // Users Routes
        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
        Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{id}', [AdminController::class, 'destroyUser'])->name('users.destroy');
        
        // Log Activity (tetap seperti semula)
        Route::get('/log-activity', [AdminController::class, 'logActivity'])->name('log');
    });

// Manager
Route::middleware(['auth', 'manager'])
    ->prefix('manager')
    ->name('manager.')
    ->group(function () {
        Route::get('/', [ManagerController::class, 'index'])->name('index');

        // Report Validation Routes
        Route::prefix('report-validation')
            ->name('report.validation.')
            ->group(function () {
                Route::get('/', [ManagerController::class, 'reportValidation'])->name('index');
                Route::get('/{id}', [ManagerController::class, 'showReportValidation'])->name('show');
                Route::put('/{id}', [ManagerController::class, 'updateReportValidation'])->name('update');
        });

        // Orders Routes
        Route::prefix('orders')
            ->name('orders.')
            ->group(function () {
                Route::get('/', [ManagerController::class, 'orders'])->name('index');
                Route::get('/{id}', [ManagerController::class, 'showOrder'])->name('show');
        });

        // Users Routes
        Route::prefix('users')
            ->name('users.')
            ->group(function () {
                Route::get('/', [ManagerController::class, 'users'])->name('index');
                Route::put('/{user}', [ManagerController::class, 'updateUser'])->name('update');
                Route::delete('/{user}', [ManagerController::class, 'destroyUser'])->name('destroy');
        });
    });

// Staff
Route::middleware(['auth', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function () {
        Route::redirect('/', '/staff/manage-clients');

        // Client Routes
        Route::prefix('manage-clients')
            ->name('client.')
            ->group(function () {
                Route::get('/', [StaffController::class, 'index'])->name('index');
                Route::post('/', [StaffController::class, 'store'])->name('store');
                Route::put('/{id}', [StaffController::class, 'update'])->name('update');
                Route::delete('/{id}', [StaffController::class, 'destroy'])->name('delete');
            });

        // Order Routes
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', [StaffController::class, 'indexOrder'])->name('index');
                Route::post('/', [StaffController::class, 'storeOrder'])->name('storeOrder');
                Route::post('/sample', [StaffController::class, 'storeSample'])->name('storeSample');
            });
    });

// Supervisor
Route::middleware(['auth', 'supervisor'])
    ->prefix('supervisor')
    ->name('supervisor.')
    ->group(function () {
        Route::get('/', [SupervisorController::class, 'index'])->name('index');

    });
    
// Analyst
Route::middleware(['auth', 'analyst'])
    ->prefix('analyst')
    ->name('analyst.')
    ->group(function () {
        Route::get('/', [AnalystController::class, 'index'])->name('index');
        Route::get('/inbox', [AnalystController::class, 'inbox'])->name('inbox');
        Route::get('/history', [AnalystController::class, 'history'])->name('history');

        // Dashboard
        Route::get('/dashboard', [AnalystController::class, 'dashboard'])->name('dashboard');

        // Order Routes
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', [AnalystController::class, 'order'])->name('index');
                Route::get('/{order}', [AnalystController::class, 'orderDetail'])->name('detail');
                Route::put('/{order}/accept', [AnalystController::class, 'acceptOrder'])->name('accept');
                Route::post('/{order}/download', [AnalystController::class, 'downloadOrder'])->name('download');
            });

        // Sample Routes
        Route::prefix('samples')
            ->name('sample.')
            ->group(function () {
                Route::post('/{sample}/confirm', [AnalystController::class, 'confirmSample'])->name('confirm');
                Route::post('/{sample}/unconfirm', [AnalystController::class, 'unconfirmSample'])->name('unconfirm');
            });

        // Report Routes
        Route::prefix('reports')
            ->name('report.')
            ->group(function () {
                Route::post('/', [AnalystController::class, 'createReport'])->name('create');
                Route::put('/{report}', [AnalystController::class, 'updateReport'])->name('update');
            });
    });

// Client
Route::middleware(['auth', 'client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/', [ClientController::class, 'index'])->name('index');
        
        // Dashboard Routes
        Route::prefix('dashboard')
            ->name('dashboard.')
            ->group(function () {
                Route::get('/stats', [ClientController::class, 'dashboardStats'])->name('stats');
                Route::get('/orders', [ClientController::class, 'dashboardOrders'])->name('orders');
            });

        // Details Routes
        Route::prefix('details')
            ->name('details.')
            ->group(function () {
                Route::get('/order/{order}', [ClientController::class, 'detailsOrder'])->name('order');
                Route::get('/samples', [ClientController::class, 'detailsSamples'])->name('samples');
                Route::get('/samples/{sample}/info', [ClientController::class, 'detailsSampleInfo'])->name('samples.info');
            });

        // History Routes
        Route::prefix('history')
            ->name('history.')
            ->group(function () {
                Route::get('/timeline', [ClientController::class, 'historyTimeline'])->name('timeline');
            });
    });

// Route untuk logout (hanya untuk user yang sudah login)
Route::get('/logout', [AuthController::class, 'logout'])
    ->name('auth.logout')
    ->middleware('auth');

require __DIR__ . '/auth.php';
