<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipment;
use App\Models\BrandType;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            'Eppendorf' => BrandType::firstOrCreate(['name' => 'Eppendorf']),
            'Thermo Fisher Scientific' => BrandType::firstOrCreate(['name' => 'Thermo Fisher Scientific']),
            'Hanna' => BrandType::firstOrCreate(['name' => 'Hanna']),
            'Shimadzu' => BrandType::firstOrCreate(['name' => 'Shimadzu']),
            'Metrohm' => BrandType::firstOrCreate(['name' => 'Metrohm']),
            'Sherwood' => BrandType::firstOrCreate(['name' => 'Sherwood']),
            'Bio-Rad' => BrandType::firstOrCreate(['name' => 'Bio-Rad']),
        ];

        $statuses = ['available', 'unavailable', 'maintenance', 'broken'];
        $calibrations = ['internal', 'external'];

        $equipments = [
            ['name' => 'Micropipette 10-100µL', 'brand' => 'Eppendorf', 'serial' => 'EPD-001', 'location' => 'Laboratorium Kimia'],
            ['name' => 'Centrifuge HC-400', 'brand' => 'Thermo Fisher Scientific', 'serial' => 'THM-045', 'location' => 'Laboratorium Bioteknologi'],
            ['name' => 'pH Meter Digital', 'brand' => 'Hanna', 'serial' => 'HAN-123', 'location' => 'Laboratorium Mikrobiologi'],
            ['name' => 'UV-Vis Spectrophotometer', 'brand' => 'Shimadzu', 'serial' => 'SHZ-789', 'location' => 'Laboratorium Analitik'],
            ['name' => 'HPLC System', 'brand' => 'Shimadzu', 'serial' => 'SHZ-102', 'location' => 'Laboratorium Analitik'],
            ['name' => 'Autoclave 50L', 'brand' => 'Thermo Fisher Scientific', 'serial' => 'THM-234', 'location' => 'Laboratorium Mikrobiologi'],
            ['name' => 'Incubator 37°C', 'brand' => 'Eppendorf', 'serial' => 'EPD-456', 'location' => 'Laboratorium Bioteknologi'],
            ['name' => 'Vortex Mixer', 'brand' => 'Eppendorf', 'serial' => 'EPD-567', 'location' => 'Laboratorium Kimia'],
            ['name' => 'Micro Balance 0.1mg', 'brand' => 'Metrohm', 'serial' => 'MET-111', 'location' => 'Laboratorium Analitik'],
            ['name' => 'Ion Chromatograph', 'brand' => 'Metrohm', 'serial' => 'MET-222', 'location' => 'Laboratorium Analitik'],
            ['name' => 'Flame Photometer', 'brand' => 'Sherwood', 'serial' => 'SHW-001', 'location' => 'Laboratorium Kimia'],
            // ['name' => 'Gas Chromatograph', 'brand' => 'Shimadzu', 'serial' => 'SHZ-330', 'location' => 'Laboratorium Kimia'],
            // ['name' => 'Laminar Flow Cabinet', 'brand' => 'Thermo Fisher Scientific', 'serial' => 'THM-445', 'location' => 'Laboratorium Mikrobiologi'],
            // ['name' => 'PCR Machine 96-well', 'brand' => 'Eppendorf', 'serial' => 'EPD-678', 'location' => 'Laboratorium Bioteknologi'],
            // ['name' => 'Gel Electrophoresis System', 'brand' => 'Bio-Rad', 'serial' => 'BIO-001', 'location' => 'Laboratorium Bioteknologi'],
            // ['name' => 'Water Distiller', 'brand' => 'Thermo Fisher Scientific', 'serial' => 'THM-556', 'location' => 'Laboratorium Kimia'],
            // ['name' => 'Conductivity Meter', 'brand' => 'Hanna', 'serial' => 'HAN-234', 'location' => 'Laboratorium Analitik'],
            // ['name' => 'Dissolved Oxygen Meter', 'brand' => 'Hanna', 'serial' => 'HAN-345', 'location' => 'Laboratorium QC'],
            // ['name' => 'Temperature Controller', 'brand' => 'Eppendorf', 'serial' => 'EPD-789', 'location' => 'Laboratorium Kimia'],
            // ['name' => 'Sample Freezer -80°C', 'brand' => 'Thermo Fisher Scientific', 'serial' => 'THM-667', 'location' => 'Laboratorium QC'],
        ];

        foreach ($equipments as $equipment) {
            Equipment::create([
                'name' => $equipment['name'],
                'brand_type_id' => $brands[$equipment['brand']]->id,
                'serial_number' => $equipment['serial'],
                'purchase_year' => now()->subYears(rand(1, 5))->format('Y-m-d'),
                'calibration_schedule' => $calibrations[array_rand($calibrations)],
                'status' => $statuses[array_rand($statuses)],
                'location' => $equipment['location'],
            ]);
        }

        $this->command->info('✅ 20 Equipment berhasil ditambahkan!');
    }
}