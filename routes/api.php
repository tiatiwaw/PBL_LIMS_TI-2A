<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffApiController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\API\V1\Staff\OrderController;
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\API\V1\Analyst\AnalystController;

Route::prefix('v1')
->middleware('auth:sanctum')
->group(function () {

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
        
    Route::prefix('analyst')
        ->middleware(['analyst'])
        ->name('api.analyst.')
        ->controller(AnalystController::class)
        ->group(function () {
            Route::get('/dashboard', 'dashboard')->name('dashboard');
            Route::get('/orders', 'orders')->name('orders');
            Route::get('/orders/{order}', 'detail')->name('orders.detail');
            Route::put('/orders/{order}/accept', 'accept')->name('orders.accept');
            Route::post('/samples/{sample}/confirm', 'confirm')->name('samples.confirm');
            Route::post('/samples/{sample}/unconfirm', 'unconfirm')->name('samples.unconfirm');
            Route::post('/orders/{order}/save', 'saveReport')->name('orders.save');
            Route::post('/orders/{order}/submit', 'submitReport')->name('orders.submit');
            Route::get('/orders/{order}/download', 'downloadReport')->name('orders.download');
        });
});
