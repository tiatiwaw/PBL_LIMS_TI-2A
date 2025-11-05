<?php

namespace App\Http\Controllers;

// --- Impor Model ---
use App\Models\Client;
use App\Models\User;

// --- Impor Bawaan Laravel ---
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StaffController extends Controller
{

    public function clientIndex()
    {
        $clients = Client::with('user')->get();

        return Inertia::render('staff/clients/index', [
            'clientData' => $clients,
        ]);
    }

    public function clientStore(Request $request)
    {
        // 1. Validasi data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'npwp_number' => 'required|string',
            'email' => [
                'required',
                'email',
                'unique:users,email',
                'unique:clients,email'
            ],
            'password' => 'required|string|min:8',
        ]);

        // 2. Buat USER 
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        // 3. Buat CLIENT dan hubungkan user_id-nya
        Client::create([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
        ]);

        return Redirect::route('staff.client.index')->with('success', 'Klien baru berhasil dibuat.');
    }

    public function clientUpdate(Request $request, Client $client)
    {
        // 1. Validasi data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'npwp_number' => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($client->user_id),
                Rule::unique('clients')->ignore($client->id)
            ],
        ]);

        // 2. Update data di tabel User
        $client->user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
        ]);

        // 3. Update data di tabel Client
        $client->update([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        return Redirect::route('staff.client.index')->with('success', 'Data klien berhasil diperbarui.');
    }

    public function clientDestroy(Client $client)
    {
        if ($client->user) {
            $client->user->delete();
        }
        $client->delete();

        return Redirect::route('staff.client.index')->with('success', 'Klien berhasil dihapus.');
    }


    // =========================================================================
    // --- MANAJEMEN ORDER 
    // =========================================================================

    public function order()
    {
        return Inertia::render('staff/orders/index');
    }
}
