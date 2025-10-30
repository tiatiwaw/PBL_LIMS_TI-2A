<?php

namespace App\Http\Controllers;

use App\Models\TestMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TestMethodController extends Controller
{
    public function index()
    {
        $testMethods = TestMethod::all();
        return view('test_method.index', compact('testMethods'));
    }

    public function create()
    {
        return view('test_method.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'applicable_parameter' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:0'],
            'validity_period' => ['required', 'date'],
        ]);

        try {
            TestMethod::create($validated);
            return redirect()->route('test_method.index')->with('success', 'Test method created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Test method.');
        }
    }

    public function show(TestMethod $testMethod)
    {
        return view('test_method.show', compact('testMethod'));
    }

    public function edit(TestMethod $testMethod)
    {
        return view('test_method.edit', compact('testMethod'));
    }

    public function update(Request $request, TestMethod $testMethod)
    {
        $validated = $request->validate([
            'reference_id' => ['required', 'exists:reference_standards,id'],
            'name' => ['required', 'string', 'max:255'],
            'applicable_parameter' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:0'],
            'validity_period' => ['required', 'date'],
        ]);

        try {
            $testMethod->update($validated);
            return redirect()->route('test_method.index')->with('success', 'Test method updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Test method.');
        }
    }

    public function destroy(TestMethod $testMethod)
    {
        try {
            $testMethod->delete();
            return redirect()->route('test_method.index')->with('success', 'Test method deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Test method.');
        }
    }
}
