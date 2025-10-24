<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnalystSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('analysts')->insert([
            [
                'user_id' => 1,
                'name' => 'Dr. Rina Mulyani',
                'specialist' => 'Kimia Analitik',
            ],
            [
                'user_id' => 2,
                'name' => 'Ir. Budi Santoso',
                'specialist' => 'Mikrobiologi',
            ],
            [
                'user_id' => 3,
                'name' => 'Drs. Ahmad Zulfikar',
                'specialist' => 'Toksikologi',
            ],
            [
                'user_id' => 4,
                'name' => 'Dr. Sinta Wulandari',
                'specialist' => 'Farmakologi',
            ],
            [
                'user_id' => 5,
                'name' => 'Ir. Andika Rahman',
                'specialist' => 'Bioteknologi',
            ],
        ]);
    }
}
