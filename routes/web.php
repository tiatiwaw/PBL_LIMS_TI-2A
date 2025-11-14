<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AnalystController;
// use App\Http\Controllers\API\V1\AuthController as V1AuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\SupervisorController;
use Inertia\Inertia;

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
            Route::get('/login', 'index')->name('login.form');
        });
        Route::middleware('auth')->group(function () {
            Route::post('/logout', 'logout')->name('logout');
            Route::get('/logout', 'logout');
        });
    });

// // API
// Route::prefix('api/v1/auth')->name('api.auth.')->group(function () {
//     Route::middleware('guest')->group(function () {
//         Route::post('/login', [V1AuthController::class, 'login'])->name('login');
//     });
//     Route::middleware('auth')->group(function () {
//         Route::post('/logout', [V1AuthController::class, 'logout'])->name('logout');
//     });
// });

// Admin
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {
        Route::get('/', fn() => Inertia::render('admin/index'))
            ->name('index');

        Route::prefix('resources')->as('resources.')->group(function () {
            Route::inertia('/equipments', 'admin/tools/equipments/index')->name('equipments');
            Route::inertia('/brands', 'admin/tools/brands/index')->name('brands');
            Route::inertia('/reagents', 'admin/materials/reagents/index')->name('reagents');
            Route::inertia('/grades', 'admin/materials/grades/index')->name('grades');
            Route::inertia('/suppliers', 'admin/materials/suppliers/index')->name('suppliers');
        });

        Route::prefix('tests')->as('tests.')->group(function () {
            Route::inertia('/parameters', 'admin/test/parameter/index')->name('parameters');
            Route::inertia('/methods', 'admin/test/method/index')->name('methods');
            Route::inertia('/units', 'admin/test/unit-value/index')->name('units');
            Route::inertia('/references', 'admin/test/standard-reference/index')->name('references');
            Route::inertia('/categories', 'admin/test/category/index')->name('categories');
            Route::inertia('/sertif', 'admin/test/sertif/index')->name('sertif');
            Route::inertia('/training', 'admin/test/training/index')->name('training');
        });

        Route::prefix('analyst')->as('analyst.')->group(function () {
            Route::inertia('/trainings', 'admin/analyst/training/index')->name('trainings');
            Route::inertia('/sertificates', 'admin/analyst/sertificate/index')->name('sertificates');
        });

        Route::inertia('/orders', 'admin/orders/index')->name('orders');

        Route::get('/orders/{id}', function ($id) {
            return Inertia::render('admin/detail/index', [
                'id' => $id,
                'canValidate' => false,
            ]);
        })->name('order.show');

        Route::inertia('/users', 'admin/users/index')->name('users');
        Route::inertia('/reports', 'admin/reports/index')->name('reports');
    });

// Manager
Route::controller(ManagerController::class)
    // ->middleware(['auth', 'manager'])
    ->prefix('manager')
    ->name('manager.')
    ->group(function () {
        Route::get('/', 'index')->name('index');

        // Report Validation
        Route::prefix('report-validation')
            ->name('report.validation.')
            ->group(function () {
                Route::get('/', 'reportValidation')->name('index');
                Route::get('/{id}', 'showReportValidation')->name('show');
                Route::put('/{id}', 'updateReportValidation')->name('update');
            });

        // Orders
        Route::prefix('orders')
            ->name('orders.')
            ->group(function () {
                Route::get('/', 'orders')->name('index');
                Route::get('/{id}', 'showOrder')->name('show');
            });

        // Users
        Route::prefix('users')
            ->name('users.')
            ->group(function () {
                Route::get('/', 'users')->name('index');
                Route::put('/{id}', 'updateUser')->name('update');
                Route::delete('/{id}', 'destroyUser')->name('destroy');
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
        Route::prefix('manage-clients')
            ->name('client.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
            });


        // Orders
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', 'indexOrder')->name('index');
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
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', 'order')->name('index');
                Route::get('/{id}', 'orderDetail')->name('detail');
                Route::put('/{id}/accept', 'acceptOrder')->name('accept');
                Route::post('/{id}/download', 'downloadOrder')->name('download');
            });

        // Samples
        Route::prefix('samples')
            ->name('sample.')
            ->group(function () {
                Route::post('/{id}/confirm', 'confirmSample')->name('confirm');
                Route::post('/{id}/unconfirm', 'unconfirmSample')->name('unconfirm');
            });

        // Reports
        Route::prefix('reports')
            ->name('report.')
            ->group(function () {
                Route::post('/', 'createReport')->name('create');
                Route::put('/{id}', 'updateReport')->name('update');
            });
    });

// Client
Route::controller(ClientController::class)
    ->middleware(['auth', 'client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/profile', 'profile')->name('profile');
        Route::get('/history', 'history')->name('history');

        // Orders - sesuaikan dengan API structure
        Route::prefix('orders')
            ->name('orders.')
            ->group(function () {
                Route::get('/{id}', 'orderDetail')->name('show');
                Route::get('/status/{id}', 'orderStatus')->name('status');
            });
    });

require __DIR__ . '/auth.php';
