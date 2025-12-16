<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use App\Models\Equipment;
use App\Models\Order;
use App\Models\NOrderSample;

class NEquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Filter: Hanya assign equipment ke parameter-method yang berasal dari order
     * dengan status BUKAN: 'received', 'pending_payment', 'disapproved'
     */
    public function run(): void
    {
        // Status yang TIDAK diperbolehkan
        $excludedStatuses = ['received', 'pending_payment', 'disapproved'];

        // Ambil order dengan status valid
        $validOrders = Order::whereNotIn('status', $excludedStatuses)->pluck('id');

        // Ambil NParameterMethod yang berasal dari order valid (via samples - using correct relationship name)
        $validOrderIds = $validOrders;
        $validOrderSampleIds = NOrderSample::whereIn('order_id', $validOrderIds)->pluck('sample_id');
        
        $tasks = NParameterMethod::whereIn('sample_id', $validOrderSampleIds)->get();

        $equipments = Equipment::all();

        if ($tasks->isEmpty() || $equipments->isEmpty()) {
            $this->command->warn('⚠️ Data NParameterMethod dari order valid atau Equipment tidak ditemukan. Lewati NEquipmentSeeder.');
            return;
        }

        // Tugaskan 1 alat acak ke setiap tugas yang valid
        foreach ($tasks as $task) {
            $randomEquipment = $equipments->random();

            // Gunakan Eloquent relationship untuk mengisi tabel pivot
            $task->equipments()->attach($randomEquipment->id);
        }

        $this->command->info('✅ NEquipmentSeeder berhasil dijalankan! (Hanya untuk order dengan status valid)');
    }
}
