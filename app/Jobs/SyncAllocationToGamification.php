<?php

namespace App\Jobs;

use App\Models\Allocation;
use App\Services\GamificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncAllocationToGamification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $allocation;

    /**
     * Create a new job instance.
     */
    public function __construct(Allocation $allocation)
    {
        $this->allocation = $allocation;
    }

    /**
     * Execute the job.
     */
    public function handle(GamificationService $gamificationService): void
    {
        try {
            if ($gamificationService->isConfigured()) {
                $gamificationService->syncAllocation($this->allocation);
            }
        } catch (\Exception $e) {
            Log::error("Failed to sync allocation {$this->allocation->id} to gamification: " . $e->getMessage());
        }
    }
}
