<?php

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
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Staff\OrderController;
use App\Http\Controllers\API\V1\Client\ClientController as ClientClientController;
use App\Http\Controllers\API\V1\Client\OrderController as ClientOrderController;
// use App\Http\Controllers\API\V1\Client\ProfileController as ClientProfileController;
use App\Http\Controllers\API\V1\Client\HistoryController as ClientHistoryController;
use App\Http\Controllers\StaffApiController;
use Illuminate\Support\Facades\Route;
use League\CommonMark\Reference\Reference;

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::get('/auth/user', [AuthController::class, 'user']);

    // Admin
    Route::prefix('admin')
        ->middleware('admin')
        ->name('api.admin.')
        ->group(function () {

            Route::get('/', [DashboardController::class, 'index']);

            Route::apiResource('users', UserController::class);
            // Route::apiResource('orders', AdminApiOrder::class)->except(['index', 'show']);
            // Route::apiResource('activities', AdminApiActivity::class);

            // Tools
            Route::prefix('tools')
                ->name('tools.')
                ->group(function () {
                    Route::apiResource('equipments', EquipmentController::class);
                    Route::apiResource('brands', BrandTypeController::class);
                });

            // Materials
            Route::prefix('materials')
                ->name('materials.')
                ->group(function () {
                    Route::apiResource('reagents', ReagentController::class);
                    Route::apiResource('grades', GradeController::class);
                    //     Route::apiResource('suppliers', AdminApiSupplier::class)->except(['index']);
                });

            // Tests
            Route::prefix('tests')
                ->name('tests.')
                ->group(function () {
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
        });

    // Staff
    Route::prefix('staff')
        ->middleware('staff')
        ->name('api.staff.')
        ->group(function () {

            // Resource untuk manage-clients
            Route::apiResource('manage-clients', ClientController::class)
                ->names([
                    'index'   => 'clients.index',
                    'store'   => 'clients.store',
                    'update'  => 'clients.update',
                    'destroy' => 'clients.destroy',
                ])
                ->parameters([
                    'manage-clients' => 'client', // supaya param jadi {client}, bukan {manage_client}
                ]);

            // Orders

            Route::prefix('orders')->name('orders.')->group(function () {
                Route::get('/', [OrderController::class, 'index'])->name('index');
                Route::post('/', [OrderController::class, 'store'])->name('store');
                Route::post('/samples', [OrderController::class, 'storeSample'])->name('storeSample');
            });
        });

    // Client
    Route::prefix('client')
        ->middleware(['auth:sanctum', 'client'])
        ->name('api.client.')
        ->group(function () {

            // Dashboard & Profile
            Route::get('/', [ClientClientController::class, 'index'])->name('index');

            // Orders - menggunakan apiResource untuk efisiensi
            Route::prefix('orders')
                ->name('orders.')
                ->group(function () {
                    Route::get('/{order}', [ClientOrderController::class, 'show']);
                    Route::get('/{order}/status', [ClientHistoryController::class, 'show'])->name('status');
                });
        });
});
