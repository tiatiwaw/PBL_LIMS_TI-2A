<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnalystController;

Route::prefix('analyst')->group(function () {
    Route::get('/dashboard', [AnalystController::class, 'apiDashboard']);
    Route::post('/orders/{order}/accept', [AnalystController::class, 'apiAccept']);

    Route::get('/orders', [AnalystController::class, 'apiOrders']);
    Route::get('/orders/{id}', [AnalystController::class, 'apiOrderDetail']);

    Route::post('/orders/{order}/upload-report', [AnalystController::class, 'apiUploadReport']);
    Route::get('/orders/{order}/download-report', [AnalystController::class, 'apiDownloadReport']);

    Route::post('/samples/{sample}/confirm', [AnalystController::class, 'apiConfirm']);
    Route::post('/samples/{sample}/unconfirm', [AnalystController::class, 'apiUnconfirm']);

    Route::get('/dashboard-page', [AnalystController::class, 'apiDashboardPage']);
    Route::get('/profile', [AnalystController::class, 'apiProfile']);
});