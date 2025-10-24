<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clients')->insert([
            [
                'user_id' => 1,
                'name' => 'PT Kimia Farma',
                'address' => 'Jl. Gatot Subroto No. 15, Jakarta',
                'email' => 'info@kimiafarma.co.id',
                'phone_number' => '0217654321',
                'npwp_number' => '01.234.567.8-999.000',
            ],
            [
                'user_id' => 2,
                'name' => 'CV Sehat Sentosa',
                'address' => 'Jl. Pasteur No. 77, Bandung',
                'email' => 'admin@sehatsentosa.com',
                'phone_number' => '0227654321',
                'npwp_number' => '02.345.678.9-888.000',
            ],
            [
                'user_id' => 3,
                'name' => 'PT Indo Analisa',
                'address' => 'Jl. Diponegoro No. 8, Surabaya',
                'email' => 'cs@indoanalisa.co.id',
                'phone_number' => '0317788990',
                'npwp_number' => '03.456.789.0-777.000',
            ],
            [
                'user_id' => 4,
                'name' => 'UD Sumber Alam',
                'address' => 'Jl. Sudirman No. 5, Palembang',
                'email' => 'kontak@sumberalam.id',
                'phone_number' => '0711789456',
                'npwp_number' => '04.567.890.1-666.000',
            ],
            [
                'user_id' => 5,
                'name' => 'PT Lab Nusantara',
                'address' => 'Jl. Raya Denpasar No. 10, Bali',
                'email' => 'hello@labnusantara.co.id',
                'phone_number' => '0361456789',
                'npwp_number' => '05.678.901.2-555.000',
            ],
        ]);
    }
}
