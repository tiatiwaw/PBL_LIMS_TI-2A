<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Analyst;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class NAnalystSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $analysts = Analyst::all();
        $orders = Order::all();

        if ($analysts->isEmpty() || $orders->isEmpty()) {
            $this->command->warn('⚠️ Data analyst atau order belum ada. Jalankan seeder AnalystSeeder dan OrderSeeder dulu.');
            return;
        }

        foreach ($orders as $order) {
            // Setiap order akan memiliki 1–2 analyst acak
            $selectedAnalysts = $analysts->random(rand(1, min(2, $analysts->count())));

            foreach ($selectedAnalysts as $analyst) {
                DB::table('n_analysts')->insert([
                    'analyst_id' => $analyst->id,
                    'order_id'   => $order->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('✅ NAnalystSeeder berhasil dijalankan!');
    }
}
