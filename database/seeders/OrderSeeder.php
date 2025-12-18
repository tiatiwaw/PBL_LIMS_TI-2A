<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::all();
        $supervisors = User::where('role', 'supervisor')->get();

        if ($clients->isEmpty() || $supervisors->isEmpty()) {
            $this->command->warn('⚠️ Tidak ada data client atau supervisor. Seeder Order dilewati.');
            return;
        }

        // Definisi semua status yang ada
        $statuses = [
            'received',
            'disapproved',
            'pending_payment',
            'paid',
            'in_progress',
            'received_test',
            'revision_test',
            'pending',
        ];

        $statusIndex = 0;
        $statusCount = count($statuses);

        // 1 order per client, cycling through statuses
        foreach ($clients as $client) {
            // Cycle through statuses untuk setiap client
            $status = $statuses[$statusIndex % $statusCount];
            $statusIndex++;

            Order::create([
                'client_id' => $client->id,
                'supervisor_id' => $supervisors->random()->id,
                'order_number' => strtoupper(Str::random(8)),
                'title' => "Order {$status} untuk {$client->name}",
                'result_value' => in_array($status, ['received_test', 'revision_test', 'pending', 'completed']) 
                    ? fake()->randomFloat(2, 10, 99) . ' mg/L' 
                    : null,
                'order_date' => now()->subDays(rand(5, 30)),
                'estimate_date' => now()->addDays(rand(3, 10)),
                'report_issued_at' => in_array($status, ['received_test', 'pending', 'completed']) 
                    ? now()->subDays(rand(1, 5)) 
                    : null,
                'report_file_path' => null,
                'receipt_file_path' => null,
                'notes' => fake()->sentence(),
                'order_type' => fake()->randomElement(['internal', 'regular', 'external', 'urgent']),
                'status' => $status,
            ]);
        }

        $this->command->info('✅ OrderSeeder berhasil dijalankan! Setiap client memiliki 1 order dengan status yang berbeda!');
    }
}