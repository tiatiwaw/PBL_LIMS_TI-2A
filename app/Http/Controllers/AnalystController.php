<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Sample;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\NParameterMethod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AnalystController extends Controller
{
    // -------------------- WEB VERSION --------------------
    // Show
    public function index()
    {
        return redirect()->route('analyst.dashboard');
    }

    public function user() {
        $user = auth()->user()->analysts;
        return $user;
    }
    
    public function dashboard() {
        $analyst = $this->user();
        $order = Order::where('status', 'pending')
        ->whereHas('analysts', function ($query) use ($analyst) {
            $query->where('analysts.id', $analyst->id);
        })
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get();
        
        $stats = [
            'totalOrder' => Order::count(),
            'processedOrder' => Order::where('status', 'in_progress')->count(),
            'completedOrder' => Order::where('status', 'completed')->count(),
        ];
        
        return Inertia::render('analyst/dashboard', [
            'orders' => $order,
            'stats' => $stats,
        ]);
    }

    public function profile() {
        return Inertia::render('analyst/profile');
    }
    
    public function order() {
        $order = Order::whereHas('analysts', function ($query) {
            $query->where('analysts.id', $this->user()->id);
        })->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('analyst/order', [
            'orders' => $order
        ]);
    }

    public function detail(Order $order)
    {
        $order = Order::with([
            'samples',
            'samples.sample_categories',
            'samples.parameter.unit_values',
        ])->find($order->id);

        return Inertia::render('analyst/order-detail', [
            'order' => $order,
            'samples' => $order->samples,
        ]);
    }

    public function accept(Order $order)
    {
        if ($order->status === 'pending') {
            $order->update(['status' => 'in_progress']);
        }

        return redirect()->route('analyst.order.detail', $order->id);
    }
    
    // Status Sample Uji
    public function confirm(Sample $sample)
    {
        $sample->update(['status' => 'Done']);
        return back()->with('success', 'Sampel telah dikonfirmasi selesai.');
    }

    public function unconfirm(Sample $sample)
    {
        $sample->update(['status' => 'In Progress']);
        return back()->with('success', 'Sampel dibatalkan statusnya.');
    }
    // Reports
    public function saveReport(Request $request, $orderId)
    {   
        $request->validate([
            'results' => 'required|array',
        ]);
        
        foreach ($request->results as $result) {
            NParameterMethod::where('sample_id', $result['sample_id'])
                ->where('test_parameter_id', $result['parameter']['id'])
                ->update(['result' => $result['result']]);

                
            $allDone = NParameterMethod::where('sample_id', $result['sample_id'])
                ->whereNotNull('result')
                ->count();
                
            $totalParams = NParameterMethod::where('sample_id', $result['sample_id'])->count();

            $sample = Sample::findOrFail($result['sample_id']);

            if ($allDone == $totalParams) {
                $sample->status = 'done';
                $sample->save();
            } else {
                $sample->status = 'in_progress';
                $sample->save();
            }
            
        }

        return back()->with('success', 'Hasil uji berhasil disimpan.');
    }


    public function submitReport($orderId)
    {
        $order = Order::findOrFail($orderId);

        $samples = $order->samples()->with([
            'parameter.unit_values',
            'parameter.reference_standards',
        ])->get();

        if ($samples->isEmpty()) {
            return back()->with('error', 'Tidak ada sampel untuk dibuatkan laporan.');
        }

        $data = $samples->map(function ($sample) {
            return [
                'sample' => $sample->name,
                'parameters' => $sample->parameter->map(function ($param) {
                    return [
                        'parameter_name' => $param->name ?? '-',
                        'unit' => $param->unit_values->value ?? '-',
                        'reference' => $param->reference_standards->name ?? '-',
                        'result' => $param->pivot->result ?? '-',
                    ];
                })->toArray(),
            ];
        })->toArray();

    
        // Generate PDF
        $pdf = Pdf::loadView('pdf.report', [
            'order' => $order,
            'data' => $data,
        ]);

        // Simpan ke storage
        $fileName = 'report_order_' . $order->id . '.pdf';
        $filePath = 'reports/' . $fileName;
        Storage::disk('public')->put($filePath, $pdf->output());

        // Update path ke tabel orders.result_value
        $order->update(['result_value' => $filePath]);

        return back()->with('success', 'Report berhasil dibuat dan disimpan.');
    }


   public function downloadReport($orderId)
    {
        $order = \App\Models\Order::findOrFail($orderId);

        if (!$order->result_value) {
            return back()->with('error', 'File report belum tersedia.');
        }
        $relativePath = $order->result_value; 
        $storagePath = Storage::disk('public')->path($relativePath);

        if (!file_exists($storagePath)) {
            return back()->with('error', 'File report tidak ditemukan di server.');
        }

        return response()->download($storagePath, basename($storagePath), [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
