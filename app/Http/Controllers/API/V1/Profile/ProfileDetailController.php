<?php

namespace App\Http\Controllers\API\V1\Profile;

use App\Models\User;
use App\Models\Analyst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Container\Attributes\Auth;

class ProfileDetailController extends Controller
{
    public function index($userId) {
        // $currentUserRole = $user->role;
        $userRole = User::find($userId)->role;
        // $currentUserRole = $user->role;

        // $currentUser = null;

        switch ($userRole) {
            case 'analyst':
                $currentUser = User::with(['analyst.certificates', 'analyst.trainings'])->findOrFail($userId);
                break;
            case 'client':
                $currentUser = User::with(['clients'])->findOrFail($userId);
                break;
            default:
                $currentUser = User::findOrFail($userId);
                break;

        }

        

        return response()->json(
            $currentUser
        );
        
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6',
        ]);

        $user = User::where('id', auth()->id())->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Old password is incorrect'
            ], 400);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully'
        ]);
    }
}