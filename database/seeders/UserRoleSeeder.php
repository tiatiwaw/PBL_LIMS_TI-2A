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
        // 1️⃣ DAFTAR ROLE
        $roles = ['admin', 'client', 'staff', 'analyst', 'supervisor', 'manager'];

        // BUAT ROLES JIKA BELUM ADA
        foreach ($roles as $role) {
            Role::firstOrCreate([
                'name' => $role,
                'guard_name' => 'web'
            ]);
        }

        // 2️⃣ USER UTAMA PER ROLE
        $mainUsers = [
            'admin'      => ['name' => 'Admin Utama',      'email' => 'admin@example.com',      'password' => 'admin123'],
            'client'     => ['name' => 'Client Utama',     'email' => 'client@example.com',     'password' => 'client123'],
            'staff'      => ['name' => 'Staff Utama',      'email' => 'staff@example.com',      'password' => 'staff123'],
            'analyst'    => ['name' => 'Analyst Utama',    'email' => 'analyst@example.com',    'password' => 'analyst123'],
            'supervisor' => ['name' => 'Supervisor Utama', 'email' => 'supervisor@example.com', 'password' => 'super123'],
            'manager'    => ['name' => 'Manager Utama',    'email' => 'manager@example.com',    'password' => 'manager123'],
        ];

        foreach ($mainUsers as $role => $data) {
            $user = User::create([
                'name'              => $data['name'],
                'email'             => $data['email'],
                'password'          => Hash::make($data['password']),
                'remember_token'    => Str::random(10),
                'signature'         => 'signatures/default.png',
                'email_verified_at' => now(),
                'role' => $role,
            ]);

            $user->assignRole($role);
        }

        // 3️⃣ USER DUMMY SETIAP ROLE
        foreach ($roles as $role) {
            $dummyUsers = User::factory(5)->create(['role' => $role]);
            foreach ($dummyUsers as $user) {
                $user->assignRole($role);
            }
        }

        // 4️⃣ OUTPUT INFORMASI KE TERMINAL
        $this->command->info("🎉 UserRoleSeeder completed!");

        foreach ($mainUsers as $role => $data) {
            $this->command->info("👤 $role → {$data['email']} / {$data['password']}");
        }
    }
}