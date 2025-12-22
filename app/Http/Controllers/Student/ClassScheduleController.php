<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassSchedule;
use App\Models\TimeSlot; // Assuming we have this or similar for distinct times?
// Note: ClassSchedule usually has day_of_week, start_time, end_time, subject_id.

class ClassScheduleController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $student = $user->student;

        if (!$student || !$student->class_room_id) {
            return redirect()->route('aluno.dashboard')->with('error', 'Aluno não enturmado.');
        }

        // Fetch Schedules
        $schedules = ClassSchedule::where('class_room_id', $student->class_room_id)
            ->with(['subject'])
            ->orderBy('start_time')
            ->get()
            ->groupBy('day_of_week'); // 0=Sunday, 1=Monday... or 1=Sunday depending on ISO

        // Let's structure it for a calendar view
        // Days: Segunda (1) to Sexta (5)

        $calendar = [];
        $days = [
            1 => 'Segunda-feira',
            2 => 'Terça-feira',
            3 => 'Quarta-feira',
            4 => 'Quinta-feira',
            5 => 'Sexta-feira'
        ];

        foreach ($days as $dayNum => $dayName) {
            $dailySchedules = isset($schedules[$dayNum]) ? $schedules[$dayNum] : collect([]);
            $calendar[] = [
                'day_name' => $dayName,
                'classes' => $dailySchedules->map(function ($sched) {
                    return [
                        'id' => $sched->id,
                        'subject' => $sched->subject->name,
                        'start_time' => substr($sched->start_time, 0, 5),
                        'end_time' => substr($sched->end_time, 0, 5),
                        'professor' => 'N/A' // Not directly linked to schedule currently
                    ];
                })->values()
            ];
        }

        return Inertia::render('Aluno/Schedule/Index', [
            'schedule' => $calendar
        ]);
    }
}
