<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TrainingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('trainings')->insert([
            [
                'name'       => 'Pelatihan Analisis Kimia Dasar',
                'provider'   => 'Balai Besar Laboratorium Industri',
                'date'       => Carbon::parse('2024-02-15'),
                'result'     => 'Lulus dengan predikat sangat baik',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Workshop Mikrobiologi Lanjut',
                'provider'   => 'Lembaga Sertifikasi Profesi Laboratorium',
                'date'       => Carbon::parse('2023-09-05'),
                'result'     => 'Lulus',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Pelatihan Manajemen Mutu Laboratorium',
                'provider'   => 'Kementerian Perindustrian RI',
                'date'       => Carbon::parse('2024-05-10'),
                'result'     => 'Lulus dengan nilai 89/100',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
