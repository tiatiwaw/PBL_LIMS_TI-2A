<?php

namespace App\Http\Controllers\API\V1\Analyst;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Menampilkan profil dalam mode read-only.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $certificates = Certificate::where('user_id', $user->id)->get();
        $trainings = Training::where('user_id', $user->id)->get();

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'data' => [
                    'user' => $user,
                    'certificates' => $certificates,
                    'trainings' => $trainings
                ],
            ]);
        }

        return view('profil.index', compact('user', 'certificates', 'trainings'));
    }

    /**
     * Update foto profil (satu-satunya yg bisa diubah selain password).
     */
    public function updateFoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $user = Auth::user();

        // Hapus foto lama jika ada
        if ($user->profile_photo) {
            $oldPath = 'profile/' . $user->profile_photo;
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        // Simpan foto baru
        $file = $request->file('photo');
        $filename = time() . '.' . $file->extension();
        // menyimpan ke storage/app/public/profile
        $file->storeAs('profile', $filename, 'public');

        $user->profile_photo = $filename;
        $user->save();

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Foto profil berhasil diperbarui',
                'photo_url' => asset('storage/profile/' . $filename)
            ]);
        }

        return back()->with('success', 'Foto profil berhasil diperbarui.');
    }

    /**
     * Satu-satunya bagian data yg boleh diubah.
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'password_lama' => 'required',
            'password_baru' => 'required|min:6|confirmed'
        ]);

        $user = Auth::user();

        if (!Hash::check($request->password_lama, $user->password)) {
            if ($request->wantsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password lama salah'
                ], 422);
            }

            return back()->withErrors(['password_lama' => 'Password lama salah']);
        }

        $user->password = Hash::make($request->password_baru);
        $user->save();

        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => 'Password berhasil diubah']);
        }

        return back()->with('success', 'Password berhasil diubah.');
    }

    /**
     * Tambah sertifikasi
     */
    public function addCertificate(Request $request)
    {
        $request->validate([
            'nama_sertifikasi' => 'required|string',
            'penerbit' => 'required|string',
            'tahun' => 'required|integer'
        ]);

        $cert = Certificate::create([
            'user_id' => Auth::id(),
            'nama_sertifikasi' => $request->nama_sertifikasi,
            'penerbit' => $request->penerbit,
            'tahun' => $request->tahun,
        ]);

        return $request->wantsJson()
            ? response()->json(['status' => 'success', 'data' => $cert])
            : back()->with('success', 'Sertifikasi ditambahkan.');
    }

    /**
     * Hapus sertifikasi
     */
    public function deleteCertificate(Request $request, $id)
    {
        Certificate::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return $request->wantsJson()
            ? response()->json(['status' => 'success'])
            : back()->with('success', 'Sertifikasi dihapus.');
    }

    /**
     * Tambah training
     */
    public function addTraining(Request $request)
    {
        $request->validate([
            'nama_training' => 'required|string',
            'penyelenggara' => 'required|string',
            'tahun' => 'required|integer'
        ]);

        $training = Training::create([
            'user_id' => Auth::id(),
            'nama_training' => $request->nama_training,
            'penyelenggara' => $request->penyelenggara,
            'tahun' => $request->tahun,
        ]);

        return $request->wantsJson()
            ? response()->json(['status' => 'success', 'data' => $training])
            : back()->with('success', 'Training ditambahkan.');
    }

    /**
     * Hapus training
     */
    public function deleteTraining(Request $request, $id)
    {
        Training::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return $request->wantsJson()
            ? response()->json(['status' => 'success'])
            : back()->with('success', 'Training dihapus.');
    }
}
