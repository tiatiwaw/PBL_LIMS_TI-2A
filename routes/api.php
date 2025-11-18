// Manager

Route::prefix('manager')
    ->middleware('manager') // middleware ini bisa kamu ubah sesuai kebutuhan
    ->name('api.manager.')
    ->group(function () {

        // Users API (GET + UPDATE)
        Route::get('/users', [\App\Http\Controllers\API\V1\Manager\UsersController::class, 'index'])->name('users.index');
        Route::put('/users/{id}', [\App\Http\Controllers\API\V1\Manager\UsersController::class, 'update'])->name('users.update');

        // Orders API (GET + UPDATE)
        Route::get('/orders', [\App\Http\Controllers\API\V1\Manager\OrdersController::class, 'index'])->name('orders.index');
        Route::put('/orders/{id}', [\App\Http\Controllers\API\V1\Manager\OrdersController::class, 'update'])->name('orders.update');
    });