<?php

namespace App\Http\Controllers;

use App\Models\UnitValue;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UnitValueController extends Controller
{
    public function index()
    {
        $unitValues = UnitValue::all();
        return view('unit_value.index', compact('unitValues'));
    }

    public function create()
    {
        return view('unit_value.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => ['required', 'string', 'max:255'],
        ]);

        try {
            UnitValue::create($validated);
            return redirect()->route('unit_value.index')->with('success', 'Unit value created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Unit value.');
        }
    }

    public function show(UnitValue $unitValue)
    {
        return view('unit_value.show', compact('unitValue'));
    }

    public function edit(UnitValue $unitValue)
    {
        return view('unit_value.edit', compact('unitValue'));
    }

    public function update(Request $request, UnitValue $unitValue)
    {
        $validated = $request->validate([
            'value' => ['required', 'string', 'max:255'],
        ]);

        try {
            $unitValue->update($validated);
            return redirect()->route('unit_value.index')->with('success', 'Unit value updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Unit value.');
        }
    }

    public function destroy(UnitValue $unitValue)
    {
        try {
            $unitValue->delete();
            return redirect()->route('unit_value.index')->with('success', 'Unit value deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Unit value.');
        }
    }
}
