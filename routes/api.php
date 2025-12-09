<?php

use App\Models\Client;

// AUTH
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;

// ADMIN CONTROLLERS
use App\Http\Controllers\API\V1\OrderController;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\API\V1\Admin\GradeController;
use App\Http\Controllers\API\V1\Admin\OrdersController;
use App\Http\Controllers\API\V1\Admin\ReportController;
use App\Http\Controllers\API\V1\Admin\AnalystController;
use App\Http\Controllers\API\V1\Admin\ReagentController;
use App\Http\Controllers\API\V1\Admin\SupplierController;
use App\Http\Controllers\API\V1\Admin\TrainingController;
use App\Http\Controllers\API\V1\Payment\TripayController;
use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\API\V1\Admin\ParameterController;
use App\Http\Controllers\API\V1\Admin\ReferenceController;
use App\Http\Controllers\API\V1\Admin\UnitValueController;
use App\Http\Controllers\API\V1\Admin\CertificateController;
use App\Http\Controllers\API\V1\Admin\TestMethodsController;

// STAFF CONTROLLERS
use App\Http\Controllers\API\V1\Admin\SampleCategoryController;
use App\Http\Controllers\API\V1\Profile\ProfileDetailController;
use App\Http\Controllers\API\V1\Manager\OrdersController as MOrdersController;

// SUPERVISOR CONTROLLERS
use App\Http\Controllers\API\V1\Staff\OrderController as StaffOrderController;
use App\Http\Controllers\API\V1\Client\OrderController as ClientOrderController;
use App\Http\Controllers\API\V1\Staff\ClientController as StaffClientController;

// CLIENT CONTROLLERS
use App\Http\Controllers\API\V1\Staff\SampleController as StaffSampleController;
use App\Http\Controllers\API\V1\Client\ClientController as ClientClientController;
use App\Http\Controllers\API\V1\Manager\GradeController as ManagerGradeController;
use App\Http\Controllers\API\V1\Client\HistoryController as ClientHistoryController;
use App\Http\Controllers\API\V1\Client\ProfileController as ClientProfileController;
use App\Http\Controllers\API\V1\Client\ReceiptController as ClientReceiptController;

// MANAGER CONTROLLERS
use App\Http\Controllers\API\V1\Analyst\AnalystController as AnalystAnalystController;
use App\Http\Controllers\API\V1\Manager\ReagentController as ManagerReagentController;
use App\Http\Controllers\API\V1\Manager\SupplierController as ManagerSupplierController;
use App\Http\Controllers\API\V1\Supervisor\OrderController as SupervisorOrderController;
use App\Http\Controllers\API\V1\Manager\BrandTypeController as ManagerBrandTypeController;
use App\Http\Controllers\API\V1\Manager\EquipmentController as ManagerEquipmentController;
use App\Http\Controllers\API\V1\Manager\ParameterController as ManagerParameterController;
use App\Http\Controllers\API\V1\Manager\ReferenceController as ManagerReferenceController;
use App\Http\Controllers\API\V1\Manager\UnitValueController as ManagerUnitValueController;
use App\Http\Controllers\API\V1\Client\TransactionController as ClientTransactionController;
use App\Http\Controllers\API\V1\Supervisor\AnalystController as SupervisorAnalystController;
use App\Http\Controllers\API\V1\Manager\TestMethodsController as ManagerTestMethodsController;
use App\Http\Controllers\API\V1\Supervisor\ParameterController as SupervisorParameterController;
use App\Http\Controllers\API\V1\Manager\SampleCategoryController as ManagerSampleCategoryController;

