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
Route::controller(AdminController::class)
    ->middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', 'index')->name('index');

        Route::prefix('tools')->name('tools.')->group(function () {
            Route::get('/equipments', 'equipments')->name('equipments');
            Route::get('/brands', 'brands')->name('brands');
        });

        Route::prefix('materials')->name('materials.')->group(function () {
            Route::get('/reagents', 'reagents')->name('reagents');
            Route::get('/grades', 'grades')->name('grades');
            Route::get('/suppliers', 'suppliers')->name('suppliers');
        });

        Route::prefix('tests')->name('tests.')->group(function () {
            Route::get('/parameters', 'parameters')->name('parameters');
            Route::get('/methods', 'methods')->name('methods');
            Route::get('/units', 'units')->name('units');
            Route::get('/references', 'references')->name('references');
            Route::get('/categories', 'categories')->name('categories');
            Route::get('/sertif', 'sertif')->name('sertif');
            Route::get('/training', 'training')->name('training');
        });

        Route::prefix('analyst')->name('analyst.')->group(function () {
            Route::get('/trainings', 'trainings')->name('trainings');
            Route::get('/sertificates', 'sertificates')->name('sertificates');
        });

        Route::get('/orders',  'orders')->name('orders');
        Route::get('/orders/{id}',  'showOrder')->name('order.show');
        Route::get('/activities',  'activities')->name('activities');
        Route::get('/users',  'users')->name('users');
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
                Route::post('/', 'store')->name('store');
                Route::put('/{id}', 'update')->name('update');
                Route::delete('/{id}', 'destroy')->name('delete');
            });

        // Samples
        Route::prefix('samples')
            ->name('sample.')
            ->group(function () {
                Route::post('/', 'storeSample')->name('store');
            });

        // Orders
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
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
        Route::redirect('/', '/supervisor/orders');

        // Order
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/', 'orders')->name('index');
                Route::get('/{id}', 'ordersDetail')->name('detail');
                Route::get('/parameters', 'parameters')->name('parameter');
                Route::get('/parameters/detail', 'parametersDetail')->name('parameter.detail');
                Route::get('/parameters/first', 'parametersFirst')->name('parameter.first');
                Route::get('/parameters/second', 'parametersSecond')->name('parameter.second');
                Route::get('/parameters/review', 'parametersReview')->name('parameter.review');
            });

        // Analysts
        Route::prefix('analysts')
            ->name('analyst.')
            ->group(function () {
                Route::get('/', 'analysts')->name('index');
            });
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
                Route::get('/', 'orders')->name('index');
                Route::inertia('/detail', 'client/detail/index')->name('detail');
            });

        // History
        Route::get('/history', 'history')->name('history');
    });

require __DIR__ . '/auth.php';
