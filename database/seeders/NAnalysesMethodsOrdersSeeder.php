<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NAnalysesMethodsOrdersSeeder extends Seeder
{
    /**
     * Assign analyses methods ke order sesuai kriteria
     */
    public function run(): void
    {
        SeederHelpers::assignAnalysesMethodsToOrders();
        $this->command->info('✅ NAnalysesMethodsOrdersSeeder berhasil - Analyses methods diassign ke order!');
    }
}