Route::prefix('v1')->group(function () {

    /**
     * ============================
     * AUTHENTICATION (PUBLIC)
     * ============================
     */
    Route::post('/auth/login', [AuthController::class, 'login'])->name('api.auth.login');
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])->name('api.auth.forgot-password');
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->name('api.auth.reset-password');
    Route::get('/orders/download-report/{id}', [OrderController::class, 'downloadReport'])->name('api.order.download-report');

    /**
     * ============================
     * PROTECTED ROUTES (LOGIN REQUIRED)
     * ============================
     */
    Route::middleware('auth:sanctum')->group(function () {

        Route::prefix('profile')->name('profile')->group(function () {
            Route::get('/{userId}', [ProfileDetailController::class, 'index'])->name('profileDetail');
            Route::put('/change-password/{userId}', [ProfileDetailController::class, 'changePassword'])->name('changePassword');
        });

        Route::prefix('auth')->name('api.auth.')->group(function () {
            // Route::get('/user', [AuthController::class, 'user'])->name('user');
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        });
        Route::post('/auth/logout', [AuthController::class, 'logout'])->name('api.auth.logout');

        /**
         * ============================
         * ADMIN API
         * ============================
         */
        Route::prefix('admin')
            ->middleware('role:admin')
            ->name('api.admin.')
            ->group(function () {

                Route::get('/', [DashboardController::class, 'index']);

                Route::apiResource('users', UserController::class);

                Route::get('analysts', [AnalystController::class, 'index']);
                Route::get('orders', [OrdersController::class, 'index']);
                Route::get('orders/{id}', [OrdersController::class, 'show']);

                // Tools
                Route::prefix('tools')->name('tools.')->group(function () {
                    Route::apiResource('equipments', EquipmentController::class);
                    Route::apiResource('brands', BrandTypeController::class);
                });

                // Materials
                Route::prefix('materials')->name('materials.')->group(function () {
                    Route::get('reagents/low-stock/notifications', [ReagentController::class, 'lowStockNotifications']);
                    Route::apiResource('reagents', ReagentController::class);
                    Route::apiResource('grades', GradeController::class);
                    Route::apiResource('suppliers', SupplierController::class);
                });

                // Tests
                Route::prefix('tests')->name('tests.')->group(function () {
                    Route::apiResource('parameters', ParameterController::class);
                    Route::apiResource('methods', TestMethodsController::class);
                    Route::apiResource('units', UnitValueController::class);
                    Route::apiResource('references', ReferenceController::class);
                    Route::apiResource('categories', SampleCategoryController::class);
                });

                Route::prefix('analyst')
                    ->name('analyst.')
                    ->group(function () {
                        Route::apiResource('trainings', TrainingController::class);
                        Route::apiResource('certificates', CertificateController::class);
                    });

                Route::prefix('reports')
                    ->name('reports.')
                    ->group(function () {
                        Route::get('orders', [ReportController::class, 'orders']);
                        Route::get('inventory', [ReportController::class, 'inventory']);
                        Route::get('transactions', [ReportController::class, 'transactions']);
                        Route::get('users', [ReportController::class, 'users']);
                    });
            });

        /**
         * ============================
         * STAFF API
         * ============================
         */
        Route::prefix('staff')
            ->middleware('role:staff')
            ->name('api.staff.')
            ->group(function () {

                // Manage clients
                Route::apiResource('manage-clients', StaffClientController::class)
                    ->names([
                        'index' => 'clients.index',
                        'store' => 'clients.store',
                        'update' => 'clients.update',
                        'destroy' => 'clients.destroy',
                    ])
                    ->parameters([
                        'manage-clients' => 'client',
                    ]);

                // Orders
                Route::prefix('orders')->name('orders.')->group(function () {
                    Route::get('/all-orders', [OrdersController::class, 'index']);
                    Route::get('/all-orders/{id}', [OrdersController::class, 'show']);
                    Route::get('/make-order', [StaffOrderController::class, 'index'])->name('index');
                    Route::post('/make-order', [StaffOrderController::class, 'store'])->name('store');

                    Route::get('/samples', [StaffSampleController::class, 'index'])->name('samples.index');
                    Route::post('/samples', [StaffSampleController::class, 'store'])->name('samples.store');
                });
            });

            Route::prefix('analyst')
                ->middleware(['role:analyst'])
                ->name('api.analyst.')
                ->group(function () {
                    Route::prefix('dashboard')->group(function () {
                        Route::get('/', [AnalystAnalystController::class, 'dashboard'])->name('dashboard');
                        Route::put('/{order}', [AnalystAnalystController::class, 'accept'])->name('accept');
                    });

                    Route::prefix('orders')->name('orders.')->group(function () {
                        Route::get('/', [AnalystAnalystController::class, 'orders'])->name('.orders');
                        Route::get('/{order}', [AnalystAnalystController::class, 'detail'])->name('.detail');
                        Route::put('/{order}', [AnalystAnalystController::class, 'submitReport'])->name('.submit');
                        Route::put('/save/{order}', [AnalystAnalystController::class, 'saveReport'])->name('.save');;
                    });

                    Route::get('/samples/{order}', [AnalystAnalystController::class, 'detail'])->name('orders.detail');

                    Route::post('/reagent-used/save', [AnalystAnalystController::class, 'saveReagentUsage'])->name('reagent.save');
                });

            // Client
            Route::prefix('client')
                ->middleware(['role:client'])
                ->name('api.client.')
                ->group(function () {

                    // Dashboard & Profile
                    Route::get('/', [ClientClientController::class, 'index'])->name('index');

                    // Orders - menggunakan apiResource untuk efisiensi
                    Route::prefix('orders')
                        ->name('orders.')
                        ->group(function () {
                            Route::get('/{id}', [ClientOrderController::class, 'show']);
                            Route::get('status/{id}', [ClientHistoryController::class, 'show'])->name('status');
                        });
                });
    });
});
