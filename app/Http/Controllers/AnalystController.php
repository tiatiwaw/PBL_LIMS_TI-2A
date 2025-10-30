<?php

namespace App\Http\Controllers;

use App\Models\Analyst;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AnalystController extends Controller
{
    public function index()
    {
        $analysts = Analyst::all();
        return view('analyst.index', compact('analysts'));
    }

    public function create()
    {
        return view('analyst.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'specialist' => ['required', 'string', 'max:255'],
        ]);

        try {
            Analyst::create($validated);
            return redirect()->route('analyst.index')->with('success', 'Analyst created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Analyst.');
        }
    }

    public function show(Analyst $analyst)
    {
        return view('analyst.show', compact('analyst'));
    }

    public function edit(Analyst $analyst)
    {
        return view('analyst.edit', compact('analyst'));
    }

    public function update(Request $request, Analyst $analyst)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'specialist' => ['required', 'string', 'max:255'],
        ]);

        try {
            $analyst->update($validated);
            return redirect()->route('analyst.index')->with('success', 'Analyst updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Analyst.');
        }
    }

    public function destroy(Analyst $analyst)
    {
        try {
            $analyst->delete();
            return redirect()->route('analyst.index')->with('success', 'Analyst deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Analyst.');
        }
    }
}
