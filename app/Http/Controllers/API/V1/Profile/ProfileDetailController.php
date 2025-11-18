<?php

namespace App\Http\Controllers\API\V1\Profile;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Container\Attributes\Auth;

class ProfileDetailController extends Controller
{
    public function index(User $user) {
        $currentUserRole = $user->role;

        switch ($currentUserRole) {
            case 'analyst':
                $currentUser = User::with(['analysts.certificates', 'analysts.trainings'])->findOrFail($user->id);
                $currentUserProfile = $currentUser->analysts;
                break;
            case 'client':
                $currentUser = User::with('client')->findOrFail($user->id);
                $currentUserProfile = $currentUser->client;
                break;
        }

        return response()->json([
            $currentUserProfile
        ]);
        
    }
}