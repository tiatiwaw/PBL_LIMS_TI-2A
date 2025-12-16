<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;
use App\Models\NParameterMethod;
use App\Models\NOrderSample;
use App\Models\Order;

class NParameterMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Filter: Hanya membuat parameter-method untuk order yang statusnya
     * BUKAN: 'received', 'pending_payment', 'disapproved'
     */
    public function run(): void
    {
        // Ambil semua data master yang diperlukan
        $parameters = TestParameter::get();
        $methods = TestMethod::all();
        $statuses = ['Failed', 'Success'];

        // Status yang TIDAK diperbolehkan untuk membuat parameter methods
        $excludedStatuses = ['received', 'pending_payment', 'disapproved'];

        if ($parameters->isEmpty() || $methods->isEmpty()) {
            $this->command->warn('⚠️ Data TestParameter atau TestMethod tidak ditemukan. Lewati NParameterMethodSeeder.');
            return;
        }

        // Dapatkan semua samples yang terhubung dengan order yang valid (bukan excluded status)
        $validOrders = Order::whereNotIn('status', $excludedStatuses)->get();
        
        if ($validOrders->isEmpty()) {
            $this->command->warn('⚠️ Tidak ada order dengan status valid untuk parameter methods.');
            return;
        }

        // Dapatkan samples dari order-order yang valid
        $orderSamples = NOrderSample::whereIn('order_id', $validOrders->pluck('id'))
            ->with('samples')
            ->get();

        if ($orderSamples->isEmpty()) {
            $this->command->warn('⚠️ Tidak ada sample di order dengan status valid.');
            return;
        }

        // Buat parameter-method assignments untuk samples yang valid
        foreach ($orderSamples as $orderSample) {
            $sample = $orderSample->samples;

            // Ambil 1-3 parameter tes acak
            $randomParams = $parameters->random(rand(1, 3));

            foreach ($randomParams as $param) {
                // Buat hasil tes palsu dengan unit yang benar
                $resultValue = number_format(rand(1, 1000) / 10, 2);
                $unit = 'units'; // Simplified - unit sudah ada di TestParameter

                NParameterMethod::create([
                    'sample_id'         => $sample->id,
                    'test_parameter_id' => $param->id,
                    'test_method_id'    => $methods->random()->id,
                    'result'            => $resultValue . ' ' . $unit,
                    'status'            => $statuses[array_rand($statuses)],
                ]);
            }
        }

        $this->command->info('✅ NParameterMethodSeeder berhasil dijalankan! (Hanya untuk order dengan status valid)');
    }
}
