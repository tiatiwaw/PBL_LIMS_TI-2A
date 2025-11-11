<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    // GET /api/v1/manager/users
    public function index()
    {
        try {
            // filter user berdasarkan role (staff, analyst, manager, supervisor)
            $users = User::whereIn('role', ['staff', 'analyst', 'manager', 'supervisor'])->get();
            return response()->json($users, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch users',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // PUT /api/v1/manager/users/{id}
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // validasi data user
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'role' => 'sometimes|string|in:staff,analyst,manager,supervisor',
        ]);

        try {
            $user->update($validated);
            return response()->json($user, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update user',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
