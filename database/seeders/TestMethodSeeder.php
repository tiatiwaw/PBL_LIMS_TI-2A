<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Test_Method;

class TestMethodSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel test_methods.
     */
    public function run(): void
    {
        $methods = [
            ['name' => 'Spektrofotometri UV-Vis'],
            ['name' => 'Kromatografi Gas (GC)'],
            ['name' => 'Kromatografi Cair Kinerja Tinggi (HPLC)'],
            ['name' => 'Titrasi Asam Basa'],
            ['name' => 'Gravimetri'],
            ['name' => 'Spektrofotometri Serapan Atom (AAS)'],
            ['name' => 'Enzimatik'],
            ['name' => 'PCR (Polymerase Chain Reaction)'],
            ['name' => 'Elektroforesis'],
            ['name' => 'Mikrobiologi Plate Count'],
        ];

        foreach ($methods as $method) {
            Test_Method::create($method);
        }
    }
}
