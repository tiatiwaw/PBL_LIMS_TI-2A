<?php

namespace App\Http\Controllers;

use App\Models\NParameterMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NParameterMethodController extends Controller
{
    public function index()
    {
        $nParameterMethods = NParameterMethod::all();
        return view('n_parameter_method.index', compact('nParameterMethods'));
    }

    public function create()
    {
        return view('n_parameter_method.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sample_id' => ['required', 'exists:samples,id'],
            'test_parameter_id' => ['required', 'exists:test_parameters,id'],
            'test_method_id' => ['required', 'exists:test_methods,id'],
            'result' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['failed', 'success'])],
        ]);

        try {
            NParameterMethod::create($validated);
            return redirect()->route('n_parameter_method.index')->with('success', 'Record created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create record.');
        }
    }

    public function show(NParameterMethod $nParameterMethod)
    {
        return view('n_parameter_method.show', compact('nParameterMethod'));
    }

    public function edit(NParameterMethod $nParameterMethod)
    {
        return view('n_parameter_method.edit', compact('nParameterMethod'));
    }

    public function update(Request $request, NParameterMethod $nParameterMethod)
    {
        $validated = $request->validate([
            'sample_id' => ['required', 'exists:samples,id'],
            'test_parameter_id' => ['required', 'exists:test_parameters,id'],
            'test_method_id' => ['required', 'exists:test_methods,id'],
            'result' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['failed', 'success'])],
        ]);

        try {
            $nParameterMethod->update($validated);
            return redirect()->route('n_parameter_method.index')->with('success', 'Record updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update record.');
        }
    }

    public function destroy(NParameterMethod $nParameterMethod)
    {
        try {
            $nParameterMethod->delete();
            return redirect()->route('n_parameter_method.index')->with('success', 'Record deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete record.');
        }
    }
}
