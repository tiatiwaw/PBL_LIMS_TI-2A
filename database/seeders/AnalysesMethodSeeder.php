<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AnalysesMethod;

class AnalysesMethodSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel analyses_methods.
     */
    public function run(): void
    {
        $methods = [
            ['analyses_method' => 'Gravimetri', 'price' => 0],
            ['analyses_method' => 'Spektrofotometri UV-Vis', 'price' => 0],
            ['analyses_method' => 'Kromatografi Cair (HPLC)', 'price' => 0],
            ['analyses_method' => 'Titrasi Asam-Basa', 'price' => 0],
            ['analyses_method' => 'Spektrometri Serapan Atom (AAS)', 'price' => 0],
        ];

        foreach ($methods as $method) {
            AnalysesMethod::create($method);
        }
    }
}
