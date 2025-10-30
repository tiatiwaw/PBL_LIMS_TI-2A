<?php

namespace App\Http\Controllers;

use App\Models\BrandType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BrandTypeController extends Controller
{
    public function index()
    {
        $brandTypes = BrandType::all();
        return view('brand_type.index', compact('brandTypes'));
    }

    public function create()
    {
        return view('brand_type.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            BrandType::create($validated);
            return redirect()->route('brand_type.index')->with('success', 'Brand type created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Brand type.');
        }
    }

    public function show(BrandType $brandType)
    {
        return view('brand_type.show', compact('brandType'));
    }

    public function edit(BrandType $brandType)
    {
        return view('brand_type.edit', compact('brandType'));
    }

    public function update(Request $request, BrandType $brandType)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $brandType->update($validated);
            return redirect()->route('brand_type.index')->with('success', 'Brand type updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Brand type.');
        }
    }

    public function destroy(BrandType $brandType)
    {
        try {
            $brandType->delete();
            return redirect()->route('brand_type.index')->with('success', 'Brand type deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Brand type.');
        }
    }
}
