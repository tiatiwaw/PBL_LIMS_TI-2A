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

        // Assign samples dengan strategi: setiap sample hanya digunakan sekali
        foreach ($orders as $order) {
            // Tentukan jumlah sample per order (1-3 samples)
            $samplesPerOrder = rand(1, 3);

            // Pastikan kita tidak kehabisan sample
            if ($sampleIndex + $samplesPerOrder > $sampleCount) {
                $samplesPerOrder = $sampleCount - $sampleIndex;
            }

            // Jika sudah tidak ada sample tersisa, stop
            if ($samplesPerOrder <= 0) {
                break;
            }

            // Ambil sample berikutnya dari pool yang belum digunakan
            for ($i = 0; $i < $samplesPerOrder; $i++) {
                $currentSample = $samples[$sampleIndex];

                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $currentSample['id'],
                    'sample_volume' => fake()->randomFloat(2, 0.5, 5) . ' ml',
                ]);

                $sampleIndex++;
            }
        }

        $this->command->info('✅ NOrderSampleSeeder berhasil dijalankan! Semua sample unik per order.');
    }
}
