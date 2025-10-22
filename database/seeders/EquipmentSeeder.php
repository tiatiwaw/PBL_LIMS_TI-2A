<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('equipments')->insert([
            [
                'name' => 'Micropipette',
                'brand_type' => 'Eppendorf Research Plus',
                'serial_number' => 'EPD-001',
                'purchase_year' => '2022-01-15',
                'calibration_schedule' => 'internal',
                'status' => 'active',
                'location' => 'Laboratorium Kimia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Centrifuge',
                'brand_type' => 'Thermo Scientific SL16',
                'serial_number' => 'THM-045',
                'purchase_year' => '2021-07-10',
                'calibration_schedule' => 'eksternal',
                'status' => 'maintenance',
                'location' => 'Laboratorium Bioteknologi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'pH Meter',
                'brand_type' => 'Hanna HI2211',
                'serial_number' => 'HAN-123',
                'purchase_year' => '2023-03-05',
                'calibration_schedule' => 'internal',
                'status' => 'active',
                'location' => 'Laboratorium Mikrobiologi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Spectrophotometer',
                'brand_type' => 'Shimadzu UV-1800',
                'serial_number' => 'SHM-789',
                'purchase_year' => '2020-11-20',
                'calibration_schedule' => 'eksternal',
                'status' => 'broken',
                'location' => 'Laboratorium Analisis',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
