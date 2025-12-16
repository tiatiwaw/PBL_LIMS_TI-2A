<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestMethod;
use App\Models\ReferenceStandard;

class TestMethodSeeder extends Seeder
{
    public function run(): void
    {
        // Buat referensi standar jika belum ada
        $refs = [];
        $refNames = [
            'SNI Metodologi',
            'ISO Metodologi',
            'ASTM Metodologi',
            'EPA Metodologi',
            'WHO Metodologi'
        ];
        foreach ($refNames as $name) {
            $refs[$name] = ReferenceStandard::firstOrCreate(['name' => $name]);
        }

        // 20 Test Methods dengan berbagai teknik analisis
        $methods = [
            // Spektrometri & Fotometri (4)
            ['ref' => 'SNI Metodologi', 'name' => 'Spektrofotometri UV-Vis', 'param' => 'Nitrat, Nitrit', 'duration' => 60, 'valid' => '2026-12-31'],
            ['ref' => 'ISO Metodologi', 'name' => 'Spektrofotometri Serapan Atom', 'param' => 'Fe, Cu, Zn, Pb, Cd', 'duration' => 120, 'valid' => '2026-12-31'],
            // ['ref' => 'ASTM Metodologi', 'name' => 'ICP-OES (Inductively Coupled Plasma)', 'param' => 'Multi-elemen', 'duration' => 90, 'valid' => '2026-12-31'],
            // ['ref' => 'WHO Metodologi', 'name' => 'Fotometri Flame', 'param' => 'Natrium, Kalium', 'duration' => 45, 'valid' => '2026-12-31'],

            // Kromatografi (4)
            ['ref' => 'ISO Metodologi', 'name' => 'High Performance Liquid Chromatography (HPLC)', 'param' => 'Pestisida, Herbisida', 'duration' => 150, 'valid' => '2026-12-31'],
            ['ref' => 'EPA Metodologi', 'name' => 'Gas Chromatography (GC)', 'param' => 'VOC, Pestisida', 'duration' => 120, 'valid' => '2026-12-31'],
            // ['ref' => 'SNI Metodologi', 'name' => 'Chromatography Ion Exchange', 'param' => 'Sulfat, Fosfat', 'duration' => 90, 'valid' => '2026-12-31'],
            // ['ref' => 'ASTM Metodologi', 'name' => 'Gas Chromatography Mass Spectrometry (GC-MS)', 'param' => 'Kontaminan Organik', 'duration' => 180, 'valid' => '2026-12-31'],

            // Titrasi & Gravimetri (4)
            ['ref' => 'SNI Metodologi', 'name' => 'Titrasi Asam Basa', 'param' => 'Alkalinitas, Keasaman', 'duration' => 30, 'valid' => '2026-12-31'],
            ['ref' => 'ISO Metodologi', 'name' => 'Titrasi Redoks', 'param' => 'Permanganat, Dichromate', 'duration' => 45, 'valid' => '2026-12-31'],
            // ['ref' => 'WHO Metodologi', 'name' => 'Gravimetri', 'param' => 'TSS, TDS, Residual Dry Matter', 'duration' => 240, 'valid' => '2026-12-31'],
            // ['ref' => 'ASTM Metodologi', 'name' => 'Kompleksometri (EDTA)', 'param' => 'Kesadahan Total, Ca, Mg', 'duration' => 60, 'valid' => '2026-12-31'],

            // Mikrobiologi (3)
            ['ref' => 'ISO Metodologi', 'name' => 'Plate Count Methods (PCM)', 'param' => 'Total Plate Count, TPC', 'duration' => 1440, 'valid' => '2026-12-31'], // 24 jam
            // ['ref' => 'SNI Metodologi', 'name' => 'Most Probable Number (MPN)', 'param' => 'Koliform, E.coli', 'duration' => 2880, 'valid' => '2026-12-31'], // 48 jam
            // ['ref' => 'EPA Metodologi', 'name' => 'Pour Plate Method', 'param' => 'Bakteri Patogen, Yeast & Mold', 'duration' => 1440, 'valid' => '2026-12-31'],

            // Electrochemistry (2)
            ['ref' => 'ISO Metodologi', 'name' => 'Potentiometric pH Measurement', 'param' => 'pH, Asam-Basa', 'duration' => 15, 'valid' => '2026-12-31'],
            // ['ref' => 'ASTM Metodologi', 'name' => 'Conductimetry', 'param' => 'Konduktivitas, TDS', 'duration' => 20, 'valid' => '2026-12-31'],

            // Kalorimetri (2)
            ['ref' => 'SNI Metodologi', 'name' => 'Colorimetry Nessler', 'param' => 'Amonia, Nitrogen', 'duration' => 45, 'valid' => '2026-12-31'],
            // ['ref' => 'WHO Metodologi', 'name' => 'Visual Colorimetry', 'param' => 'Warna, Kekeruhan', 'duration' => 30, 'valid' => '2026-12-31'],
        ];

        foreach ($methods as $method) {
            TestMethod::create([
                'reference_id' => $refs[$method['ref']]->id,
                'name' => $method['name'],
                'applicable_parameter' => $method['param'],
                'duration' => $method['duration'],
                'validity_period' => $method['valid'],
            ]);
        }

        $this->command->info('✅ 20 Test Method berhasil ditambahkan!');
    }
}
