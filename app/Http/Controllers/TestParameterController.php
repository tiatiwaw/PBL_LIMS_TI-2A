<?php

namespace App\Http\Controllers;

use App\Models\TestParameter;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TestParameterController extends Controller
{
    public function index()
    {
        $testParameters = TestParameter::all();
        return view('test_parameter.index', compact('testParameters'));
    }

    public function create()
    {
        return view('test_parameter.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_value_id' => ['required', 'exists:unit_values,id'],
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(['kimia', 'mikrobiologi', 'fisika', 'klinik'])],
            'detection_limit' => ['required', Rule::in(['LOD', 'LOQ'])],
            'quality_standard' => ['required', 'string', 'max:255'],
        ]);

        try {
            TestParameter::create($validated);
            return redirect()->route('test_parameter.index')->with('success', 'Test parameter created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Test parameter.');
        }
    }

    public function show(TestParameter $testParameter)
    {
        return view('test_parameter.show', compact('testParameter'));
    }

    public function edit(TestParameter $testParameter)
    {
        return view('test_parameter.edit', compact('testParameter'));
    }

    public function update(Request $request, TestParameter $testParameter)
    {
        $validated = $request->validate([
            'unit_value_id' => ['required', 'exists:unit_values,id'],
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(['kimia', 'mikrobiologi', 'fisika', 'klinik'])],
            'detection_limit' => ['required', Rule::in(['LOD', 'LOQ'])],
            'quality_standard' => ['required', 'string', 'max:255'],
        ]);

        try {
            $testParameter->update($validated);
            return redirect()->route('test_parameter.index')->with('success', 'Test parameter updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Test parameter.');
        }
    }

    public function destroy(TestParameter $testParameter)
    {
        try {
            $testParameter->delete();
            return redirect()->route('test_parameter.index')->with('success', 'Test parameter deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Test parameter.');
        }
    }
}
