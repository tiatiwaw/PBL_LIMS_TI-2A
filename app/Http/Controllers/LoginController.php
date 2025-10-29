<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        // return Inertia::render('auth/login/index');

        $credentials = $request->validated();

        // Cek hanya pakai email
        $user = User::where('email', $credentials['email'])->first();

        if ($user && password_verify($credentials['password'], $user->password)) {
            auth()->login($user);
            $request->session()->regenerate();

            if ($user->hasRole('admin')) {
                return redirect()->intended('/admin/index'); // Arahkan ke halaman admin
            }
            if ($user->hasRole('analyst')) {
                return redirect()->intended('/analyst/index'); // Arahkan ke halaman admin
            }
            if ($user->hasRole('manager')) {
                return redirect()->intended('/manager/index'); // Arahkan ke halaman manager
            }

            return redirect()->intended('/profile'); // Arahkan ke halaman profil
        }
        return back()->with('error', 'Login gagal, pastikan email dan password benar.');
    }
}
