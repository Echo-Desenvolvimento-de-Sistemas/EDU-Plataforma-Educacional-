<?php

namespace App\Actions;

use App\Models\Allocation;
use App\Models\ClassRoom;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SyncWithGamificationAction
{
    /**
     * Execute the synchronization logic.
     */
    public function execute($model): void
    {
        try {
            // This is a placeholder for the actual sync logic.
            // In a real scenario, this would call an external API or update a gamification DB.
            Log::info("Syncing " . get_class($model) . " ID {$model->id} to Gamification system.");
            
            // Example HTTP call
            // Http::post(config('services.gamification.url'), $model->toArray());
            
        } catch (\Exception $e) {
            Log::error("Failed to sync to Gamification: " . $e->getMessage());
        }
    }
}
