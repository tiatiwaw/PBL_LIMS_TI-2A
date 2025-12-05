<?php

namespace App\Services;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class ReportGeneratorService
{
    /**
     * Generate data laporan dari order
     * 
     * @param Order $order
     * @param array|null $selectedSampleIds
     * @return array
     */
    public static function generateReportData(Order $order, ?array $selectedSampleIds = null): array
    {
        $samples = $selectedSampleIds
            ? $order->samples()->whereIn('id', $selectedSampleIds)
            ->with([
                'sample_categories',
                'n_parameter_methods.test_parameters.unit_values',
                'n_parameter_methods.test_parameters.reference_standards',
            ])
            ->get()
            : $order->samples()
            ->with([
                'sample_categories',
                'n_parameter_methods.test_parameters.unit_values',
                'n_parameter_methods.test_parameters.reference_standards',
            ])
            ->get();

        if ($samples->isEmpty()) {
            return [];
        }

        return $samples->map(function ($sample) {
            // Handle n_parameter_methods - can be array or single object
            $nParams = $sample->n_parameter_methods;

            // If it's a single object, convert to array
            if ($nParams && !is_array($nParams)) {
                $nParams = [$nParams];
            }

            $parameters = [];
            if ($nParams && is_array($nParams)) {
                foreach ($nParams as $nParam) {
                    $parameters[] = [
                        'parameter_name' => $nParam->test_parameters?->name ?? '-',
                        'unit'      => $nParam->test_parameters?->unit_values?->value ?? '-',
                        'reference' => $nParam->test_methods?->reference_standards?->name ?? '-',
                        'result'    => $nParam->result ?? '-',
                        'quality'   => $nParam->test_parameters?->quality_standard ?? '-',
                    ];
                }
            }

            return [
                'sample' => $sample->name,
                'category' => $sample->sample_categories?->name ?? '-',
                'parameters' => $parameters,
            ];
        })->toArray();
    }

    /**
     * Generate dan simpan PDF laporan
     * 
     * @param Order $order
     * @param array $reportData
     * @param string|null $notes
     * @return string File path
     */
    public static function generateAndSavePdf(Order $order, array $reportData, ?string $notes = null): string
    {
        // Load related users untuk signatures
        $analyst = null;
        $supervisor = null;
        $manager = null;

        // Ambil analyst dari order (pastikan relasi sudah di-load dengan signatures)
        if ($order->analysts && $order->analysts->count() > 0) {
            $analyst = $order->analysts->first()->users;
        }

        // Ambil supervisor dari order
        if ($order->supervisors) {
            $supervisor = $order->supervisors;
        }

        // Ambil manager (bisa dari field khusus atau dari user dengan role 'manager')
        // Assuming ada relasi ke manager atau ambil dari config
        if (method_exists($order, 'manager') && $order->manager) {
            $manager = $order->manager;
        } else {
            // Fallback: ambil user pertama dengan role manager
            // $manager = \App\Models\User::where('role', 'manager')->first();
            $manager = \App\Models\User::where('role', 'manager')->first();
        }

        $pdf = Pdf::loadView('pdf.report', [
            'order' => $order,
            'data' => $reportData,
            'notes' => $notes,
            'analyst' => $analyst,
            'supervisor' => $supervisor,
            'manager' => $manager,
        ]);

        $fileName = 'report_order_' . $order->id . '_' . time() . '.pdf';
        $filePath = 'reports/' . $fileName;

        Storage::disk('public')->put($filePath, $pdf->output());

        return $filePath;
    }

    /**
     * Generate laporan lengkap dan simpan
     * 
     * @param Order $order
     * @param array|null $selectedSampleIds
     * @param string|null $notes
     * @return array
     */
    public static function generateFullReport(Order $order, ?array $selectedSampleIds = null, ?string $notes = null): array
    {
        try {
            $reportData = self::generateReportData($order, $selectedSampleIds);

            if (empty($reportData)) {
                return [
                    'success' => false,
                    'message' => 'Tidak ada data sampel untuk dibuat laporan.',
                ];
            }

            $filePath = self::generateAndSavePdf($order, $reportData, $notes);

            return [
                'success' => true,
                'message' => 'Laporan berhasil dibuat.',
                'file_path' => $filePath,
                'data' => $reportData,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Gagal membuat laporan: ' . $e->getMessage(),
            ];
        }
    }
}
