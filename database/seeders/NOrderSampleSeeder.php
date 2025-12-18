<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NOrderSampleSeeder extends Seeder
{
    /**
     * Assign sampel ke order sesuai kriteria
     */
    public function run(): void
    {
        if (!SeederHelpers::validateMasterData()) {
            $this->command->warn('⚠️ Data master tidak lengkap. Skip NOrderSampleSeeder.');
            return;
        }

        SeederHelpers::assignSamplesToOrders();
        $this->command->info('✅ NOrderSampleSeeder berhasil - Semua order mendapat sampel (1-3 per order)!');
    }
}
