<?php

namespace Database\Seeders;

use App\Models\Analyst;
use Illuminate\Support\Carbon;
use App\Models\Certificate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua analyst
        $analysts = Analyst::all();

        foreach ($analysts as $analyst) {
            Certificate::create([
                'analyst_id'   => $analyst->id,
                'name'         => 'Sertifikat Kompetensi ' . $analyst->name,
                'issued_date'  => Carbon::now()->subYear(),
                'expired_date' => Carbon::now()->addYear(),
                'file_path'    => 'certificates/' . $analyst->id . '_sertifikat.pdf',
            ]);

            Certificate::create([
                'analyst_id'   => $analyst->id,
                'name'         => 'Sertifikat Keahlian Laboratorium ' . $analyst->name,
                'issued_date'  => Carbon::now()->subMonths(8),
                'expired_date' => Carbon::now()->addMonths(16),
                'file_path'    => 'certificates/' . $analyst->id . '_lab.pdf',
            ]);
        }
    }
}
