<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GradeController extends Controller
{
    public function index()
    {
        $grades = Grade::all();
        return view('grade.index', compact('grades'));
    }

    public function create()
    {
        return view('grade.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            Grade::create($validated);
            return redirect()->route('grade.index')->with('success', 'Grade created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Grade.');
        }
    }

    public function show(Grade $grade)
    {
        return view('grade.show', compact('grade'));
    }

    public function edit(Grade $grade)
    {
        return view('grade.edit', compact('grade'));
    }

    public function update(Request $request, Grade $grade)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        try {
            $grade->update($validated);
            return redirect()->route('grade.index')->with('success', 'Grade updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Grade.');
        }
    }

    public function destroy(Grade $grade)
    {
        try {
            $grade->delete();
            return redirect()->route('grade.index')->with('success', 'Grade deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Grade.');
        }
    }
}
