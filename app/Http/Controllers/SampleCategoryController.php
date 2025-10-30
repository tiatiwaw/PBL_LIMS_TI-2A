<?php

namespace App\Http\Controllers;

use App\Models\SampleCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SampleCategoryController extends Controller
{
    public function index()
    {
        $sampleCategories = SampleCategory::all();
        return view('sample_category.index', compact('sampleCategories'));
    }

    public function create()
    {
        return view('sample_category.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            SampleCategory::create($validated);
            return redirect()->route('sample_category.index')->with('success', 'Sample category created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Sample category.');
        }
    }

    public function show(SampleCategory $sampleCategory)
    {
        return view('sample_category.show', compact('sampleCategory'));
    }

    public function edit(SampleCategory $sampleCategory)
    {
        return view('sample_category.edit', compact('sampleCategory'));
    }

    public function update(Request $request, SampleCategory $sampleCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $sampleCategory->update($validated);
            return redirect()->route('sample_category.index')->with('success', 'Sample category updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Sample category.');
        }
    }

    public function destroy(SampleCategory $sampleCategory)
    {
        try {
            $sampleCategory->delete();
            return redirect()->route('sample_category.index')->with('success', 'Sample category deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Sample category.');
        }
    }
}
