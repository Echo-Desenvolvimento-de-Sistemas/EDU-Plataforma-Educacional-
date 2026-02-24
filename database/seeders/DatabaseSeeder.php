<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user for production
        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Only create test users in non-production environments
        if (app()->environment('local', 'development')) {
            User::firstOrCreate(
                ['email' => 'secretaria@example.com'],
                [
                    'name' => 'Secretaria User',
                    'password' => Hash::make('password'),
                    'role' => 'secretaria',
                    'email_verified_at' => now(),
                ]
            );

            User::firstOrCreate(
                ['email' => 'professor@example.com'],
                [
                    'name' => 'Professor User',
                    'password' => Hash::make('password'),
                    'role' => 'professor',
                    'email_verified_at' => now(),
                ]
            );

            User::firstOrCreate(
                ['email' => 'aluno@example.com'],
                [
                    'name' => 'Aluno User',
                    'password' => Hash::make('password'),
                    'role' => 'aluno',
                    'email_verified_at' => now(),
                ]
            );
        }

        $this->call([
            BnccSeeder::class,
            AllocationSeeder::class,
            ClassScheduleSeeder::class,
        ]);
    }
}
