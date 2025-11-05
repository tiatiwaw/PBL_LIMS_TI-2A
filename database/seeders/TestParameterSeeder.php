<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\UnitValue;
use App\Models\ReferenceStandard;

class TestParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('test_parameters')->insert([
            [
                'unit_value_id' => UnitValue::inRandomOrder()->value('id'),
                'reference_id' => ReferenceStandard::inRandomOrder()->value('id'),
                'name' => 'Kadar Air',
                'category' => 'kimia',
                'detection_limit' => 'LOD',
                'quality_standard' => 'SNI 01-2891-1992',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'unit_value_id' => UnitValue::inRandomOrder()->value('id'),
                'reference_id' => ReferenceStandard::inRandomOrder()->value('id'),
                'name' => 'Total Plate Count',
                'category' => 'mikrobiologi',
                'detection_limit' => 'LOQ',
                'quality_standard' => 'ISO 4833:2013',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'unit_value_id' => UnitValue::inRandomOrder()->value('id'),
                'reference_id' => ReferenceStandard::inRandomOrder()->value('id'),
                'name' => 'Kekeruhan',
                'category' => 'fisika',
                'detection_limit' => 'LOD',
                'quality_standard' => 'SNI 06-6989.25-2005',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'unit_value_id' => UnitValue::inRandomOrder()->value('id'),
                'reference_id' => ReferenceStandard::inRandomOrder()->value('id'),
                'name' => 'pH',
                'category' => 'kimia',
                'detection_limit' => 'LOQ',
                'quality_standard' => 'SNI 06-6989.11-2004',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'unit_value_id' => UnitValue::inRandomOrder()->value('id'),
                'reference_id' => ReferenceStandard::inRandomOrder()->value('id'),
                'name' => 'Glukosa Darah',
                'category' => 'klinik',
                'detection_limit' => 'LOD',
                'quality_standard' => 'WHO Standard 2020',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
