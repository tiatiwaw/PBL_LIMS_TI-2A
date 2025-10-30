<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TrainingController extends Controller
{
    public function index()
    {
        $trainings = Training::all();
        return view('training.index', compact('trainings'));
    }

    public function create()
    {
        return view('training.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'result' => ['required', 'string', 'max:255'],
        ]);

        try {
            Training::create($validated);
            return redirect()->route('training.index')->with('success', 'Training created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Training.');
        }
    }

    public function show(Training $training)
    {
        return view('training.show', compact('training'));
    }

    public function edit(Training $training)
    {
        return view('training.edit', compact('training'));
    }

    public function update(Request $request, Training $training)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'provider' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'result' => ['required', 'string', 'max:255'],
        ]);

        try {
            $training->update($validated);
            return redirect()->route('training.index')->with('success', 'Training updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Training.');
        }
    }

    public function destroy(Training $training)
    {
        try {
            $training->delete();
            return redirect()->route('training.index')->with('success', 'Training deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Training.');
        }
    }
}
