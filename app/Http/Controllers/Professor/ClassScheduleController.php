<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ClassScheduleController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Fetch all schedules for this professor
        $userAllocationPairs = $user->allocations()->select('class_room_id', 'subject_id')->get();

        $schedules = \App\Models\ClassSchedule::query()
            ->where(function ($query) use ($userAllocationPairs) {
                foreach ($userAllocationPairs as $pair) {
                    $query->orWhere(function ($q) use ($pair) {
                        $q->where('class_room_id', $pair->class_room_id)
                            ->where('subject_id', $pair->subject_id);
                    });
                }
            })
            ->with(['classRoom.grade', 'subject'])
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        // Group by day of week
        $groupedSchedules = $schedules->groupBy('day_of_week')->map(function ($daySchedules) {
            return $daySchedules->map(function ($schedule) {
                return [
                    'id' => $schedule->id,
                    'start_time' => $schedule->start_time,
                    'end_time' => $schedule->end_time,
                    'class_name' => $schedule->classRoom->name,
                    'grade_name' => $schedule->classRoom->grade->name,
                    'subject_name' => $schedule->subject->name,
                    'class_room_id' => $schedule->class_room_id,
                ];
            });
        });

        // Ensure all days (0-6) are present even if empty
        $formattedSchedules = collect(range(0, 6))->mapWithKeys(function ($day) use ($groupedSchedules) {
            return [$day => $groupedSchedules->get($day, collect([]))];
        });

        return Inertia::render('Professor/ClassSchedules/Index', [
            'schedules' => $formattedSchedules
        ]);
    }
}
