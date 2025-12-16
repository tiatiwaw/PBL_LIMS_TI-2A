<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use App\Models\Reagent;
use App\Models\Order;
use App\Models\NOrderSample;

class NReagentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Filter: Hanya assign reagent ke parameter-method yang berasal dari order
     * dengan status BUKAN: 'received', 'pending_payment', 'disapproved'
     */
    public function run(): void
    {
        // Status yang TIDAK diperbolehkan
        $excludedStatuses = ['received', 'pending_payment', 'disapproved'];

        // Ambil order dengan status valid
        $validOrders = Order::whereNotIn('status', $excludedStatuses)->pluck('id');

        // Ambil NParameterMethod yang berasal dari order valid (via samples)
        $validOrderIds = $validOrders;
        $validOrderSampleIds = NOrderSample::whereIn('order_id', $validOrderIds)->pluck('sample_id');
        
        $tasks = NParameterMethod::whereIn('sample_id', $validOrderSampleIds)->get();

        $reagents = Reagent::all();

        if ($tasks->isEmpty() || $reagents->isEmpty()) {
            $this->command->warn('⚠️ Data NParameterMethod dari order valid atau Reagent tidak ditemukan. Lewati NReagentSeeder.');
            return;
        }

        // Tugaskan 1-2 bahan acak ke setiap tugas yang valid
        foreach ($tasks as $task) {
            $randomReagents = $reagents->random(rand(1, 2))->pluck('id');

            // Gunakan Eloquent relationship untuk mengisi tabel pivot
            $task->reagents()->attach($randomReagents);
        }

        $this->command->info('✅ NReagentSeeder berhasil dijalankan! (Hanya untuk order dengan status valid)');
    }
}
