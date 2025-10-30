<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('user.index', compact('users'));
    }

    public function create()
    {
        return view('user.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client'])],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        try {
            User::create($validated);
            return redirect()->route('user.index')->with('success', 'User created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create User.');
        }
    }

    public function show(User $user)
    {
        return view('user.show', compact('user'));
    }

    public function edit(User $user)
    {
        return view('user.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client'])],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        try {
            $user->name = $validated['name'];
            $user->role = $validated['role'];
            $user->email = $validated['email'];
            if (!empty($validated['password'])) {
                $user->password = $validated['password'];
            }
            $user->save();
            return redirect()->route('user.index')->with('success', 'User updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update User.');
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route('user.index')->with('success', 'User deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete User.');
        }
    }
}
