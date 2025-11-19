<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;

// Auth
use App\Http\Controllers\Api\V1\AuthController;

// Staff
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Staff\OrderController;

// Client
use App\Http\Controllers\API\V1\Client\ClientController as ClientClientController;
use App\Http\Controllers\API\V1\Client\OrderController as ClientOrderController;
use App\Http\Controllers\API\V1\Client\HistoryController as ClientHistoryController;

// Manager (ADA DI ManagerController.php)
use App\Http\Controllers\ManagerController;

// Route::prefix('v1')->group(function () {
//     Route::prefix('manager')->group(function () {
//         Route::get('/report-validations', [ManagerController::class, 'reportValidations']);
//     });
// });


Route::prefix('v1')
    // ->middleware('auth:sanctum')
    ->group(function () {

    Route::get('/auth/user', [AuthController::class, 'user']);

    /**
     * ==========================
     * ADMIN API
     * ==========================
     */
    Route::prefix('admin')
        ->middleware('admin')
        ->name('api.admin.')
        ->group(function () {

        Route::get('/', [DashboardController::class, 'index']);

        Route::prefix('tools')->name('tools.')->group(function () {
            Route::apiResource('equipments', EquipmentController::class);
            Route::apiResource('brands', BrandTypeController::class);
        });
    });


    /**
     * ==========================
     * STAFF API
     * ==========================
     */
    Route::prefix('staff')
        ->middleware('staff')
        ->name('api.staff.')
        ->group(function () {

        Route::apiResource('manage-clients', ClientController::class)
            ->names([
                'index'   => 'clients.index',
                'store'   => 'clients.store',
                'update'  => 'clients.update',
                'destroy' => 'clients.destroy',
            ])
            ->parameters([
                'manage-clients' => 'client'
            ]);

        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/', [OrderController::class, 'index']);
            Route::post('/', [OrderController::class, 'store']);
            Route::post('/samples', [OrderController::class, 'storeSample']);
        });
    });


    /**
     * ==========================
     * CLIENT API
     * ==========================
     */
    Route::prefix('client')
        ->middleware('client')
        ->name('api.client.')
        ->group(function () {

        Route::get('/', [ClientClientController::class, 'index']);
        Route::get('/history/{order}', [ClientHistoryController::class, 'history']);

        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/detail/{order}', [ClientOrderController::class, 'index']);
        });
    });


    /**
     * ==========================
     * MANAGER API
     * ==========================
     */
    Route::prefix('manager')
        ->group(function () {
        Route::get('/report-validations', [ManagerController::class, 'reportValidations']);
    });
});
