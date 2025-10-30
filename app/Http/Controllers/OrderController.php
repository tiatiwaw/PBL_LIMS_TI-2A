<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return view('order.index', compact('orders'));
    }

    public function create()
    {
        return view('order.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => ['required', 'exists:clients,id'],
            'order_number' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'result_value' => ['nullable', 'string', 'max:255'],
            'order_date' => ['required', 'date'],
            'estimate_date' => ['nullable', 'date'],
            'report_issued_at' => ['nullable', 'date'],
            'report_file_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:255'],
            'order_type' => ['required', Rule::in(['internal', 'regular', 'external', 'urgent'])],
            'status' => ['required', Rule::in(['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed'])],
        ]);

        try {
            Order::create($validated);
            return redirect()->route('order.index')->with('success', 'Order created successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to create Order.');
        }
    }

    public function show(Order $order)
    {
        return view('order.show', compact('order'));
    }

    public function edit(Order $order)
    {
        return view('order.edit', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'client_id' => ['required', 'exists:clients,id'],
            'order_number' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'result_value' => ['nullable', 'string', 'max:255'],
            'order_date' => ['required', 'date'],
            'estimate_date' => ['nullable', 'date'],
            'report_issued_at' => ['nullable', 'date'],
            'report_file_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:255'],
            'order_type' => ['required', Rule::in(['internal', 'regular', 'external', 'urgent'])],
            'status' => ['required', Rule::in(['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed'])],
        ]);

        try {
            $order->update($validated);
            return redirect()->route('order.index')->with('success', 'Order updated successfully.');
        } catch (\Throwable $e) {
            return back()->withInput()->with('error', 'Failed to update Order.');
        }
    }

    public function destroy(Order $order)
    {
        try {
            $order->delete();
            return redirect()->route('order.index')->with('success', 'Order deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete Order.');
        }
    }
}
