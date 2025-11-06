<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ManagerController;

Route::get('/manager/orders', [ManagerController::class, 'getOrdersJson']);
Route::get('/manager/users', [ManagerController::class, 'getUsersJson']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
