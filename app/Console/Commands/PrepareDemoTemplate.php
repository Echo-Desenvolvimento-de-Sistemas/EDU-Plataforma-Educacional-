<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PrepareDemoTemplate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'demo:prepare {--force}';

    /**
     * The console command description.
     */
    protected $description = 'Resets the database and prepares the demo SQLite template with fictional data.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting Demo Template Preparation...');

        if (!$this->option('force') && !$this->confirm('This will wipe your current database and replace it with fictional data. Continue?')) {
            return;
        }

        // 1. Reset and Seed Main Database (MySQL usually)
        $this->info('Step 1: Refreshing main database and seeding fictional data...');
        $this->call('migrate:fresh', ['--seed' => true, '--seeder' => 'DemoDataSeeder']);

        // 2. Prepare SQLite Template
        $this->info('Step 2: Preparing SQLite template (database/database.sqlite)...');
        
        $sqlitePath = database_path('database.sqlite');
        
        // Ensure the file exists and is empty
        if (file_exists($sqlitePath)) {
            unlink($sqlitePath);
        }
        touch($sqlitePath);

        // Run migrations and seeds on the SQLite file specifically
        // We use a temporary config or environment variable
        $this->info('Running migrations on SQLite template...');
        
        config(['database.connections.template_sqlite' => [
            'driver' => 'sqlite',
            'url' => null,
            'database' => $sqlitePath,
            'prefix' => '',
            'foreign_key_constraints' => true,
        ]]);

        $this->call('migrate', [
            '--database' => 'template_sqlite',
            '--path' => 'database/migrations',
            '--force' => true
        ]);

        $this->info('Seeding SQLite template...');
        $this->call('db:seed', [
            '--database' => 'template_sqlite',
            '--class' => 'DemoDataSeeder',
            '--force' => true
        ]);

        $this->info('Demo template successfully prepared at ' . $sqlitePath);
        $this->info('All sessions will now use this fresh fictional data.');
    }
}
