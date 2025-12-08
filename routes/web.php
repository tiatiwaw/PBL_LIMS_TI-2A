<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\API\V1\Payment\TripayCallbackController;
// use App\Http\Controllers\API\V1\AuthController as V1AuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\SupervisorController;
use Inertia\Inertia;

// Home
Route::inertia('/', 'index')->name('home');


// Auth
Route::middleware('guest')->group(function () {
    Route::inertia('/auth/login', 'auth/login/index')->name('auth.login.form');
    Route::inertia('/forgot-password', 'auth/forgot-password/index')->name('auth.forgot-password');
    Route::inertia('/reset-password', 'auth/reset-password/index')->name('auth.reset-password');
});

// Admin
Route::middleware(['auth', 'role:admin'])
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
        });

        Route::prefix('analyst')->as('analyst.')->group(function () {
            Route::inertia('/trainings', 'admin/analyst/trainings/index')->name('trainings');
            Route::inertia('/certificates', 'admin/analyst/certificates/index')->name('certificates');
        });

        Route::inertia('/orders', 'admin/orders/index')->name('orders');

        Route::get('/orders/{id}', function ($id) {
            return Inertia::render('admin/detail/index', [
                'id' => $id,
                'canValidate' => false,
            ]);
        })->name('order.show');

        Route::inertia('/users', 'admin/users/index')->name('users');
        Route::prefix('reports')->as('reports.')->group(function () {
            Route::inertia('/orders', 'admin/reports/orders')->name('orders');
            Route::inertia('/inventory', 'admin/reports/inventory')->name('inventory');
            Route::inertia('/transactions', 'admin/reports/transactions')->name('transactions');
            Route::inertia('/users', 'admin/reports/users')->name('users');
        });
    });

// Manager
Route::middleware(['auth', 'role:manager'])
    ->prefix('manager')
    ->as('manager.')
    ->group(function () {

        // INDEX
        Route::get('/', fn() => Inertia::render('manager/index'))
            ->name('index');

        // REPORT VALIDATION
        Route::prefix('report-validations')->as('report-validations.')->group(function () {
            Route::get('/', fn() => Inertia::render('manager/report-validation/index'))
                ->name('index');

            Route::get('/{id}', function ($id) {
                return Inertia::render('manager/detail/index', [
                    'id' => $id,
                ]);
            })->name('show');
        });
        // ORDERS
        Route::prefix('orders')->as('orders.')->group(function () {
            Route::get('/', fn() => Inertia::render('manager/orders/index'))
                ->name('index');

            Route::get('/{id}', function ($id) {
                return Inertia::render('manager/orders/index', [
                    'id' => $id,
                ]);
            })->name('show');
        });
        Route::prefix('resources')->as('resources.')->group(function () {
            Route::inertia('/equipments', 'manager/tools/equipments/index')->name('equipments');
            Route::inertia('/brands', 'manager/tools/brands/index')->name('brands');
            Route::inertia('/reagents', 'manager/materials/reagents/index')->name('reagents');
            Route::inertia('/grades', 'manager/materials/grades/index')->name('grades');
            Route::inertia('/suppliers', 'manager/materials/suppliers/index')->name('suppliers');
        });


        Route::prefix('tests')->as('tests.')->group(function () {
            Route::inertia('/categories', 'manager/test/category/index')->name('categories');
            Route::inertia('/parameters', 'manager/test/parameter/index')->name('parameters');
            Route::inertia('/methods', 'manager/test/method/index')->name('methods');
            Route::inertia('/units', 'manager/test/unit-value/index')->name('units');
            Route::inertia('/references', 'manager/test/standard-reference/index')->name('references');
        });

        Route::inertia('/reports', 'manager/reports/index')->name('reports');

        Route::inertia('/orders', 'manager/orders/index')->name('orders');

        Route::get('/orders/{id}', function ($id) {
            return Inertia::render('manager/detail/index', [
                'id' => $id,
                'canValidate' => false,
            ]);
        })->name('order.show');

        Route::inertia('/users', 'manager/users/index')->name('users');
    });

// Staff
Route::middleware(['auth', 'role:staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function () {
        Route::redirect('/', '/staff/orders/all-orders');

        // Manage Clients
        Route::prefix('manage-clients')
            ->name('client.')
            ->group(function () {
                Route::get('/', [StaffController::class, 'index'])->name('index');
                Route::post('/', [StaffController::class, 'store'])->name('store');
                Route::put('/{id}', [StaffController::class, 'update'])->name('update');
                Route::delete('/{id}', [StaffController::class, 'destroy'])->name('delete');
            });

        // Samples
        Route::prefix('samples')
            ->name('sample.')
            ->group(function () {
                Route::post('/', [StaffController::class, 'storeSample'])->name('store');
            });

        // Orders
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::inertia('/all-orders', 'staff/orders/all-orders/index')->name('all');
                Route::get('/all-orders/{id}', function ($id) {
                    return Inertia::render('staff/orders/detail/index', [
                        'id' => $id,
                        'canValidate' => true,
                    ]);
                })->name('show');
                Route::inertia('/make-order', 'staff/orders/make-order/index')->name('index');
                Route::get('/', [StaffController::class, 'indexOrder'])->name('index');
                Route::post('/', [StaffController::class, 'storeOrder'])->name('store');
                Route::post('/sample', [StaffController::class, 'storeSample'])->name('storeSample');
            });
    });

// Supervisor
Route::controller(SupervisorController::class)
    ->middleware(['auth', 'role:supervisor'])
    ->prefix('supervisor')
    ->name('supervisor.')
    ->group(function () {
        Route::redirect('/', '/supervisor/orders/follow-up')->name('index');

        // Order
        Route::prefix('orders')
            ->name('order.')
            ->group(function () {
                Route::get('/history', 'ordersHistory')->name('history');
                Route::get('/history/{id}', 'ordersHistoryDetail')->name('history.detail');
                Route::prefix('follow-up')->group(function () {
                    Route::get('/', 'ordersFollowUp')->name('index');
                    Route::get('/{id}', 'ordersDetail')->name('detail');
                    Route::get('/{id}/parameters', 'parameters')->name('parameter.index');
                    Route::get('/{id}/parameters/detail', 'parametersDetail')->name('parameter.detail');
                    Route::get('/{id}/confirm-validation', 'confirmValidation')->name('validation');
                    Route::get('/{id}/repeat-test', 'repeatTest')->name('repeat-test');
                });
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
    ->middleware(['auth', 'role:analyst'])
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
    ->middleware(['auth', 'role:client'])
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

                Route::get('/payment/{id}', 'orderPayment')->name('payment');

                Route::get('/checkout/{id}', 'checkout')->name('checkout');

                Route::get('/transaction/{reference}', 'orderTransaction')->name('transaction');
            });

        // History
        Route::get('/history', 'history')->name('history');
    });

Route::post('/callback', [TripayCallbackController::class, 'handle']);

require __DIR__ . '/auth.php';
