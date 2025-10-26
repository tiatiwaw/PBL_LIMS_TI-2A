<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sample_Category;

class SampleCategorySeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel sample_categories.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Air'],
            ['name' => 'Tanah'],
            ['name' => 'Pangan'],
            ['name' => 'Mikrobiologi'],
            ['name' => 'Lingkungan'],
            ['name' => 'Farmasi'],
            ['name' => 'Kimia Industri'],
            ['name' => 'Biologi'],
            ['name' => 'Bahan Baku'],
            ['name' => 'Produk Jadi'],
        ];

        foreach ($categories as $category) {
            Sample_Category::create($category);
        }
    }
}
