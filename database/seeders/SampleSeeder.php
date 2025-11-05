<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('samples')->insert([
            [
                'sample_category_id' => 1,
                'name' => 'Air Sungai Ciliwung',
                'form' => 'liquid',
                'preservation_method' => 'Pendinginan 4°C',
                'sample_volume' => 500.0,
                'condition' => 'good',
                'storage_condition' => 'Cool, 4°C',
            ],
            [
                'sample_category_id' => 2,
                'name' => 'Tanah Pertanian A',
                'form' => 'solid',
                'preservation_method' => 'Disimpan dalam wadah tertutup',
                'sample_volume' => 300.5,
                'condition' => 'good',
                'storage_condition' => 'Dry, room temperature',
            ],
            [
                'sample_category_id' => 3,
                'name' => 'Udara Pabrik X',
                'form' => 'gas',
                'preservation_method' => 'Sampel dalam tabung khusus',
                'sample_volume' => 2.5,
                'condition' => 'good',
                'storage_condition' => 'Pressurized container',
            ],
            [
                'sample_category_id' => 4,
                'name' => 'Air Limbah Rumah Tangga',
                'form' => 'liquid',
                'preservation_method' => 'Pendinginan 4°C',
                'sample_volume' => 450.0,
                'condition' => 'damages',
                'storage_condition' => 'Cool, 4°C',
            ],
            [
                'sample_category_id' => 5,
                'name' => 'Tanah Bekas Tambang',
                'form' => 'solid',
                'preservation_method' => 'Keringkan dan simpan di wadah kedap udara',
                'sample_volume' => 600.0,
                'condition' => 'expired',
                'storage_condition' => 'Dry, desiccator',
            ],
        ]);
    }
}
