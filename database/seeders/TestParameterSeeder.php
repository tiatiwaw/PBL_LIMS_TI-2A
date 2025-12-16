<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestParameter;
use App\Models\ReferenceStandard;
use App\Models\UnitValue;

class TestParameterSeeder extends Seeder
{
    public function run(): void
    {
        // Buat referensi standar
        $references = [];
        $refNames = [
            'SNI 01-2891-1992', 'ISO 4833:2013', 'SNI 06-6989.25-2005',
            'SNI 6989.11:2019', 'ISO 21527-2:2008', 'SNI 2388:2016',
            'ISO 6888:2013', 'SNI 1899.2:2008', 'ISO 11035:1994', 'SNI 12645:2008'
        ];
        foreach ($refNames as $name) {
            $references[$name] = ReferenceStandard::firstOrCreate(['name' => $name]);
        }

        // Buat unit values
        $units = [];
        $unitNames = ['%', 'CFU/mL', 'NTU', 'mg/L', 'CFU/g', 'ppm', 'pH', 'µm', 'mg/dL', 'IU/mL', 'Pt-Co', 'CFU/25g', 'Skala'];
        foreach ($unitNames as $name) {
            $units[$name] = UnitValue::firstOrCreate(['value' => $name]);
        }

        // 20 Test Parameters dengan kategori beragam
        $parameters = [
            // Kimia (7)
            ['name' => 'Kadar Air', 'unit' => '%', 'ref' => 'SNI 01-2891-1992', 'category' => 'kimia', 'limit' => 'LOD', 'standard' => '≤ 12%', 'min' => '0', 'max' => '12'],
            ['name' => 'Kandungan Besi (Fe)', 'unit' => 'mg/L', 'ref' => 'SNI 6989.11:2019', 'category' => 'kimia', 'limit' => 'LOD', 'standard' => '≤ 0.3 mg/L', 'min' => '0', 'max' => '0.3'],
            ['name' => 'Kandungan Tembaga (Cu)', 'unit' => 'mg/L', 'ref' => 'SNI 06-6989.25-2005', 'category' => 'kimia', 'limit' => 'LOQ', 'standard' => '≤ 2.0 mg/L', 'min' => '0', 'max' => '2.0'],
            // ['name' => 'Kandungan Timbal (Pb)', 'unit' => 'mg/L', 'ref' => 'SNI 6989.11:2019', 'category' => 'kimia', 'limit' => 'LOD', 'standard' => '≤ 0.01 mg/L', 'min' => '0', 'max' => '0.01'],
            // ['name' => 'Kandungan Kadmium (Cd)', 'unit' => 'mg/L', 'ref' => 'SNI 06-6989.25-2005', 'category' => 'kimia', 'limit' => 'LOD', 'standard' => '≤ 0.005 mg/L', 'min' => '0', 'max' => '0.005'],
            // ['name' => 'Kandungan Seng (Zn)', 'unit' => 'mg/L', 'ref' => 'SNI 6989.11:2019', 'category' => 'kimia', 'limit' => 'LOQ', 'standard' => '≤ 15.0 mg/L', 'min' => '0', 'max' => '15.0'],
            // ['name' => 'Sulfat (SO₄²⁻)', 'unit' => 'mg/L', 'ref' => 'SNI 06-6989.25-2005', 'category' => 'kimia', 'limit' => 'LOD', 'standard' => '≤ 250 mg/L', 'min' => '0', 'max' => '250'],

            // Mikrobiologi (7)
            ['name' => 'Total Plate Count', 'unit' => 'CFU/mL', 'ref' => 'ISO 4833:2013', 'category' => 'mikrobiologi', 'limit' => 'LOQ', 'standard' => '≤ 1×10⁵ CFU/mL', 'min' => '0', 'max' => '100000'],
            ['name' => 'Yeast & Mold', 'unit' => 'CFU/g', 'ref' => 'ISO 21527-2:2008', 'category' => 'mikrobiologi', 'limit' => 'LOQ', 'standard' => '≤ 1×10³ CFU/g', 'min' => '0', 'max' => '1000'],
            ['name' => 'E.coli', 'unit' => 'CFU/mL', 'ref' => 'ISO 6888:2013', 'category' => 'mikrobiologi', 'limit' => 'LOD', 'standard' => 'Negative', 'min' => '0', 'max' => '0'],
            // ['name' => 'Salmonella', 'unit' => 'CFU/25g', 'ref' => 'SNI 1899.2:2008', 'category' => 'mikrobiologi', 'limit' => 'LOD', 'standard' => 'Negative', 'min' => '0', 'max' => '0'],
            // ['name' => 'Listeria monocytogenes', 'unit' => 'CFU/g', 'ref' => 'ISO 11035:1994', 'category' => 'mikrobiologi', 'limit' => 'LOD', 'standard' => 'Negative', 'min' => '0', 'max' => '0'],
            // ['name' => 'Staphylococcus aureus', 'unit' => 'CFU/g', 'ref' => 'SNI 2388:2016', 'category' => 'mikrobiologi', 'limit' => 'LOQ', 'standard' => '≤ 1×10³ CFU/g', 'min' => '0', 'max' => '1000'],
            // ['name' => 'Koliform', 'unit' => 'CFU/mL', 'ref' => 'ISO 4833:2013', 'category' => 'mikrobiologi', 'limit' => 'LOD', 'standard' => '≤ 10 CFU/mL', 'min' => '0', 'max' => '10'],

            // Fisika (4)
            ['name' => 'Kekeruhan', 'unit' => 'NTU', 'ref' => 'SNI 06-6989.25-2005', 'category' => 'fisika', 'limit' => 'LOD', 'standard' => '≤ 5 NTU', 'min' => '0', 'max' => '5'],
            ['name' => 'Warna Air', 'unit' => 'Pt-Co', 'ref' => 'SNI 12645:2008', 'category' => 'fisika', 'limit' => 'LOD', 'standard' => '≤ 15 Pt-Co', 'min' => '0', 'max' => '15'],
            // ['name' => 'pH', 'unit' => 'pH', 'ref' => 'SNI 06-6989.25-2005', 'category' => 'fisika', 'limit' => 'LOD', 'standard' => '6.5-8.5', 'min' => '6.5', 'max' => '8.5'],
            // ['name' => 'Bau', 'unit' => 'Skala', 'ref' => 'SNI 12645:2008', 'category' => 'fisika', 'limit' => 'LOD', 'standard' => 'Tidak berbau', 'min' => '0', 'max' => '1'],

            // Klinik (2)
            ['name' => 'Protein', 'unit' => '%', 'ref' => 'SNI 01-2891-1992', 'category' => 'klinik', 'limit' => 'LOD', 'standard' => '≥ 5%', 'min' => '5', 'max' => '100'],
            ['name' => 'Lemak', 'unit' => '%', 'ref' => 'SNI 01-2891-1992', 'category' => 'klinik', 'limit' => 'LOD', 'standard' => '≤ 3%', 'min' => '0', 'max' => '3'],
        ];

        foreach ($parameters as $param) {
            TestParameter::create([
                'unit_value_id' => $units[$param['unit']]->id,
                'reference_id' => $references[$param['ref']]->id,
                'name' => $param['name'],
                'category' => $param['category'],
                'detection_limit' => $param['limit'],
                'quality_standard' => $param['standard'],
                'quality_min' => $param['min'],
                'quality_max' => $param['max'],
            ]);
        }

        $this->command->info('✅ 20 Test Parameter berhasil ditambahkan!');
    }
}