<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\AnalysesMethod;
use App\Models\NAnalysesMethodsOrder;

class NAnalysesMethodsOrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Strategi:
     * - Setiap order mendapat 1-3 analyses methods
     * - Distribusi analyses methods secara merata ke semua orders
     * - Cycle jika analyses methods habis
     */
    public function run(): void
    {
        $orders = Order::all();
        $analysesMethods = AnalysesMethod::all();

        if (count($orders) === 0 || count($analysesMethods) === 0) {
            $this->command->warn('⚠️ Tidak ada data di tabel orders atau analyses_methods. Jalankan seeder untuk kedua tabel tersebut dulu.');
            return;
        }

        $prices = [250000, 180000, 320000, 275000, 210000, 195000, 290000, 335000, 265000, 225000];
        $descriptions = [
            'Analisis kualitas air lengkap untuk parameter fisik dan kimia',
            'Uji kandungan logam berat dalam sampel',
            'Analisis mikrobiologi untuk parameter E.coli dan total koliform',
            'Uji residu pestisida dalam produk pertanian',
            'Analisis kandungan nutrisi dan vitamin dalam makanan',
            'Pemeriksaan kualitas minum dalam kemasan',
            'Analisis logam berat pada sampel tanah',
            'Uji bakteri patogen pada sampel lingkungan',
            'Analisis residu pestisida organofosfat',
            'Uji kandungan protein dan lemak dalam produk pangan',
        ];

        $methodIndex = 0;
        $priceIndex = 0;
        $descIndex = 0;
        $methodCount = count($analysesMethods);

        // Assign analyses methods ke semua orders dengan cycling
        foreach ($orders as $order) {
            // Tentukan jumlah analyses methods per order (1-3)
            $methodsPerOrder = rand(1, 3);

            for ($i = 0; $i < $methodsPerOrder; $i++) {
                // Cycle kembali ke awal jika sudah habis
                if ($methodIndex >= $methodCount) {
                    $methodIndex = 0;
                }
                if ($priceIndex >= count($prices)) {
                    $priceIndex = 0;
                }
                if ($descIndex >= count($descriptions)) {
                    $descIndex = 0;
                }

                $currentMethod = $analysesMethods[$methodIndex];

                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $currentMethod->id,
                    'description' => $descriptions[$descIndex],
                    'price' => $prices[$priceIndex],
                ]);

                $methodIndex++;
                $priceIndex++;
                $descIndex++;
            }
        }

        $this->command->info('✅ NAnalysesMethodsOrdersSeeder berhasil dijalankan! Semua order telah mendapatkan analyses methods.');
    }
}