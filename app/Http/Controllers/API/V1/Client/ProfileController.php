<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        $clients = Client::where('user_id', $user->id)
            ->first();

        return response()->json([
            'success' => true,
            'message' => 'Data profile berhasil diambil.',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'address' => $clients->address,
                'phone_number' => $clients->phone_number,  
                'npwp_number' => $clients->npwp_number,
            ]
        ]);
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,png,jpeg|max:2048'
        ]);

        $file = $request->file('photo');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/profile/'), $fileName);

        $client = $request->user()->clients;
        $client->photo = $fileName;
        $client->save();

        return response()->json([
            'success' => true,
            'message' => 'Foto profile berhasil diperbarui.',
            'photo_url' => asset('uploads/profile/' . $fileName)
        ]);
    }

    public function updatePhone(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|min:10|max:15'
        ]);

        $user = $request->user();
        $user->clients->phone_number = $request->phone_number;
        $user->clients->save();

        return response()->json([
            'success' => true,
            'message' => 'Nomor telepon berhasil diperbarui.',
            'data' => [
                'phone_number' => $user->clients->phone_number
            ]
        ]);
    }

    /**
     * Update password (Client)
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        $client = $user->clients;
        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Old password is incorrect'
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully'
        ]);
    }
}
