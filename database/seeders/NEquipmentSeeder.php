<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class NEquipmentSeeder extends Seeder
{
    /**
     * Assign equipment ke n_parameter_methods dan mark unavailable
     */
    public function run(): void
    {
        SeederHelpers::assignRelatesToParameterMethods();
        SeederHelpers::markEquipmentsUsed();
        $this->command->info('✅ NEquipmentSeeder berhasil - Equipment diassign dan marked unavailable!');
    }
}
