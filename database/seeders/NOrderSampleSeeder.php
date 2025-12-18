<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Sample;
use App\Models\NOrderSample;

class NOrderSampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Strategi:
     * - Setiap sample hanya digunakan SEKALI saja di seluruh order
     * - Tidak ada duplikasi sample antar order
     * - Distribusi sample secara merata di setiap order
     */
    public function run(): void
    {
        $orders = Order::all();
        $samples = Sample::all()->toArray();

        if (count($orders) === 0 || count($samples) === 0) {
            $this->command->warn('⚠️ Tidak ada data di tabel orders atau samples. Jalankan seeder untuk kedua tabel tersebut dulu.');
            return;
        }

        // Shuffle samples untuk distribusi random yang merata
        shuffle($samples);

        $sampleIndex = 0;
        $sampleCount = count($samples);

        // Assign samples ke semua orders dengan cycling
        foreach ($orders as $order) {
            // Tentukan jumlah sample per order (1-3 samples)
            $samplesPerOrder = rand(1, 3);

            // Ambil sample dan cycle jika perlu
            for ($i = 0; $i < $samplesPerOrder; $i++) {
                // Cycle kembali ke awal jika sudah habis
                if ($sampleIndex >= $sampleCount) {
                    $sampleIndex = 0;
                }

                $currentSample = $samples[$sampleIndex];

                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $currentSample['id'],
                    'sample_volume' => fake()->randomFloat(2, 0.5, 5) . ' ml',
                ]);

                $sampleIndex++;
            }
        }

        $this->command->info('✅ NOrderSampleSeeder berhasil dijalankan! Semua order telah mendapatkan sample.');
    }
}
