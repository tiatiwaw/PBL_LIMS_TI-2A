<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestMethod;
use App\Models\ReferenceStandard;

class TestMethodSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel test_methods.
     */
    public function run(): void
    {
        $names = [
            'Spektrofotometri UV-Vis',
            'Kromatografi Gas (GC)',
            'Kromatografi Cair Kinerja Tinggi (HPLC)',
            'Titrasi Asam Basa',
            'Gravimetri',
            'Spektrofotometri Serapan Atom (AAS)',
            'Enzimatik',
            'PCR (Polymerase Chain Reaction)',
            'Elektroforesis',
            'Mikrobiologi Plate Count',
        ];

        foreach ($names as $name) {
            TestMethod::create([
                'reference_id' => ReferenceStandard::inRandomOrder()->value('id'),
                'name' => $name,
                'applicable_parameter' => 'General',
                'duration' => rand(30, 180),
                'validity_period' => now()->addYears(2),
            ]);
        }
    }
}
