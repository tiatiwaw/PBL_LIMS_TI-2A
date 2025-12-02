<?php

namespace App\Http\Controllers\API\V1\Analyst;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use App\Models\Certificate;
use App\Models\Training;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Menampilkan profil lengkap analyst
     */
    public function show(): JsonResponse
    {
        $analyst = Analyst::where('user_id', auth()->id())
            ->with([
                'user:id,email',
                'certificates:id,analyst_id,name,file_path',
                'trainings:id,name,provider,date,result'
            ])
            ->first();

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $analyst
        ]);
    }

    /**
     * Update foto profil
     */
    public function updatePhoto(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $analyst = Analyst::where('user_id', auth()->id())->first();

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found'], 404);
        }

        if ($analyst->photo && Storage::disk('public')->exists($analyst->photo)) {
            Storage::disk('public')->delete($analyst->photo);
        }

        $path = $request->file('photo')->store('photos/analysts', 'public');

        $analyst->update(['photo' => $path]);

        return response()->json([
            'status' => 'success',
            'message' => 'Photo updated successfully',
            'photo_url' => asset('storage/' . $path)
        ]);
    }

    /**
     * Update password
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        $analyst = Analyst::where('user_id', auth()->id())->with('user')->first();

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found'], 404);
        }

        $user = $analyst->user;

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

    /**
     * Tambah certificate
     */
    public function addCertification(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048'
        ]);

        $analyst = Analyst::where('user_id', auth()->id())->first();

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found'], 404);
        }

        $path = $request->hasFile('file')
            ? $request->file('file')->store('certificates', 'public')
            : null;

        $cert = Certificate::create([
            'analyst_id' => $analyst->id,
            'name' => $request->name,
            'file_path' => $path
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Certificate added successfully',
            'data' => $cert
        ]);
    }

    /**
     * Hapus certificate
     */
    public function deleteCertification($id)
    {
        $cert = Certificate::find($id);

        if (!$cert) {
            return response()->json(['message' => 'Certificate not found'], 404);
        }

        if ($cert->file_path && Storage::disk('public')->exists($cert->file_path)) {
            Storage::disk('public')->delete($cert->file_path);
        }

        $cert->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Certificate deleted'
        ]);
    }

    /**
     * Tambah training (many-to-many)
     */
    public function addTraining(Request $request)
    {
        $request->validate([
            'training_id' => 'required|exists:trainings,id',
        ]);

        $analyst = Analyst::where('user_id', auth()->id())->first();

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found'], 404);
        }

        // attach kalau belum ada
        $analyst->trainings()->syncWithoutDetaching([$request->training_id]);

        return response()->json([
            'status' => 'success',
            'message' => 'Training added successfully'
        ]);
    }

    /**
     * Hapus training dari pivot
     */
    public function deleteTraining($id)
    {
        $analyst = Analyst::where('user_id', auth()->id())->first();

        if (!$analyst) {
            return response()->json(['message' => 'Analyst not found'], 404);
        }

        $analyst->trainings()->detach($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Training detached'
        ]);
    }
}
