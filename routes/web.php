<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\SupervisorController;

// Home
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('index');
});

// Auth
Route::controller(AuthController::class)
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::middleware('guest')->group(function () {
            Route::get('/login', 'index')->name('index');
            Route::post('/login', 'login')->name('login');
        });

        Route::middleware('auth')->group(function () {
            Route::get('/logout', 'logout')->name('logout');
        });
    });

// Admin
Route::controller(AdminController::class)
    ->middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', 'index')->name('index');

        // Tools
        Route::prefix('tools')->name('tools.')->group(function () {
            Route::get('/equipments', 'equipments')->name('equipments');
            Route::post('/equipments', 'storeEquipment')->name('equipments.store');
            Route::put('/equipments/{id}', 'updateEquipment')->name('equipments.update');
            Route::delete('/equipments/{id}', 'destroyEquipment')->name('equipments.destroy');
            Route::get('/brands', 'brands')->name('brands');
            Route::post('/brands', 'storeBrand')->name('brands.store');
            Route::put('/brands/{id}', 'updateBrand')->name('brands.update');
            Route::delete('/brands/{id}', 'destroyBrand')->name('brands.destroy');
        });

        // Materials
        Route::prefix('materials')->name('materials.')->group(function () {
            Route::get('/reagents', 'reagents')->name('reagents');
            Route::post('/reagents', 'storeReagent')->name('reagents.store');
            Route::put('/reagents/{id}', 'updateReagent')->name('reagents.update');
            Route::delete('/reagents/{id}', 'destroyReagent')->name('reagents.destroy');

            Route::get('/grades', 'grades')->name('grades');
            Route::post('/grades', 'storeGrade')->name('grades.store');
            Route::put('/grades/{id}', 'updateGrade')->name('grades.update');
            Route::delete('/grades/{id}', 'destroyGrade')->name('grades.destroy');

            Route::get('/suppliers', 'suppliers')->name('suppliers');
            Route::post('/suppliers', 'storeSupplier')->name('suppliers.store');
            Route::put('/suppliers/{id}', 'updateSupplier')->name('suppliers.update');
            Route::delete('/suppliers/{id}', 'destroySupplier')->name('suppliers.destroy');
        });

        // Tests
        Route::prefix('tests')->name('tests.')->group(function () {
            Route::get('/parameters', 'parameters')->name('parameters');
            Route::post('/parameters', 'storeParameter')->name('parameters.store');
            Route::put('/parameters/{id}', 'updateParameter')->name('parameters.update');
            Route::delete('/parameters/{id}', 'destroyParameter')->name('parameters.destroy');

            Route::get('/methods', 'methods')->name('methods');
            Route::post('/methods', 'storeMethod')->name('methods.store');
            Route::put('/methods/{id}', 'updateMethod')->name('methods.update');
            Route::delete('/methods/{id}', 'destroyMethod')->name('methods.destroy');

            Route::get('/units', 'units')->name('units');
            Route::post('/units', 'storeUnit')->name('units.store');
            Route::put('/units/{id}', 'updateUnit')->name('units.update');
            Route::delete('/units/{id}', 'destroyUnit')->name('units.destroy');

            Route::get('/references', 'references')->name('references');
            Route::post('/references', 'storeStandard')->name('references.store');
            Route::put('/references/{id}', 'updateStandard')->name('references.update');
            Route::delete('/references/{id}', 'destroyStandard')->name('references.destroy');

            Route::get('/categories', 'categories')->name('categories');
            Route::post('/categories', 'storeCategory')->name('categories.store');
            Route::put('/categories/{id}', 'updateCategory')->name('categories.update');
            Route::delete('/categories/{id}', 'destroyCategory')->name('categories.destroy');
        });

        // Users
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', 'users')->name('index');
            Route::post('/', 'storeUser')->name('store');
            Route::put('/{id}', 'updateUser')->name('update');
            Route::delete('/{id}', 'destroyUser')->name('destroy');
        });

        // Orders
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/', 'orders')->name('index');
            Route::get('/{id}', 'detailOrder')->name('detail');
        });

        // Log Activity
        Route::get('/activities', 'activities')->name('activities');
    });

// Manager
Route::controller(ManagerController::class)
    ->middleware(['auth', 'manager'])
    ->prefix('manager')
    ->name('manager.')
    ->group(function () {
        Route::get('/', 'index')->name('index');

        // Report Validation
        Route::prefix('report-validation')->name('report.validation.')->group(function () {
            Route::get('/', 'reportValidation')->name('index');
            Route::get('/{id}', 'showReportValidation')->name('show');
            Route::put('/{id}', 'updateReportValidation')->name('update');
        });

        // Orders
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/', 'orders')->name('index');
            Route::get('/{id}', 'showOrder')->name('show');
        });

        // Users
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', 'users')->name('index');
            Route::put('/{user}', 'updateUser')->name('update');
            Route::delete('/{user}', 'destroyUser')->name('destroy');
        });
    });

// Staff
Route::controller(StaffController::class)
    ->middleware(['auth', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function () {
        Route::redirect('/', '/staff/manage-clients');

        // Manage Clients
        Route::prefix('manage-clients')->name('client.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('delete');
        });

        // Samples
        Route::prefix('samples')->name('sample.')->group(function () {
            Route::post('/', 'storeSample')->name('store');
        });

        // Orders
        Route::prefix('orders')->name('order.')->group(function () {
            Route::get('/', 'indexOrder')->name('index');
            Route::post('/', 'storeOrder')->name('store');
        });

        // Order Routes
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', 'indexOrder')->name('index');
                Route::post('/', 'storeOrder')->name('storeOrder');
                Route::post('/sample', 'storeSample')->name('storeSample');
            });
    });

// Supervisor
Route::controller(SupervisorController::class)
    ->middleware(['auth', 'supervisor'])
    ->prefix('supervisor')
    ->name('supervisor.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
    });


// Analyst
Route::controller(AnalystController::class)
    ->middleware(['auth', 'analyst'])
    ->prefix('analyst')
    ->name('analyst.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/inbox', 'inbox')->name('inbox');
        Route::get('/history', 'history')->name('history');
        Route::get('/dashboard', 'dashboard')->name('dashboard');

        // Orders
        Route::prefix('orders')->name('order.')->group(function () {
            Route::get('/', 'order')->name('index');
            Route::get('/{order}', 'orderDetail')->name('detail');
            Route::put('/{order}/accept', 'acceptOrder')->name('accept');
            Route::post('/{order}/download', 'downloadOrder')->name('download');
        });

        // Samples
        Route::prefix('samples')->name('sample.')->group(function () {
            Route::post('/{sample}/confirm', 'confirmSample')->name('confirm');
            Route::post('/{sample}/unconfirm', 'unconfirmSample')->name('unconfirm');
        });

        // Reports
        Route::prefix('reports')->name('report.')->group(function () {
            Route::post('/', 'createReport')->name('create');
            Route::put('/{report}', 'updateReport')->name('update');
        });
    });

// Client
Route::controller(ClientController::class)
    ->middleware(['auth', 'client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/', 'index')->name('index');

        // Orders
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/', 'orders')->name('index');
            Route::inertia('/detail', 'client/detail/index')->name('client.orders.detail');
        });

        // History
        Route::get('/history', 'history')->name('history');
    });

require __DIR__ . '/auth.php';
