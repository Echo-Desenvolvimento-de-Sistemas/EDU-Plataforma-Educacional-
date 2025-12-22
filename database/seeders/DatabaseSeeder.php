<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'secretaria@example.com'],
            [
                'name' => 'Secretaria User',
                'password' => 'password',
                'role' => 'secretaria',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'professor@example.com'],
            [
                'name' => 'Professor User',
                'password' => 'password',
                'role' => 'professor',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'aluno@example.com'],
            [
                'name' => 'Aluno User',
                'password' => 'password',
                'role' => 'aluno',
                'email_verified_at' => now(),
            ]
        );
    }
}
