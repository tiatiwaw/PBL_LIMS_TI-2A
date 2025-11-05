<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel users.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrator',
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'role' => 'admin',
            ],
            [
                'name' => 'Manager User',
                'email' => 'manager@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'role' => 'manager',
            ],
            [
                'name' => 'Supervisor User',
                'email' => 'supervisor@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'role' => 'supervisor',
            ],
            [
                'name' => 'Staff User',
                'email' => 'staff@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'role' => 'staff',
            ],
            [
                'name' => 'Analyst User',
                'email' => 'analyst@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'role' => 'analyst',
            ],
            [
                'name' => 'Client User',
                'email' => 'client@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'role' => 'client',
            ],
        ];

        foreach ($users as $userData) {
            $roleName = $userData['role'];
            unset($userData['role']); // Remove role from user data
            
            $user = User::create($userData);
            
            // Find or create role
            $role = Role::where('name', $roleName)->first();
            if (!$role) {
                $role = Role::create(['name' => $roleName]);
            }
            
            // Assign role to user
            $user->assignRole($role);
        }
    }
}