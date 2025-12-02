<?php

use Illuminate\Support\Facades\Route;

// ======================================================
// AUTH CONTROLLER
// ======================================================
use App\Http\Controllers\Api\V1\AuthController;

// ======================================================
// ADMIN CONTROLLERS
// ======================================================
use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;

// ======================================================
// ANALYST CONTROLLERS
// ======================================================
use App\Http\Controllers\API\V1\Analyst\AnalystController;
use App\Http\Controllers\API\V1\Analyst\ProfileController;

// ======================================================
// STAFF CONTROLLERS
// ======================================================
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Staff\OrderController;

// ======================================================
// CLIENT CONTROLLERS
// ======================================================
use App\Http\Controllers\API\V1\Client\ClientController as ClientClientController;
use App\Http\Controllers\API\V1\Client\OrderController as ClientOrderController;
use App\Http\Controllers\API\V1\Client\HistoryController as ClientHistoryController;



// ======================================================
// AUTH ROUTES (TIDAK PERLU LOGIN)
// ======================================================
Route::prefix('v1/auth')->group(function () {

    // Login
    Route::post('/login', [AuthController::class, 'login']);

    // Register (opsional jika dipakai)
    Route::post('/register', [AuthController::class, 'register']);

    // Logout + Me → BUTUH TOKEN
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'user']);
    });
});




// ======================================================
// ROUTES YANG BUTUH LOGIN
// ======================================================
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    // ======================================================
    // ADMIN
    // ======================================================
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


    // ======================================================
    // STAFF
    // ======================================================
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
                    'manage-clients' => 'client',
                ]);

            Route::prefix('orders')->name('orders.')->group(function () {
                Route::get('/', [OrderController::class, 'index'])->name('index');
                Route::post('/', [OrderController::class, 'store'])->name('store');
                Route::post('/samples', [OrderController::class, 'storeSample'])->name('storeSample');
            });
        });


    // ======================================================
    // ANALYST
    // ======================================================
    Route::prefix('analyst')
        ->middleware('role:analyst')
        ->name('api.analyst.')
        ->group(function () {

            // Dashboard & Orders
            Route::get('/dashboard', [AnalystController::class, 'dashboard'])->name('dashboard');
            Route::get('/orders', [AnalystController::class, 'orders'])->name('orders');
            Route::get('/orders/{order}', [AnalystController::class, 'detail'])->name('orders.detail');

            Route::put('/orders/accept/{order}', [AnalystController::class, 'accept'])->name('orders.accept');
            Route::post('/samples/{sample}/confirm', [AnalystController::class, 'confirm'])->name('samples.confirm');
            Route::post('/samples/{sample}/unconfirm', [AnalystController::class, 'unconfirm'])->name('samples.unconfirm');
            Route::put('/orders/save/{order}', [AnalystController::class, 'saveReport'])->name('orders.save');
            Route::put('/orders/submit/{order}', [AnalystController::class, 'submitReport'])->name('orders.submit');
            Route::get('/orders/download/{order}', [AnalystController::class, 'downloadReport'])->name('orders.download');


            // ======================================================
            // PROFILE ANALYST
            // ======================================================
            Route::prefix('profile')->name('profile.')->group(function () {

                Route::get('/', [ProfileController::class, 'show'])->name('show');

                Route::post('/update-photo', [ProfileController::class, 'updatePhoto'])->name('updatePhoto');

                Route::post('/change-password', [ProfileController::class, 'changePassword'])->name('changePassword');

                // Certificate CRUD
                Route::post('/certifications', [ProfileController::class, 'addCertification'])->name('certifications.add');
                Route::delete('/certifications/{id}', [ProfileController::class, 'deleteCertification'])->name('certifications.delete');

                // Training CRUD
                Route::post('/trainings', [ProfileController::class, 'addTraining'])->name('trainings.add');
                Route::delete('/trainings/{id}', [ProfileController::class, 'deleteTraining'])->name('trainings.delete');
            });
        });


    // ======================================================
    // CLIENT
    // ======================================================
    Route::prefix('client')
        ->middleware('role:client')
        ->name('api.client.')
        ->group(function () {

            Route::get('/', [ClientClientController::class, 'index'])->name('index');

            Route::prefix('orders')->name('orders.')->group(function () {
                Route::get('/{order}', [ClientOrderController::class, 'show']);
                Route::get('/{order}/status', [ClientHistoryController::class, 'show'])->name('status');
            });
        });

});
