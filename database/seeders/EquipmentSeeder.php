<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipment;
use App\Models\BrandType;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil beberapa ID brand yang valid
        $eppendorf = BrandType::where('name', 'Eppendorf')->firstOrCreate(['name' => 'Eppendorf']);
        $thermo = BrandType::where('name', 'Thermo Fisher Scientific')->firstOrCreate(['name' => 'Thermo Fisher Scientific']);
        $hanna = BrandType::firstOrCreate(['name' => 'Hanna HI2211']);
        $shimadzu = BrandType::where('name', 'Shimadzu')->firstOrCreate(['name' => 'Shimadzu']);

        $status_values = ['unavailable', 'available', 'maintenance', 'broken'];
        $calibration_values = ['internal', 'eksternal'];

        $equipments = [
            [
                'name' => 'Micropipette',
                'brand_type_id' => $eppendorf->id,
                'serial_number' => 'EPD-001',
                'purchase_year' => '2022-01-15',
                'calibration_schedule' => $calibration_values[array_rand($calibration_values)],
               
                'status' => $status_values[array_rand($status_values)], // <-- FIX: Baik (B)
                'location' => 'Laboratorium Kimia',
            ],
            [
                'name' => 'Centrifuge',
                'brand_type_id' => $thermo->id,
                'serial_number' => 'THM-045',
                'purchase_year' => '2021-07-10',
                'calibration_schedule' => $calibration_values[array_rand($calibration_values)],
                
                'status' => $status_values[array_rand($status_values)], // <-- FIX: Perbaikan (P)
                'location' => 'Laboratorium Bioteknologi',
            ],
            [
                'name' => 'pH Meter',
                'brand_type_id' => $hanna->id,
                'serial_number' => 'HAN-123',
                'purchase_year' => '2023-03-05',
                'calibration_schedule' => $calibration_values[array_rand($calibration_values)],
               
                'status' => $status_values[array_rand($status_values)], // <-- FIX: Rusak (R)
                'location' => 'Laboratorium Mikrobiologi',
            ],
            [
                'name' => 'Spectrophotometer',
                'brand_type_id' => $shimadzu->id,
                'serial_number' => 'SHM-789',
                'purchase_year' => '2020-11-20',
                'calibration_schedule' => $calibration_values[array_rand($calibration_values)],
                
                'status' => $status_values[array_rand($status_values)], // <-- FIX: Rusak (R)
                'location' => 'Laboratorium Analisis',
            ],
        ];

        foreach ($equipments as $eq) {
             Equipment::firstOrCreate(['serial_number' => $eq['serial_number']], $eq);
        }
    }
}