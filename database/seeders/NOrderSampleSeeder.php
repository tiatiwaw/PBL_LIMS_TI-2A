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
     */
    public function run(): void
    {
        $orders = Order::all();
        $samples = Sample::all();

        // Misal setiap order punya 3 sample
        $samplePerOrder = 3;

        foreach ($orders as $order) {
            // ambil sample random tapi unik per order
            $assignedSamples = $samples->shuffle()->take($samplePerOrder);

            foreach ($assignedSamples as $sample) {
                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $sample->id,
                    'sample_volume' => rand(50, 500) / 100 . ' ml', // contoh 0.5 - 5 ml
                ]);
            }
        }
        
        $this->command->info('✅ NOrderSampleSeeder berhasil dijalankan!');
    }
    
}
