<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unit_Value;

class UnitValueSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel unit_values.
     */
    public function run(): void
    {
        $units = [
            ['name' => 'mg/L'],        // miligram per liter
            ['name' => 'µg/L'],        // mikrogram per liter
            ['name' => 'ppm'],         // parts per million
            ['name' => 'ppb'],         // parts per billion
            ['name' => 'CFU/mL'],      // colony forming units per milliliter
            ['name' => '%'],           // persen
            ['name' => 'mg/kg'],       // miligram per kilogram
            ['name' => 'g/L'],         // gram per liter
            ['name' => 'mL'],          // mililiter
            ['name' => 'pH'],          // unitless pH
            ['name' => 'NTU'],         // Nephelometric Turbidity Unit
            ['name' => '°C'],          // derajat Celsius
            ['name' => 'μS/cm'],       // microsiemens per centimeter
        ];

        foreach ($units as $unit) {
            Unit_Value::create($unit);
        }
    }
}
