<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            // Air Samples (8)
            ['name' => 'Air Sungai Ciliwung', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air Sumur Warga', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air PDAM Jakarta', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air Mineral Gunung', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air Danau Bandung', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air Kolam Renang', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air Limbah Pabrik', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Air Hujan Kota', 'category_id' => 1, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            
            // Tanah Samples (8)
            ['name' => 'Tanah Pertanian A', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Kebun Organik', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Lokasi Industri', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Bekas Banjir', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Sawah Irigasi', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Perkebunan Kopi', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Taman Kota', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Tanah Lokasi Tempat Sampah', 'category_id' => 2, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            
            // Makanan/Pangan Samples (8)
            ['name' => 'Nasi dari Kantin Sekolah', 'category_id' => 3, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Chiller 4°C'],
            ['name' => 'Susu Sapi Peternakan', 'category_id' => 3, 'form' => 'liquid', 'preservation' => 'Pendinginan 4°C', 'storage' => 'Chiller 4°C'],
            ['name' => 'Sayuran Organik Pasar', 'category_id' => 3, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Chiller 4°C'],
            ['name' => 'Buah-buahan Segar', 'category_id' => 3, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Daging Ayam Pasar', 'category_id' => 3, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Chiller 4°C'],
            ['name' => 'Ikan Segar Pantai', 'category_id' => 3, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Chiller 4°C'],
            ['name' => 'Madu Alami', 'category_id' => 3, 'form' => 'liquid', 'preservation' => 'Botol tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Telur Ayam Kampung', 'category_id' => 3, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            
            // Pestisida/Kimia Samples (5)
            ['name' => 'Pestisida Cair Pabrik', 'category_id' => 4, 'form' => 'liquid', 'preservation' => 'Botol tertutup', 'storage' => 'Tempat kering'],
            ['name' => 'Pestisida Butir Toko', 'category_id' => 4, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Tempat kering'],
            ['name' => 'Herbisida Pertanian', 'category_id' => 4, 'form' => 'liquid', 'preservation' => 'Botol tertutup', 'storage' => 'Tempat kering'],
            ['name' => 'Insektisida Rumah', 'category_id' => 4, 'form' => 'liquid', 'preservation' => 'Botol tertutup', 'storage' => 'Tempat kering'],
            ['name' => 'Fungisida Pertanian', 'category_id' => 4, 'form' => 'liquid', 'preservation' => 'Botol tertutup', 'storage' => 'Tempat kering'],
            
            // Pupuk Samples (3)
            ['name' => 'Pupuk Organik Kompos', 'category_id' => 5, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Pupuk Anorganik Urea', 'category_id' => 5, 'form' => 'solid', 'preservation' => 'Wadah tertutup', 'storage' => 'Suhu Ruang'],
            ['name' => 'Pupuk Hayati Biofertilizer', 'category_id' => 5, 'form' => 'liquid', 'preservation' => 'Botol tertutup', 'storage' => 'Suhu Ruang'],
        ];

        foreach ($samples as $sample) {
            DB::table('samples')->insert([
                'sample_category_id' => $sample['category_id'],
                'name' => $sample['name'],
                'form' => $sample['form'],
                'preservation_method' => $sample['preservation'],
                'condition' => 'good',  // Valid enum value: good, damaged, expired
                'status' => 'pending',  // Initial status
                'storage_condition' => $sample['storage'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ 32 Sample berhasil ditambahkan (lebih dari jumlah order yang dibuat)!');
    }
}
