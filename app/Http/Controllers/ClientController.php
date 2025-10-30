<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return view('client.index', compact('clients'));
    }

    public function create()
    {
        return view('client.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:clients,email'],
            'phone_number' => ['required', 'string', 'max:255'],
            'npwp_number' => ['required', 'string', 'max:255'],
        ]);

        try {
            $client = new Client();
            $client->user_id = $validated['user_id'];
            $client->name = $validated['name'];
            $client->address = $validated['address'];
            $client->email = $validated['email'];
            $client->phone_number = $validated['phone_number'];
            $client->npwp_number = $validated['npwp_number'];
            $client->save();

            return redirect()->route('client.index')->with('success', 'Client created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Client.');
        }
    }

    public function show(Client $client)
    {
        return view('client.show', compact('client'));
    }

    public function edit(Client $client)
    {
        return view('client.edit', compact('client'));
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('clients', 'email')->ignore($client->id)],
            'phone_number' => ['required', 'string', 'max:255'],
            'npwp_number' => ['required', 'string', 'max:255'],
        ]);

        try {
            $client->user_id = $validated['user_id'];
            $client->name = $validated['name'];
            $client->address = $validated['address'];
            $client->email = $validated['email'];
            $client->phone_number = $validated['phone_number'];
            $client->npwp_number = $validated['npwp_number'];
            $client->save();

            return redirect()->route('client.index')->with('success', 'Client updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Client.');
        }
    }

    public function destroy(Client $client)
    {
        try {
            $client->delete();
            return redirect()->route('client.index')->with('success', 'Client deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Client.');
        }
    }
}
