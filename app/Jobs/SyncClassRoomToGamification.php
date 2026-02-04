<?php

namespace App\Jobs;

use App\Models\ClassRoom;
use App\Services\GamificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncClassRoomToGamification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $classRoom;

    /**
     * Create a new job instance.
     */
    public function __construct(ClassRoom $classRoom)
    {
        $this->classRoom = $classRoom;
    }

    /**
     * Execute the job.
     */
    public function handle(GamificationService $gamificationService): void
    {
        try {
            if ($gamificationService->isConfigured()) {
                $gamificationService->syncClassRoom($this->classRoom);
            }
        } catch (\Exception $e) {
            Log::error("Failed to sync classroom {$this->classRoom->id} to gamification: " . $e->getMessage());
        }
    }
}
