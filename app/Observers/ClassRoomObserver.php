<?php

namespace App\Observers;

use App\Jobs\SyncClassRoomToGamification;
use App\Models\ClassRoom;

class ClassRoomObserver
{
    /**
     * Handle the ClassRoom "created" event.
     */
    public function created(ClassRoom $classRoom): void
    {
        SyncClassRoomToGamification::dispatch($classRoom);
    }

    /**
     * Handle the ClassRoom "updated" event.
     */
    public function updated(ClassRoom $classRoom): void
    {
        SyncClassRoomToGamification::dispatch($classRoom);
    }
}
