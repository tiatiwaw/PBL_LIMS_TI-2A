<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {
        // Ensure user is authenticated
        if (!Auth::check()) {
            return $request->expectsJson()
                ? response()->json(['message' => 'Unauthenticated'], 401)
                : redirect()->route('auth.login.form');
        }

        $user = Auth::user();

        // If no roles specified, allow access
        if (empty($roles)) {
            return $next($request);
        }

        // Check roles using Spatie Permission (safer & more flexible)
        foreach ($roles as $role) {
            if ($user->hasRole($role)) {
                return $next($request);
            }
        }

        // If we reach here, user doesn't have any of the required roles
        return $request->expectsJson()
            ? response()->json(['message' => 'Access Denied. Required roles: ' . implode(', ', $roles)], 403)
            : abort(403, 'You do not have permission to access this resource.');
    }
}
