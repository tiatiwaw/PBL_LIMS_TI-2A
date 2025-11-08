<?php

use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\StaffApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::get('/auth/user', [AuthController::class, 'user']);

    Route::prefix('admin')
        ->middleware('admin')
        ->controller(DashboardController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');

            Route::prefix('tools')->group(function () {
                Route::post('/equipments', 'storeEquipment');
                Route::put('/equipments/{id}', 'updateEquipment');
                Route::delete('/equipments/{id}', 'destroyEquipment');

                Route::post('/brands', 'storeBrand');
                Route::put('/brands/{id}', 'updateBrand');
                Route::delete('/brands/{id}', 'destroyBrand');
            });

            Route::prefix('materials')->group(function () {
                Route::post('/reagents', 'storeReagent');
                Route::put('/reagents/{id}', 'updateReagent');
                Route::delete('/reagents/{id}', 'destroyReagent');

                Route::post('/grades', 'storeGrade');
                Route::put('/grades/{id}', 'updateGrade');
                Route::delete('/grades/{id}', 'destroyGrade');

                Route::post('/suppliers', 'storeSupplier');
                Route::put('/suppliers/{id}', 'updateSupplier');
                Route::delete('/suppliers/{id}', 'destroySupplier');
            });

            Route::prefix('tests')->group(function () {
                Route::post('/parameters', 'storeParameter');
                Route::put('/parameters/{id}', 'updateParameter');
                Route::delete('/parameters/{id}', 'destroyParameter');

                Route::post('/methods', 'storeMethod');
                Route::put('/methods/{id}', 'updateMethod');
                Route::delete('/methods/{id}', 'destroyMethod');

                Route::post('/units', 'storeUnit');
                Route::put('/units/{id}', 'updateUnit');
                Route::delete('/units/{id}', 'destroyUnit');

                Route::post('/references', 'storeStandard');
                Route::put('/references/{id}', 'updateStandard');
                Route::delete('/references/{id}', 'destroyStandard');

                Route::post('/categories', 'storeCategory');
                Route::put('/categories/{id}', 'updateCategory');
                Route::delete('/categories/{id}', 'destroyCategory');
            });

            Route::post('/users',  'storeUser');
            Route::put('/users/{id}',  'updateUser');
            Route::delete('/users/{id}',  'destroyUser');
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
