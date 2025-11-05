<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class StaffMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('auth.login');
        }

        $allowedRoles = ['staff', 'supervisor', 'manager', 'admin'];

        if (!in_array(Auth::user()->role, $allowedRoles)) {
            abort(403, 'Unauthorized access. Staff role required.');
        }

        return $next($request);
    }
}
