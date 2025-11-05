<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            'admin',      // 1 untuk admin
            'manager',    // 2 untuk manager  
            'supervisor', // 3 untuk supervisor
            'staff',      // 4 untuk staff
            'analyst',    // 5 untuk analyst
            'client'      // 6 untuk client
        ];

        foreach ($roles as $roleName) {
            Role::updateOrCreate(
                ['name' => $roleName, 'guard_name' => 'web'],
                ['name' => $roleName, 'guard_name' => 'web']
            );
        }
    }
}
