<?php

use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\StaffApiController;
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
});

Route::prefix('staff')->group(function () {
    Route::get('/clients', [StaffApiController::class, 'apiClientIndex']);
    Route::post('/clients', [StaffApiController::class, 'apiClientStore']);
    Route::put('/clients/{client}', [StaffApiController::class, 'apiClientUpdate']);
    Route::delete('/clients/{client}', [StaffApiController::class, 'apiClientDestroy']);
    Route::get('/orders', [StaffApiController::class, 'apiOrderIndex']);
    Route::post('/orders', [StaffApiController::class, 'apiStoreOrder']);
    Route::post('/orders/samples', [StaffApiController::class, 'apiSampleStore']);
});
