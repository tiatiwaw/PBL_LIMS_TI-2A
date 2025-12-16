<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reagent;
use App\Models\Supplier;
use App\Models\Grade;
use App\Models\UnitValue;

class ReagentSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel reagents.
     */
    public function run(): void
    {
        // Pastikan supplier & grade sudah ada
        $suppliers = Supplier::all();
        $grades = Grade::all();
        $units = UnitValue::all();

        if ($suppliers->isEmpty() || $grades->isEmpty() || $units->isEmpty()) {
            $this->command->warn('⚠️ Jalankan SupplierSeeder, GradeSeeder, dan UnitValueSeeder terlebih dahulu!');
            return;
        }

        // 20 Reagents untuk berbagai keperluan analisis
        $reagents = [
            // Asam & Basa (6)
            ['name' => 'Asam Sulfat', 'formula' => 'H2SO4', 'batch' => 'AS-2024-01', 'stock' => 120, 'location' => 'Rak A1'],
            ['name' => 'Asam Klorida', 'formula' => 'HCl', 'batch' => 'AK-2024-02', 'stock' => 100, 'location' => 'Rak A2'],
            ['name' => 'Asam Nitrat', 'formula' => 'HNO3', 'batch' => 'AN-2024-03', 'stock' => 80, 'location' => 'Rak A3'],
            // ['name' => 'Natrium Hidroksida', 'formula' => 'NaOH', 'batch' => 'NH-2024-04', 'stock' => 110, 'location' => 'Rak B1'],
            // ['name' => 'Kalium Hidroksida', 'formula' => 'KOH', 'batch' => 'KH-2024-05', 'stock' => 70, 'location' => 'Rak B2'],
            // ['name' => 'Amoniak Pekat', 'formula' => 'NH3', 'batch' => 'AM-2024-06', 'stock' => 60, 'location' => 'Rak B3'],

            // Garam & Elektrolit (4)
            ['name' => 'Natrium Klorida', 'formula' => 'NaCl', 'batch' => 'NK-2024-07', 'stock' => 200, 'location' => 'Rak C1'],
            ['name' => 'Kalium Klorida', 'formula' => 'KCl', 'batch' => 'KK-2024-08', 'stock' => 150, 'location' => 'Rak C2'],
            ['name' => 'Natrium Sulfit', 'formula' => 'Na2SO3', 'batch' => 'NS-2024-09', 'stock' => 90, 'location' => 'Rak C3'],
            // ['name' => 'Kalium Permanganat', 'formula' => 'KMnO4', 'batch' => 'KP-2024-10', 'stock' => 50, 'location' => 'Rak D1'],

            // Pelarut & Organic (5)
            ['name' => 'Etanol 96%', 'formula' => 'C2H5OH', 'batch' => 'ET-2024-11', 'stock' => 100, 'location' => 'Lemari Kimia 1'],
            ['name' => 'Aseton', 'formula' => 'C3H6O', 'batch' => 'AC-2024-12', 'stock' => 80, 'location' => 'Lemari Kimia 2'],
            // ['name' => 'Benzena', 'formula' => 'C6H6', 'batch' => 'BZ-2024-13', 'stock' => 40, 'location' => 'Lemari Pelarut 1'],
            // ['name' => 'Heksana', 'formula' => 'C6H14', 'batch' => 'HX-2024-14', 'stock' => 60, 'location' => 'Lemari Pelarut 2'],
            // ['name' => 'Diklorometana', 'formula' => 'CH2Cl2', 'batch' => 'DM-2024-15', 'stock' => 45, 'location' => 'Lemari Pelarut 3'],

            // Indikator & Kompleks (5)
            ['name' => 'Indikator Metil Orange', 'formula' => 'C14H14N3NaO3S', 'batch' => 'MO-2024-16', 'stock' => 10, 'location' => 'Rak E1'],
            ['name' => 'Indikator Phenolphthalein', 'formula' => 'C20H14O4', 'batch' => 'PP-2024-17', 'stock' => 15, 'location' => 'Rak E2'],
            // ['name' => 'EDTA Dinatrium', 'formula' => 'C10H14N2Na2O8', 'batch' => 'ED-2024-18', 'stock' => 75, 'location' => 'Rak E3'],
            // ['name' => 'Kalium Dikromat', 'formula' => 'K2Cr2O7', 'batch' => 'KD-2024-19', 'stock' => 55, 'location' => 'Rak E4'],
            // ['name' => 'Kalium Ferrisianida', 'formula' => 'K3[Fe(CN)6]', 'batch' => 'KF-2024-20', 'stock' => 30, 'location' => 'Rak E5'],
        ];

        foreach ($reagents as $data) {
            Reagent::create([
                'name' => $data['name'],
                'formula' => $data['formula'],
                'batch_number' => $data['batch'],
                'stock' => $data['stock'],
                'storage_location' => $data['location'],
                'supplier_id' => $suppliers->random()->id,
                'grade_id' => $grades->random()->id,
                'unit_value_id' => $units->random()->id
            ]);
        }

        $this->command->info('✅ 20 Reagent berhasil ditambahkan!');
    }
}
