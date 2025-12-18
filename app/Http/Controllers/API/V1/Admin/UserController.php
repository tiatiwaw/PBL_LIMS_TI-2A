<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Analyst;
use App\Models\NTrainingAnalyst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Exception;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Menampilkan semua user beserta data analis (jika ada).
     */
    public function index()
    {
        try {
            $users = User::with(['analyst.certificates', 'analyst.trainings'])->get();

            return response()->json($users);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pengguna.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menambahkan user baru.
     */
    public function store(Request $request)
    {
        return DB::transaction(function () use ($request) {
            try {
                $validated = $request->validate([
                    'name'           => 'required|string|max:255',
                    'email'          => 'required|email|unique:users,email',
                    'role'           => [
                        'required',
                        Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client']),
                    ],
                    'trainings'      => 'nullable|array',
                    'trainings.*.id' => 'required|integer',
                ]);

                $allRequestData = $request->all();

                $specialist = $allRequestData['analyst.specialist']
                    ?? $allRequestData['analyst_specialist']
                    ?? 'Umum';

                $user = User::create([
                    'name'              => $validated['name'],
                    'email'             => $validated['email'],
                    'role'              => $validated['role'],
                    'password'          => Hash::make('password123'),
                    'email_verified_at' => now(),
                ]);

                if ($user->role === 'analyst') {
                    $analyst = Analyst::create([
                        'user_id'    => $user->id,
                        'name'       => $user->name,
                        'specialist' => $specialist,
                    ]);

                    if (!empty($request->trainings)) {
                        foreach ($request->trainings as $training) {
                            NTrainingAnalyst::create([
                                'analyst_id'  => $analyst->id,
                                'training_id' => $training['id'],
                            ]);
                        }
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'User berhasil dibuat.',
                    'data'    => $user->load('analyst.trainings'),
                ], 201);
            } catch (Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal membuat user.',
                    'error'   => $e->getMessage(),
                ], 500);
            }
        });
    }

    public function update(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            try {
                $user = User::findOrFail($id);

                $validated = $request->validate([
                    'name'      => 'sometimes|string|max:255',
                    'email'     => 'sometimes|email|unique:users,email,' . $user->id,
                    'role'      => [
                        'sometimes',
                        Rule::in(['admin', 'manager', 'supervisor', 'staff', 'analyst', 'client']),
                    ],
                    'password'  => 'sometimes|min:6',
                    'trainings' => 'nullable|array',
                ]);

                $allRequestData = $request->all();
                $specialist = $allRequestData['analyst.specialist']
                    ?? $allRequestData['analyst_specialist']
                    ?? null;

                if ($request->filled('password')) {
                    $validated['password'] = Hash::make($request->password);
                } else {
                    unset($validated['password']);
                }

                unset($validated['trainings']);

                $oldRole = $user->role;

                $user->update($validated);

                $newRole = $user->role;

                if ($oldRole === 'analyst' && $newRole !== 'analyst') {
                    $analyst = Analyst::where('user_id', $user->id)->first();
                    if ($analyst) {
                        NTrainingAnalyst::where('analyst_id', $analyst->id)->delete();
                        $analyst->delete();
                    }
                }

                if ($newRole === 'analyst') {
                    $analyst = Analyst::firstOrCreate(
                        ['user_id' => $user->id],
                        ['name' => $user->name, 'specialist' => 'Umum']
                    );

                    $updateData = ['name' => $user->name];

                    if ($specialist !== null) {
                        $updateData['specialist'] = $specialist;
                    }

                    $analyst->update($updateData);

                    if ($request->has('trainings')) {
                        $trainingsInput = $request->input('trainings', []);

                        $trainingIds = collect($trainingsInput)
                            ->pluck('id')
                            ->filter()
                            ->map(fn($id) => (int)$id)
                            ->toArray();

                        NTrainingAnalyst::where('analyst_id', $analyst->id)
                            ->whereNotIn('training_id', $trainingIds)
                            ->delete();

                        foreach ($trainingIds as $tid) {
                            NTrainingAnalyst::firstOrCreate([
                                'analyst_id'  => $analyst->id,
                                'training_id' => $tid,
                            ]);
                        }
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'User berhasil diperbarui.',
                    'data'    => $user->load('analyst.trainings'),
                ], 200);
            } catch (Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal memperbarui user.',
                    'error'   => $e->getMessage(),
                ], 500);
            }
        });
    }

    /**
     * Menghapus user.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(['success' => true, 'message' => 'User berhasil dihapus beserta data analyst.',], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
