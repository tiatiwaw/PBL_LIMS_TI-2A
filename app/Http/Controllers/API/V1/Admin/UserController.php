<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Analyst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Exception;

class UserController extends Controller
{
    /**
     * Menampilkan semua user beserta data analis (jika ada).
     */
    public function index()
    {
        try {
            // Relasi jamak -> analysts
            $users = User::with(['analysts.certificates', 'analysts.trainings'])->get();

            return response()->json([
                'success' => true,
                'message' => 'Daftar pengguna berhasil diambil.',
                'data' => $users,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pengguna.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menambahkan user baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'role'     => [
                    'required',
                    Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client']),
                ],
            ]);

            $validated['password'] = Hash::make($validated['password']);
            $user = User::create($validated);

            // Jika role-nya analyst, buatkan data di tabel analysts
            if ($user->role === 'analyst') {
                Analyst::create([
                    'user_id'    => $user->id,
                    'name'       => $user->name,
                    'specialist' => $request->input('specialist', 'Umum'),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dibuat.',
                'data'    => $user->load('analysts'),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat user.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menambahkan sertifikasi ke analis.
     */
    public function addCertification(Request $request, $id)
    {
        try {
            $user = User::with('analysts')->findOrFail($id);

            if ($user->role !== 'analyst' || $user->analysts->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'User ini bukan analis atau belum memiliki data analis.',
                ], 403);
            }

            $validated = $request->validate([
                'name'         => 'required|string|max:255',
                'issued_by'    => 'required|string|max:255',
                'issued_date'  => 'required|date',
                'expired_date' => 'nullable|date',
                'file_path'    => 'nullable|string',
            ]);

            // Ambil instance analis pertama (karena relasi hasOne)
            $analyst = $user->analysts->first();
            $certificate = $analyst->certificates()->create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Sertifikasi berhasil ditambahkan.',
                'data'    => $certificate,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan sertifikasi.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menambahkan pelatihan ke analis.
     */
    public function attachTraining(Request $request, $id)
    {
        try {
            $user = User::with('analysts')->findOrFail($id);

            if ($user->role !== 'analyst' || $user->analysts->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'User ini bukan analis atau belum memiliki data analis.',
                ], 403);
            }

            $validated = $request->validate([
                'training_id' => 'required|exists:trainings,id',
            ]);

            $analyst = $user->analysts->first();
            $analyst->trainings()->syncWithoutDetaching($validated['training_id']);

            return response()->json([
                'success' => true,
                'message' => 'Pelatihan berhasil ditambahkan ke analis.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan pelatihan.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus user.
     */
    public function destroy($id)
    {
        try {
            $user = User::with('analysts')->findOrFail($id);

            if ($user->role === 'analyst' && !$user->analysts->isEmpty()) {
                // Hapus data analis (dan dependensinya)
                foreach ($user->analysts as $analyst) {
                    $analyst->delete();
                }
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
