<?php

namespace App\Console\Commands;

use App\Jobs\SyncAllocationToGamification;
use App\Jobs\SyncClassRoomToGamification;
use App\Jobs\SyncUserToGamification;
use App\Models\Allocation;
use App\Models\ClassRoom;
use App\Models\User;
use App\Services\GamificationService;
use Illuminate\Console\Command;

class SyncGamification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gamification:sync-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync all existing data (Users, Classes, Allocations) to Gamification System';

    /**
     * Execute the console command.
     */
    public function handle(GamificationService $service)
    {
        if (!$service->isConfigured()) {
            $this->error('Gamification integration is not configured in Settings.');
            return;
        }

        $this->info('Starting Full Synchronization...');

        // 1. Sync Users
        $users = User::all();
        $this->info("Syncing {$users->count()} Users...");
        $bar = $this->output->createProgressBar($users->count());
        foreach ($users as $user) {
            SyncUserToGamification::dispatch($user);
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        // 2. Sync ClassRooms
        $classes = ClassRoom::all();
        $this->info("Syncing {$classes->count()} ClassRooms...");
        $bar = $this->output->createProgressBar($classes->count());
        foreach ($classes as $class) {
            SyncClassRoomToGamification::dispatch($class);
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        // 3. Sync Allocations
        $allocations = Allocation::all();
        $this->info("Syncing {$allocations->count()} Allocations...");
        $bar = $this->output->createProgressBar($allocations->count());
        foreach ($allocations as $allocation) {
            SyncAllocationToGamification::dispatch($allocation);
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        $this->info('All sync jobs dispatched to queue!');
    }
}
