<?php

namespace App\Http\Controllers;

// --- Impor Model ---
use App\Models\Client;
use App\Models\User;
use App\Models\Sample;
use App\Models\SampleCategory;

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
        $clients = Client::with('users')->get();

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
            'pic_name' => 'required|string|max:255',
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
            'name' => $validatedData['pic_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        // 3. Buat CLIENT dan hubungkan user_id-nya
        Client::create([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
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
            'pic_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($client->user_id),
                Rule::unique('clients')->ignore($client->id)
            ],
        ]);

        // 2. Update data di tabel User
        $client->users->update([
            'name' => $validatedData['pic_name'],
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
        if ($client->users) {
            $client->users->delete();
        }
        $client->delete();

        return Redirect::route('staff.client.index')->with('success', 'Klien berhasil dihapus.');
    }


    // =========================================================================
    // --- MANAJEMEN SAMPLE 
    // =========================================================================

    public function sampleIndex()
    {
        $samples = Sample::with('sample_categories')->get();

        return Inertia::render('staff/samples/index', [
            'samplesData' => $samples,
        ]);
    }

    public function sampleCreate()
    {
        $categories = SampleCategory::all();

        return Inertia::render('staff/samples/create', [
            'categories' => $categories,
        ]);
    }

    public function sampleStore(Request $request)
    {
        $validatedData = $request->validate([
            'sample_category_id' => 'required|exists:sample_categories,id',
            'name' => 'required|string|max:255',
            'form' => 'required|string',
            'preservation_method' => 'required|string',
            'sample_volume' => 'required|numeric',
            'condition' => 'required|string',
            'storage_condition' => 'required|string',
            'temperature' => 'required|string',
        ]);

        Sample::create($validatedData);

        return Redirect::route('staff.sample.index')->with('success', 'Sample baru berhasil dibuat.');
    }

    public function sampleEdit(Sample $sample)
    {
        $categories = SampleCategory::all();

        return Inertia::render('staff/samples/edit', [
            'sample' => $sample,
            'categories' => $categories,
        ]);
    }

    public function sampleUpdate(Request $request, Sample $sample)
    {
        $validatedData = $request->validate([
            'sample_category_id' => 'required|exists:sample_categories,id',
            'name' => 'required|string|max:255',
            'form' => 'required|string',
            'preservation_method' => 'required|string',
            'sample_volume' => 'required|numeric',
            'condition' => 'required|string',
            'storage_condition' => 'required|string',
            'temperature' => 'required|string',
        ]);

        $sample->update($validatedData);

        return Redirect::route('staff.sample.index')->with('success', 'Data sample berhasil diperbarui.');
    }

    public function sampleDestroy(Sample $sample)
    {
        $sample->delete();
        return Redirect::route('staff.sample.index')->with('success', 'Sample berhasil dihapus.');
    }


    // =========================================================================
    // --- MANAJEMEN ORDER 
    // =========================================================================

    public function order()
    {
        return Inertia::render('staff/orders/index');
    }
}
