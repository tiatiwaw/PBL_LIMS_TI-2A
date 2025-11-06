<?php

use App\Http\Controllers\StaffApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;

Route::prefix('staff')->group(function () {
    Route::get('/clients', [StaffApiController::class, 'apiClientIndex']);
    Route::post('/clients', [StaffApiController::class, 'apiClientStore']);
    Route::put('/clients/{client}', [StaffApiController::class, 'apiClientUpdate']);
    Route::delete('/clients/{client}', [StaffApiController::class, 'apiClientDestroy']);
    Route::get('/orders', [StaffApiController::class, 'apiOrderIndex']);
    Route::post('/orders', [StaffApiController::class, 'apiStoreOrder']);
    Route::post('/orders/samples', [StaffApiController::class, 'apiSampleStore']);
});
