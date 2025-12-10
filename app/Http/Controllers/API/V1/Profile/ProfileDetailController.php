<?php

namespace App\Http\Controllers\API\V1\Profile;

use App\Models\User;
use App\Models\Analyst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Container\Attributes\Auth;

class ProfileDetailController extends Controller
{
    public function index($userId) {
        $userRole = User::find($userId)->role;

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

        return response()->json($currentUser);
    }

    public function changePassword(Request $request, $userId)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6',
        ]);

        $user = User::findOrFail($userId);

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

    public function updateProfile(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui',
            'data' => $user
        ]);
    }

    public function uploadSignature(Request $request)
    {
        $request->validate([
            'signature' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'user_id' => 'required|exists:users,id'
        ]);

        $user = User::findOrFail($request->user_id);

        // Check if user role is not client
        if ($user->role === 'client') {
            return response()->json([
                'status' => 'error',
                'message' => 'Client tidak dapat mengunggah signature'
            ], 403);
        }

        // Delete old signature if exists
        if ($user->signature && Storage::exists('public/' . $user->signature)) {
            Storage::delete('public/' . $user->signature);
        }

        // Store new signature with user name included
        $file = $request->file('signature');
        $userName = str_replace(' ', '_', strtolower($user->name));
        $filename = "sig_{$userName}_{$user->id}.png";
        $path = $file->storeAs('signatures', $filename, 'public');

        $user->update(['signature' => $path]);

        return response()->json([
            'status' => 'success',
            'message' => 'Signature berhasil diunggah',
            'data' => [
                'signature' => $user->signature,
            ]
        ]);
    }
}