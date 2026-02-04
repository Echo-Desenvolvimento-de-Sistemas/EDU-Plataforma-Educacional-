<?php

namespace App\Observers;

use App\Jobs\SyncAllocationToGamification;
use App\Models\Allocation;

class AllocationObserver
{
    /**
     * Handle the Allocation "created" event.
     */
    public function created(Allocation $allocation): void
    {
        SyncAllocationToGamification::dispatch($allocation);
    }

    /**
     * Handle the Allocation "updated" event.
     */
    public function updated(Allocation $allocation): void
    {
        SyncAllocationToGamification::dispatch($allocation);
    }

    /**
     * Handle the Allocation "deleted" event.
     */
    public function deleted(Allocation $allocation): void
    {
        // Ideally we would send a delete event to gamification
        SyncAllocationToGamification::dispatch($allocation);
    }
}
