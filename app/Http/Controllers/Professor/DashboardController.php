<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $today = now()->dayOfWeek; // 0 (Sunday) - 6 (Saturday) - matches Carbon standard which aligns with our DB logic

        // Eager load relationships for dashboard display
        $allocations = $user->allocations()
            ->with(['classRoom.grade', 'classRoom.academicYear', 'subject'])
            ->get()
            ->groupBy('class_room_id')
            ->map(function ($allocs) {
                $first = $allocs->first();
                return [
                    'class_room_id' => $first->class_room_id,
                    'class_room_name' => $first->classRoom->name,
                    'grade_name' => $first->classRoom->grade->name,
                    'academic_year' => $first->classRoom->academicYear->year,
                    'subjects' => $allocs->map(fn($a) => [
                        'id' => $a->subject_id,
                        'name' => $a->subject->name
                    ])->values()
                ];
            })
            ->values();

        // Fetch Today's Schedule for the Professor
        // Logic: Find schedules where (class_room_id AND subject_id) matches any of the professor's allocations
        // AND day_of_week is today.

        $userAllocationPairs = $user->allocations()->select('class_room_id', 'subject_id')->get();

        $schedules = \App\Models\ClassSchedule::query()
            ->where('day_of_week', $today)
            ->where(function ($query) use ($userAllocationPairs) {
                foreach ($userAllocationPairs as $pair) {
                    $query->orWhere(function ($q) use ($pair) {
                        $q->where('class_room_id', $pair->class_room_id)
                            ->where('subject_id', $pair->subject_id);
                    });
                }
            })
            ->with(['classRoom.grade', 'subject'])
            ->orderBy('start_time')
            ->get()
            ->map(function ($schedule) {
                return [
                    'id' => $schedule->id,
                    'time' => \Carbon\Carbon::parse($schedule->start_time)->format('H:i') . ' - ' . \Carbon\Carbon::parse($schedule->end_time)->format('H:i'),
                    'class' => $schedule->classRoom->name . ' - ' . $schedule->classRoom->grade->name,
                    'subject' => $schedule->subject->name,

                    // 'room' => ... (no room column yet)
                    'start_time' => $schedule->start_time,
                    'end_time' => $schedule->end_time,
                    'class_room_id' => $schedule->class_room_id // Needed for link
                ];
            });



        // Metrics
        $totalClasses = $allocations->count();

        $totalStudents = \App\Models\Student::whereIn('class_room_id', $user->allocations->pluck('class_room_id'))
            ->count();

        $todayCount = $schedules->count();

        // Calculate Average Attendance (Last 30 days)
        // Get all diaries for this professor
        $diaries = \App\Models\ClassDiary::where('user_id', $user->id)
            ->where('date', '>=', now()->subDays(30))
            ->withCount([
                'attendances as present_count' => function ($q) {
                    $q->where('status', 'present');
                }
            ])
            ->withCount('attendances as total_records')
            ->get();

        $attendanceRate = $diaries->sum('total_records') > 0
            ? round(($diaries->sum('present_count') / $diaries->sum('total_records')) * 100)
            : 0;

        return Inertia::render('Professor/Dashboard', [
            'allocations' => $allocations,
            'dailySchedule' => $schedules,
            'stats' => [
                'totalClasses' => $totalClasses,
                'totalStudents' => $totalStudents,
                'todayClasses' => $todayCount,
                'attendanceRate' => $attendanceRate,
            ]
        ]);
    }
}
