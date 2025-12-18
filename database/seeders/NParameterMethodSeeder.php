<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NParameterMethodSeeder extends Seeder
{
    /**
     * Assign n_parameter_methods dengan data sesuai order status
     */
    public function run(): void
    {
        SeederHelpers::assignParameterMethodsToOrders();
        $this->command->info('✅ NParameterMethodSeeder berhasil - Parameter methods diassign dengan kriteria status!');
    }
}
