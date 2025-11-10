<?php

use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Staff\OrderController;
use App\Models\Sample;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::get('/auth/user', [AuthController::class, 'user']);

    // Admin
    Route::prefix('admin')->middleware('admin')->name('api.admin.')->group(function () {

        Route::get('/', [DashboardController::class, 'index']);

        // Route::apiResource('users', AdminApiUser::class);
        // Route::apiResource('orders', AdminApiOrder::class)->except(['index', 'show']);
        // Route::apiResource('activities', AdminApiActivity::class);

        // Tools
        Route::prefix('tools')->name('tools.')->group(function () {
            Route::apiResource('equipments', EquipmentController::class);
            Route::apiResource('brands', BrandTypeController::class);
        });

        // Materials
        // Route::prefix('materials')->name('materials.')->group(function () {
        //     Route::apiResource('reagents', AdminApiReagent::class)->except(['index']);
        //     Route::apiResource('grades', AdminApiGrade::class)->except(['index']);
        //     Route::apiResource('suppliers', AdminApiSupplier::class)->except(['index']);
        // });

        // Tests
        // Route::prefix('tests')->name('tests.')->group(function () {
        //     Route::apiResource('parameters', AdminApiParameter::class)->except(['index']);
        //     Route::apiResource('methods', AdminApiMethod::class)->except(['index']);
        //     Route::apiResource('units', AdminApiUnit::class)->except(['index']);
        //     Route::apiResource('references', AdminApiReference::class)->except(['index']);
        //     Route::apiResource('categories', AdminApiCategory::class)->except(['index']);
        // });
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
});
