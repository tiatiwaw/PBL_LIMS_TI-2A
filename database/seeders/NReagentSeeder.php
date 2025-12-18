<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NReagentSeeder extends Seeder
{
    /**
     * Assign reagent ke n_parameter_methods (dipopulate via assignRelatesToParameterMethods)
     */
    public function run(): void
    {
        // Relasi reagent sudah diisi oleh NEquipmentSeeder via SeederHelpers::assignRelatesToParameterMethods()
        $this->command->info('✅ NReagentSeeder - Reagent sudah diassign via helper!');
    }
}
