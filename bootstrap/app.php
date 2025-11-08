<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // register middleware using alias
        $middleware->alias([
            'admin' => App\Http\Middleware\AdminMiddleware::class,
            'analyst' => App\Http\Middleware\AnalystMiddleware::class,
            'manager' => App\Http\Middleware\ManagerMiddleware::class,
            'staff' => App\Http\Middleware\StaffMiddleware::class,
            'supervisor' => App\Http\Middleware\SupervisorMiddleware::class,
            'client' => App\Http\Middleware\ClientMiddleware::class,
        ]);

        // Custom middleware group
        $middleware->group('role', [
            App\Http\Middleware\AdminMiddleware::class,
            App\Http\Middleware\AnalystMiddleware::class,
            App\Http\Middleware\ManagerMiddleware::class,
            App\Http\Middleware\StaffMiddleware::class,
            App\Http\Middleware\SupervisorMiddleware::class,
            App\Http\Middleware\ClientMiddleware::class,
        ]);

        // global web middleware
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();