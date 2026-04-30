<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DemoSandboxService
{
    /**
     * Set up a unique sandbox for the current session.
     */
    public function setupSandbox(): string
    {
        $sessionId = Session::getId();
        $sandboxDir = storage_path('framework/sandbox');
        
        if (!File::exists($sandboxDir)) {
            File::makeDirectory($sandboxDir, 0755, true);
        }

        $sandboxPath = $sandboxDir . '/' . $sessionId . '.sqlite';
        $templatePath = database_path('database.sqlite');

        // Copy the template database to the sandbox
        if (File::exists($templatePath)) {
            File::copy($templatePath, $sandboxPath);
        } else {
            // Create empty sqlite if template doesn't exist (shouldn't happen)
            File::put($sandboxPath, '');
        }

        return $sandboxPath;
    }

    /**
     * Switch the database connection to the sandbox.
     */
    public function switchConnection(string $path): void
    {
        // Close existing connection
        DB::disconnect('sqlite');

        // Update config
        Config::set('database.connections.sqlite.database', $path);

        // Purge to ensure next call uses new config
        DB::purge('sqlite');
    }

    /**
     * Cleanup old sandbox files.
     */
    public function cleanup(): void
    {
        $sandboxDir = storage_path('framework/sandbox');
        if (!File::exists($sandboxDir)) return;

        $files = File::files($sandboxDir);
        $now = time();
        $maxAge = 3600 * 2; // 2 hours

        foreach ($files as $file) {
            if ($now - $file->getMTime() > $maxAge) {
                File::delete($file->getPathname());
            }
        }
    }
}
