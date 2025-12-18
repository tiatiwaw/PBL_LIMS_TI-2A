<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NAnalystSeeder extends Seeder
{
    /**
     * Assign analyst ke n_parameter_methods (dipopulate via assignRelatesToParameterMethods)
     */
    public function run(): void
    {
        // Relasi analyst sudah diisi oleh NEquipmentSeeder via SeederHelpers::assignRelatesToParameterMethods()
        $this->command->info('✅ NAnalystSeeder - Analyst sudah diassign via helper!');
    }
}
