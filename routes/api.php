<?php

use Illuminate\Support\Facades\Route;

// AUTH
use App\Http\Controllers\Api\V1\AuthController;

// ADMIN CONTROLLERS
use App\Http\Controllers\API\V1\Admin\AnalystController;
use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\CertificateController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\API\V1\Admin\GradeController;
use App\Http\Controllers\API\V1\Admin\ParameterController;
use App\Http\Controllers\API\V1\Admin\ReagentController;
use App\Http\Controllers\API\V1\Admin\ReferenceController;
use App\Http\Controllers\API\V1\Admin\SampleCategoryController;
use App\Http\Controllers\API\V1\Admin\TestMethodsController;
use App\Http\Controllers\API\V1\Admin\TrainingController;
use App\Http\Controllers\API\V1\Admin\UnitValueController;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\API\V1\Admin\SupplierController;
use App\Http\Controllers\API\V1\Admin\OrdersController;
use App\Http\Controllers\API\V1\Admin\ReportController;

// STAFF CONTROLLERS
use App\Http\Controllers\API\V1\Staff\ClientController as StaffClientController;
use App\Http\Controllers\API\V1\Staff\OrderController as StaffOrderController;
use App\Http\Controllers\API\V1\Staff\SampleController as StaffSampleController;

// CLIENT CONTROLLERS
use App\Http\Controllers\API\V1\Client\ClientController as ClientClientController;
use App\Http\Controllers\API\V1\Client\OrderController as ClientOrderController;
use App\Http\Controllers\API\V1\Client\HistoryController as ClientHistoryController;

// MANAGER CONTROLLERS
use App\Http\Controllers\API\V1\Manager\EquipmentController as ManagerEquipmentController;
use App\Http\Controllers\API\V1\Manager\BrandTypeController as ManagerBrandTypeController;
use App\Http\Controllers\API\V1\Manager\ReagentController as ManagerReagentController;
use App\Http\Controllers\API\V1\Manager\GradeController as ManagerGradeController;
use App\Http\Controllers\API\V1\Manager\SupplierController as ManagerSupplierController;
use App\Http\Controllers\API\V1\Manager\ParameterController as ManagerParameterController;
use App\Http\Controllers\API\V1\Manager\TestMethodsController as ManagerTestMethodsController;
use App\Http\Controllers\API\V1\Manager\UnitValueController as ManagerUnitValueController;
use App\Http\Controllers\API\V1\Manager\ReferenceController as ManagerReferenceController;
use App\Http\Controllers\API\V1\Manager\SampleCategoryController as ManagerSampleCategoryController;
use App\Http\Controllers\API\V1\Supervisor\OrderController as SupervisorOrderController;
use App\Http\Controllers\API\V1\Supervisor\ParameterController as SupervisorParameterController;



Route::prefix('v1')->group(function () {

    /**
     * ============================
     * AUTHENTICATION (PUBLIC)
     * ============================
     */
    Route::post('/auth/login', [AuthController::class, 'login'])->name('api.auth.login');

    /**
     * ============================
     * PROTECTED ROUTES (LOGIN REQUIRED)
     * ============================
     */
    Route::middleware('auth:sanctum')->group(function () {

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
                    Route::get('/', [StaffOrderController::class, 'index'])->name('index');
                    Route::post('/', [StaffOrderController::class, 'store'])->name('store');

                    Route::get('/samples', [StaffSampleController::class, 'index'])->name('samples.index');
                    Route::post('/samples', [StaffSampleController::class, 'store'])->name('samples.store');
                });
            });

        /**
         * ============================
         * CLIENT API
         * ============================
         */
        Route::prefix('client')
            ->middleware(['role:client'])
            ->name('api.client.')
            ->group(function () {

                Route::get('/', [ClientClientController::class, 'index'])->name('index');

                // Orders - menggunakan apiResource untuk efisiensi
                Route::prefix('orders')
                    ->name('orders.')
                    ->group(function () {
                        Route::get('/{id}', [ClientOrderController::class, 'show']);
                        Route::get('status/{id}', [ClientHistoryController::class, 'show'])->name('status');
                    });
            });

        // supervisor
        Route::prefix('supervisor')
            ->middleware('role:supervisor')
            ->name('api.supervisor.')
            ->group(function () {

                // Orders
                Route::prefix('orders')->name('orders.')->group(function () {
                    Route::get('/', [SupervisorOrderController::class, 'index'])->name('index');
                    Route::get('/{id}', [SupervisorOrderController::class, 'show'])->name('show');
                    Route::put('/{id}', [SupervisorOrderController::class, 'updateStatus'])->name('update');
                    Route::get('/{id}/parameters', [SupervisorParameterController::class, 'show'])->name('show');
                    Route::post('/{id}/parameters/submit', [SupervisorParameterController::class, 'assignAnalyst'])->name('assign');
                });
            });

        /**
         * ============================
         * MANAGER API
         * ============================
         */
        Route::prefix('manager')
            ->middleware('role:manager')
            ->name('api.manager.')
            ->group(function () {

                // Tools
                Route::prefix('tools')->name('tools.')->group(function () {
                    Route::apiResource('equipments', ManagerEquipmentController::class);
                    Route::apiResource('brands', ManagerBrandTypeController::class);
                });

                // Materials
                Route::prefix('materials')->name('materials.')->group(function () {
                    Route::apiResource('reagents', ManagerReagentController::class);
                    Route::apiResource('grades', ManagerGradeController::class);
                    Route::apiResource('suppliers', ManagerSupplierController::class);
                });

                // Tests
                Route::prefix('tests')->name('tests.')->group(function () {
                    Route::apiResource('parameters', ManagerParameterController::class);
                    Route::apiResource('methods', ManagerTestMethodsController::class);
                    Route::apiResource('units', ManagerUnitValueController::class);
                    Route::apiResource('references', ManagerReferenceController::class);
                    Route::apiResource('categories', ManagerSampleCategoryController::class);
                });

                // Analyst
                // Route::prefix('analyst')->name('analyst.')->group(function () {
                //     Route::apiResource('trainings', ManagerTrainingController::class);
                //     Route::apiResource('certificates', ManagerCertificateController::class);
                // });
            });
    });
});
