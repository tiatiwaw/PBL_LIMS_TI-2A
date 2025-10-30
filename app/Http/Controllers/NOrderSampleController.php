<?php

namespace App\Http\Controllers;

use App\Models\NOrderSample;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NOrderSampleController extends Controller
{
    public function index()
    {
        $nOrderSamples = NOrderSample::all();
        return view('n_order_sample.index', compact('nOrderSamples'));
    }

    public function create()
    {
        return view('n_order_sample.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'sample_id' => ['required', 'exists:samples,id'],
            'sample_volume' => ['required', 'string', 'max:255'],
        ]);

        try {
            $record = new NOrderSample();
            $record->order_id = $validated['order_id'];
            $record->sample_id = $validated['sample_id'];
            $record->sample_volume = $validated['sample_volume'];
            $record->save();

            return redirect()->route('n_order_sample.index')->with('success', 'Record created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create record.');
        }
    }

    public function show(NOrderSample $nOrderSample)
    {
        return view('n_order_sample.show', compact('nOrderSample'));
    }

    public function edit(NOrderSample $nOrderSample)
    {
        return view('n_order_sample.edit', compact('nOrderSample'));
    }

    public function update(Request $request, NOrderSample $nOrderSample)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'sample_id' => ['required', 'exists:samples,id'],
            'sample_volume' => ['required', 'string', 'max:255'],
        ]);

        try {
            $nOrderSample->order_id = $validated['order_id'];
            $nOrderSample->sample_id = $validated['sample_id'];
            $nOrderSample->sample_volume = $validated['sample_volume'];
            $nOrderSample->save();

            return redirect()->route('n_order_sample.index')->with('success', 'Record updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update record.');
        }
    }

    public function destroy(NOrderSample $nOrderSample)
    {
        try {
            $nOrderSample->delete();
            return redirect()->route('n_order_sample.index')->with('success', 'Record deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete record.');
        }
    }
}
