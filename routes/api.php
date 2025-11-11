<?php

use App\Http\Controllers\API\V1\Admin\BrandTypeController;
use App\Http\Controllers\API\V1\Admin\DashboardController;
use App\Http\Controllers\API\V1\Admin\EquipmentController;
use App\Http\Controllers\API\V1\Admin\GradeController;
use App\Http\Controllers\API\V1\Admin\ParameterController;
use App\Http\Controllers\API\V1\Admin\ReagentController;
use App\Http\Controllers\API\V1\Admin\ReferenceController;
use App\Http\Controllers\API\V1\Admin\SampleCategoryController;
use App\Http\Controllers\API\V1\Admin\TestMethodsController;
use App\Http\Controllers\API\V1\Admin\UnitValueController;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\API\V1\Staff\ClientController;
use App\Http\Controllers\API\V1\Staff\OrderController;
use App\Http\Controllers\StaffApiController;
use Illuminate\Support\Facades\Route;
use League\CommonMark\Reference\Reference;

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::get('/auth/user', [AuthController::class, 'user']);

    // Admin
    Route::prefix('admin')
    ->middleware('admin')
    ->name('api.admin.')->group(function () {

        Route::get('/', [DashboardController::class, 'index']);

        Route::apiResource('users', UserController::class);
        // Route::apiResource('orders', AdminApiOrder::class)->except(['index', 'show']);
        // Route::apiResource('activities', AdminApiActivity::class);

        // Tools
        Route::prefix('tools')->name('tools.')->group(function () {
            Route::apiResource('equipments', EquipmentController::class);
            Route::apiResource('brands', BrandTypeController::class);
        });

        // Materials
        Route::prefix('materials')->name('materials.')->group(function () {
            Route::apiResource('reagents', ReagentController::class);
            Route::apiResource('grades', GradeController::class);
        //     Route::apiResource('suppliers', AdminApiSupplier::class)->except(['index']);
        });

        // Tests
        Route::prefix('tests')->name('tests.')->group(function () {
            Route::apiResource('parameters', ParameterController::class);
            Route::apiResource('methods', TestMethodsController::class);
            Route::apiResource('units', UnitValueController::class);
            Route::apiResource('references', ReferenceController::class);
            Route::apiResource('categories', SampleCategoryController::class);
        });
    });

    // Staff
    Route::prefix('staff')->middleware('staff')->name('api.staff.')->group(function () {
        Route::prefix('clients.')->apiResource('clients', ClientController::class);
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/', [OrderController::class, 'index'])->name('index');
            Route::post('/', [OrderController::class, 'store'])->name('store');
            Route::post('/samples', [OrderController::class, 'storeSample'])->name('storeSample');
        });
    });
});
