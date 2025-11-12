<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{
    public function run()
    {
        // 1️⃣ BUAT ROLES TERLEBIH DAHULU
        $roles = ['admin', 'client', 'staff', 'analyst', 'supervisor', 'manager'];

        foreach ($roles as $role) {
            Role::firstOrCreate([
                'name' => $role,
                'guard_name' => 'web'
            ]);
        }

        // 2️⃣ BUAT ADMIN USER & ASSIGN ROLE
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'remember_token' => Str::random(10),
            'signature' => 'signatures/admin.png', // Ganti fake() dengan path real
            'email_verified_at' => now(),
            // HAPUS: 'role' => 'admin' ← INI YANG PERLU DIHAPUS
        ]);
        $adminUser->assignRole('admin'); // ← INI YANG PERLU DITAMBAHKAN

        // 2️⃣ BUAT ADMIN USER & ASSIGN ROLE
        $staffUser = User::create([
            'name' => 'Staff Kelompok 2',
            'email' => 'staff@example.com',
            'password' => Hash::make('staff123'),
            'remember_token' => Str::random(10),
            'signature' => 'signatures/staff.png', // Ganti fake() dengan path real
            'email_verified_at' => now(),
        ]);
        $staffUser->assignRole('staff'); // ← INI YANG PERLU DITAMBAHKAN

        // 3️⃣ BUAT USER LAINNYA & ASSIGN ROLE
        $otherRoles = ['client', 'staff', 'analyst', 'supervisor', 'manager'];

        foreach ($otherRoles as $role) {
            $users = User::factory(10)->create(['role' => $role]);

            foreach ($users as $user) {
                $user->assignRole($role);
            }
        }

        $this->command->info('🎉 UserRoleSeeder completed!');
        $this->command->info('👤 Admin: admin@lims.com / admin123');
        $this->command->info('🔐 Other users: check database for random emails / password');
    }
}
