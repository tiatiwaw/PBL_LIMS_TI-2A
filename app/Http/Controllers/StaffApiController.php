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

class StaffApiController extends Controller
{
    // ================================
    // KLIEN
    // ================================

    /**
     * 🔹 Mengambil data klien (untuk internal)
     */
    private function getClientData()
    {
        return Client::with('users')->get();
    }

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaClientIndex()
    {
        return Inertia::render('staff/clients/index', [
            'clientData' => $this->getClientData(),
        ]);
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiClientIndex()
    {
        return response()->json([
            'clientData' => $this->getClientData(),
        ]);
    }

    // --- Client Store ---

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaClientStore(Request $request)
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

        return Redirect::route('staff.client.index')->with('success', 'Klien baru berhasil dibuat.');
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiClientStore(Request $request)
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

        $client = Client::create([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        // Muat relasi user untuk respons JSON
        $client->load('users');

        return response()->json([
            'success' => true,
            'message' => 'Klien baru berhasil dibuat.',
            'client' => $client,
        ], 201); // 201 Created
    }

    // --- Client Update ---

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaClientUpdate(Request $request, Client $client)
    {
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

        $client->users->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
        ]);

        $client->update([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        return Redirect::route('staff.client.index')->with('success', 'Data klien berhasil diperbarui.');
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiClientUpdate(Request $request, Client $client)
    {
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

        $client->users->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
        ]);

        $client->update([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'npwp_number' => $validatedData['npwp_number'],
            'email' => $validatedData['email'],
        ]);

        // Muat ulang data klien yang diperbarui beserta relasinya
        $client->refresh()->load('users');

        return response()->json([
            'success' => true,
            'message' => 'Data klien berhasil diperbarui.',
            'client' => $client,
        ]); // 200 OK (default)
    }

    // --- Client Destroy ---

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaClientDestroy(Client $client)
    {
        if ($client->users) {
            $client->users->delete();
        }
        $client->delete();

        return Redirect::route('staff.client.index')->with('success', 'Klien berhasil dihapus.');
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiClientDestroy(Client $client)
    {
        if ($client->users) {
            $client->users->delete();
        }
        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Klien berhasil dihapus.',
        ]); // 200 OK (atau 204 No Content jika tidak ada body)
    }


    // ================================
    // SAMPLE
    // ================================

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaSampleStore(Request $request)
    {
        $validatedData = $request->validate([
            'sample_category_id' => ['required', 'exists:sample_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'form' => ['required', 'string'],
            'preservation_method' => ['required', 'string'],
            'condition' => ['required', 'string'],
            'storage_condition' => ['required', 'string'],
        ]);

        Sample::create([
            'sample_category_id' => $validatedData['sample_category_id'],
            'name' => $validatedData['name'],
            'form' => $validatedData['form'],
            'preservation_method' => $validatedData['preservation_method'],
            'condition' => $validatedData['condition'],
            'storage_condition' =>  $validatedData['storage_condition'],
        ]);

        return back()->with('success', 'Sample baru berhasil dibuat.');
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiSampleStore(Request $request)
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

        return response()->json([
            'success' => true,
            'message' => 'Sample baru berhasil dibuat.',
            'sample' => $newSample,
        ], 201); // 201 Created
    }


    // ================================
    // ORDER
    // ================================

    /**
     * 🔹 Mengambil data untuk halaman order (internal)
     */
    private function getOrderData()
    {
        $samples = Sample::with('sample_categories')->get();
        $methods = AnalysesMethod::all();
        $clients = Client::all();
        $categories = SampleCategory::all();

        // Buat nomor order otomatis
        $lastOrder = Order::latest('id')->first();
        $nextNumber = str_pad(($lastOrder ? $lastOrder->id + 1 : 1), 4, '0', STR_PAD_LEFT);
        $orderNumber = 'ORD-' . now('Asia/Jakarta')->format('Ymd') . '-' . $nextNumber;

        return [
            'samples' => $samples,
            'methods' => $methods,
            'clients' => $clients,
            'categories' => $categories,
            'orderNumber' => $orderNumber,
        ];
    }

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaOrderIndex()
    {
        return Inertia::render('staff/orders/index', $this->getOrderData());
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiOrderIndex()
    {
        return response()->json($this->getOrderData());
    }

    // --- Store Order ---

    /**
     * 🔹 Inertia (Web) Endpoint
     */
    public function inertiaStoreOrder(Request $request)
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

            foreach ($data['samples'] as $sampleData) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sampleData['id'],
                    'sample_volume' => $sampleData['sample_volume'] ?? null,
                ]);
            }

            foreach ($data['metodeAnalisis'] as $methodData) {
                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $methodData['id'],
                    'price' => $methodData['price'],
                    'description' => $methodData['description'] ?? '-',
                ]);
            }
        });

        return redirect()->route('staff.order.index')->with('success', 'Order berhasil dibuat!');
    }

    /**
     * 🔹 API (JSON) Endpoint
     */
    public function apiStoreOrder(Request $request)
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

        // Gunakan variabel $order untuk menyimpan order yang dibuat di dalam transaksi
        $order = null;

        DB::transaction(function () use ($data, &$order) {
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

            foreach ($data['samples'] as $sampleData) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sampleData['id'],
                    'sample_volume' => $sampleData['sample_volume'] ?? null,
                ]);
            }

            foreach ($data['metodeAnalisis'] as $methodData) {
                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $methodData['id'],
                    'price' => $methodData['price'],
                    'description' => $methodData['description'] ?? '-',
                ]);
            }
        });

        // (Asumsi Anda memiliki relasi 'orderSamples' and 'analysesMethodsOrder' di model Order)
        // $order->load('orderSamples', 'analysesMethodsOrder');

        return response()->json([
            'success' => true,
            'message' => 'Order berhasil dibuat!',
            'order' => $order,
        ], 201); // 201 Created
    }
}
