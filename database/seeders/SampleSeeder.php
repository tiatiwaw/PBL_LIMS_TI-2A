<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleSeeder extends Seeder
{
    public function run(): void
    {
        $forms = ['solid', 'liquid', 'gas'];
        $conditions = ['good', 'damaged', 'expired'];
        $statuses = ['in_progress', 'done'];

        $samples = [];

        for ($i = 1; $i <= 30; $i++) {
            $categoryId = rand(1, 3);
            $form = $forms[array_rand($forms)];
            $condition = $conditions[array_rand($conditions)];
            $status = $statuses[array_rand($statuses)];

            $samples[] = [
                'sample_category_id' => $categoryId,
                'name' => "Sample {$categoryId}-{$i}",
                'form' => $form,
                'preservation_method' => "Preserve method {$i}",
                'condition' => $condition,
                'status' => $status,
                'storage_condition' => "Storage {$form} {$i}",
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('samples')->insert($samples);
    }
}
