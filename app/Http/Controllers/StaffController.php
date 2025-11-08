<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use App\Models\Sample;
use App\Models\SampleCategory;
use App\Models\NOrderSample;
use App\Models\Order;
use App\Models\AnalysesMethod;
use App\Models\NAnalysesMethodsOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    // ================================
    // KLIEN
    // ================================
    public function index()
    {
        $clients = Client::with('users')->get();

        return Inertia::render('staff/clients/index', [
            'clientData' => $clients,
        ]);
    }

    public function store(Request $request)
    {
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


        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        Client::create([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        return Redirect::route('staff.client.index')->with('success', 'Klien baru berhasil dibuat yeahhh.');
    }

    public function update(Request $request, Client $client)
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
        $client->users->update([
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

    public function destroy(Client $client)
    {
        if ($client->users) {
            $client->users->delete();
        }
        $client->delete();

        return Redirect::route('staff.client.index')->with('success', 'Klien berhasil dihapus.');
    }

    // ================================
    // SAMPLE
    // ================================

    public function storeSample(Request $request)
    {
        $validatedData = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', 'string'],
            'preservation_method' => ['required', 'string'],
            'condition' => ['required', 'string'],
            'storage_condition' => ['required', 'string'],
        ]);

        $newSample = Sample::create([
            'sample_category_id' => $validatedData['sample_category_id'],
            'name' => $validatedData['name'],
            'form' => $validatedData['form'],
            'preservation_method' => $validatedData['preservation_method'],
            'condition' => $validatedData['condition'],
            'storage_condition' =>  $validatedData['storage_condition'],
        ]);

        return back();
    }

    // ================================
    // ORDER
    // ================================
    public function indexOrder()
    {
        $samples = Sample::with('sample_categories')->get();
        $methods = AnalysesMethod::all();
        $clients = Client::all();
        $categories = SampleCategory::all();
        // 🔹 Buat nomor order otomatis
        $lastOrder = Order::latest('id')->first();
        $nextNumber = str_pad(($lastOrder ? $lastOrder->id + 1 : 1), 4, '0', STR_PAD_LEFT);
        $orderNumber = 'ORD-' . now('Asia/Jakarta')->format('Ymd') . '-' . $nextNumber;

        return Inertia::render('staff/orders/index', [
            'samples' => $samples,
            'methods' => $methods,
            'clients' => $clients,
            'categories' => $categories,
            'orderNumber' => $orderNumber,
        ]);
    }

    public function storeOrder(Request $request)
    {
        $data = $request->validate([
            'selectedKlien.id' => ['required', 'exists:clients,id'],
            'nomorOrder' => ['required', 'string'],
            'judulOrder' => ['required', 'string'],
            'metodeAnalisis' => ['array'],
            'metodeAnalisis.*.id' => ['nullable', 'integer'],
            'metodeAnalisis.*.price' => ['nullable', 'integer'],
            'metodeAnalisis.*.description' => ['nullable', 'string'],
            'tipeOrder' => ['required', 'string', 'in:internal,regular,external,urgent'],
            'tanggalOrder' => ['nullable', 'date'],
            'estimasiSelesai' => ['nullable', 'date'],
            'catatan' => ['nullable', 'string'],
            'totalHarga' => ['required', 'integer'],
            'samples' => ['array'],
            'samples.*.id' => ['nullable', 'integer'],
            'samples.*.name' => ['nullable', 'string'],
            'samples.*.form' => ['nullable', 'string'],
            'samples.*.condition' => ['nullable', 'string'],
            'samples.*.sample_category_id' => ['nullable', 'integer'],
            'samples.*.sample_volume' => ['nullable', 'string'],
        ]);

        DB::transaction(function () use ($data) {
            // 🔹 Simpan order utama
            $order = Order::create([
                'client_id' => $data['selectedKlien']['id'],
                'order_number' => $data['nomorOrder'],
                'title' => $data['judulOrder'],
                'result_value' => '-',
                'order_date' => now('Asia/Jakarta')->toDateString(),
                'estimate_date' => $data['estimasiSelesai'] ?? null,
                'report_issued_at' => null,
                'report_file_path' => '-',
                'notes' => $data['catatan'] ?? '-',
                'order_type' => $data['tipeOrder'],
                'status' => 'received',
            ]);

            // 🔹 Simpan sample order
            foreach ($data['samples'] as $sampleData) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sampleData['id'],
                    'sample_volume' => $sampleData['sample_volume'] ?? null,
                ]);
            }

            // simpan analyses method order
            foreach ($data['metodeAnalisis'] as $methodData) {
                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $methodData['id'],
                    'price' => $data['totalHarga'],
                    'description' => $methodData['description'] ?? '-',
                ]);
            }
        });

        return redirect()->route('staff.order.index')->with('success', 'Order berhasil dibuat!');
    }
}
