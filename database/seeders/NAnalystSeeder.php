<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Analyst;

class NAnalystSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Filter: Hanya assign analyst ke order yang statusnya
     * BUKAN: 'received', 'pending_payment', 'disapproved'
     */
    public function run(): void
    {
        // Status yang TIDAK diperbolehkan untuk assign analyst
        $excludedStatuses = ['received', 'pending_payment', 'disapproved'];

        // Ambil order dengan status valid saja
        $validOrders = Order::whereNotIn('status', $excludedStatuses)->get();
        $analysts = Analyst::all();

        if ($validOrders->isEmpty() || $analysts->isEmpty()) {
            $this->command->warn('⚠️ Data Order dengan status valid atau Analyst tidak ditemukan. Lewati NAnalystSeeder.');
            return;
        }

        // Tugaskan 1 atau 2 analis acak ke setiap order yang valid
        foreach ($validOrders as $order) {
            // Ambil 1 atau 2 ID analis secara acak
            $randomAnalysts = $analysts->pluck('id');

            // Gunakan Eloquent relationship untuk mengisi tabel pivot
            $order->analysts()->attach($randomAnalysts);
        }

        $this->command->info('✅ NAnalystSeeder berhasil dijalankan! (Hanya untuk order dengan status valid)');
    }
}
