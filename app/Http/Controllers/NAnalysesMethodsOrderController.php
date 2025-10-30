<?php

namespace App\Http\Controllers;

use App\Models\NAnalysesMethodsOrder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NAnalysesMethodsOrderController extends Controller
{
    public function index()
    {
        $nAnalysesMethodsOrders = NAnalysesMethodsOrder::all();
        return view('n_analyses_methods_order.index', compact('nAnalysesMethodsOrders'));
    }

    public function create()
    {
        return view('n_analyses_methods_order.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'analyses_method_id' => ['required', 'exists:analyses_methods,id'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $record = new NAnalysesMethodsOrder();
            $record->order_id = $validated['order_id'];
            $record->analyses_method_id = $validated['analyses_method_id'];
            $record->description = $validated['description'];
            $record->price = $validated['price'];
            $record->save();

            return redirect()->route('n_analyses_methods_order.index')->with('success', 'Record created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create record.');
        }
    }

    public function show(NAnalysesMethodsOrder $nAnalysesMethodsOrder)
    {
        return view('n_analyses_methods_order.show', compact('nAnalysesMethodsOrder'));
    }

    public function edit(NAnalysesMethodsOrder $nAnalysesMethodsOrder)
    {
        return view('n_analyses_methods_order.edit', compact('nAnalysesMethodsOrder'));
    }

    public function update(Request $request, NAnalysesMethodsOrder $nAnalysesMethodsOrder)
    {
        $validated = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'analyses_method_id' => ['required', 'exists:analyses_methods,id'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        try {
            $nAnalysesMethodsOrder->order_id = $validated['order_id'];
            $nAnalysesMethodsOrder->analyses_method_id = $validated['analyses_method_id'];
            $nAnalysesMethodsOrder->description = $validated['description'];
            $nAnalysesMethodsOrder->price = $validated['price'];
            $nAnalysesMethodsOrder->save();

            return redirect()->route('n_analyses_methods_order.index')->with('success', 'Record updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update record.');
        }
    }

    public function destroy(NAnalysesMethodsOrder $nAnalysesMethodsOrder)
    {
        try {
            $nAnalysesMethodsOrder->delete();
            return redirect()->route('n_analyses_methods_order.index')->with('success', 'Record deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete record.');
        }
    }
}
