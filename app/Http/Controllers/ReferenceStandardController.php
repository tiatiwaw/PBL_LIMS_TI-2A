<?php

namespace App\Http\Controllers;

use App\Models\ReferenceStandard;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReferenceStandardController extends Controller
{
    public function index()
    {
        $referenceStandards = ReferenceStandard::all();
        return view('reference_standard.index', compact('referenceStandards'));
    }

    public function create()
    {
        return view('reference_standard.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            ReferenceStandard::create($validated);
            return redirect()->route('reference_standard.index')->with('success', 'Reference standard created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Reference standard.');
        }
    }

    public function show(ReferenceStandard $referenceStandard)
    {
        return view('reference_standard.show', compact('referenceStandard'));
    }

    public function edit(ReferenceStandard $referenceStandard)
    {
        return view('reference_standard.edit', compact('referenceStandard'));
    }

    public function update(Request $request, ReferenceStandard $referenceStandard)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $referenceStandard->update($validated);
            return redirect()->route('reference_standard.index')->with('success', 'Reference standard updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Reference standard.');
        }
    }

    public function destroy(ReferenceStandard $referenceStandard)
    {
        try {
            $referenceStandard->delete();
            return redirect()->route('reference_standard.index')->with('success', 'Reference standard deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Reference standard.');
        }
    }
}
