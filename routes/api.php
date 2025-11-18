<?php

use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\API\V1\Analyst\AnalystController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Staff\OrderController;
use App\Http\Controllers\API\V1\Client\ClientController as ClientClientController;
use App\Http\Controllers\API\V1\Client\OrderController as ClientOrderController;
// use App\Http\Controllers\API\V1\Client\ProfileController as ClientProfileController;
use App\Http\Controllers\API\V1\Client\HistoryController as ClientHistoryController;
use App\Http\Controllers\API\V1\Profile\ProfileDetailController;
use App\Http\Controllers\StaffApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::prefix('auth')->name('api.auth.')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('login');
    });

    Route::middleware('auth:sanctum')->group(function () {

        Route::get('profile/{user}', [ProfileDetailController::class, 'index'])->name('profile');

        Route::prefix('auth')->name('api.auth.')->group(function () {
            Route::get('/user', [AuthController::class, 'user'])->name('user');
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        });

        // Admin
        Route::prefix('admin')
            ->middleware('admin')
            ->name('api.admin.')
            ->group(function () {

                Route::get('/', [DashboardController::class, 'index']);

                // Route::apiResource('users', AdminApiUser::class);
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
                ->middleware(['auth:sanctum', 'analyst'])
                ->name('api.analyst.')
                ->group(function () {
                    Route::get('/dashboard', [AnalystController::class, 'dashboard'])->name('dashboard');
                    Route::get('/orders', [AnalystController::class, 'orders'])->name('orders');
                    Route::get('/orders/{order}', [AnalystController::class, 'detail'])->name('orders.detail');
                    Route::put('/orders/accept/{order}', [AnalystController::class, 'accept'])->name('orders.accept');
                    Route::post('/samples/{sample}/confirm', [AnalystController::class, 'confirm'])->name('samples.confirm');
                    Route::post('/samples/{sample}/unconfirm', [AnalystController::class, 'unconfirm'])->name('samples.unconfirm');
                    Route::put('/orders/save/{order}', [AnalystController::class, 'saveReport'])->name('orders.save');
                    Route::put('/orders/submit/{order}', [AnalystController::class, 'submitReport'])->name('orders.submit');
                    Route::get('/orders/download/{order}', [AnalystController::class, 'downloadReport'])->name('orders.download');
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
                                Route::get('/{id}', [ClientOrderController::class, 'show']);
                                Route::get('/{id}/status', [ClientHistoryController::class, 'show'])->name('status');
                            });
                    });
        });
});
