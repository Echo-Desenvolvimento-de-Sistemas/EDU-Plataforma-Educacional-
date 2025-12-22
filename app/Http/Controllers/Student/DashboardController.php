<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Activity;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $student = $user->student;

        if (!$student || !$student->class_room_id) {
            return Inertia::render('Aluno/Dashboard', [
                'activities' => [],
                'student' => $student,
                'attendancePercentage' => 0,
                'pendingCount' => 0
            ]);
        }

        // 1. Activities (Pending)
        $activities = Activity::where('class_room_id', $student->class_room_id)
            ->where(function ($q) {
                $q->whereNull('deadline')
                    ->orWhere('deadline', '>', now());
            })
            ->whereDoesntHave('attempts', function ($q) use ($student) {
                $q->where('student_id', $student->id);
            })
            ->with(['classRoom', 'discipline'])
            ->latest()
            ->take(5) // Limit for dashboard
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'title' => $activity->title,
                    'description' => $activity->description,
                    'deadline' => $activity->deadline,
                    'subject' => $activity->discipline ? $activity->discipline->name : 'Geral', // Assuming relation is 'discipline' or 'subject'
                    'class_room' => $activity->classRoom ? ['name' => $activity->classRoom->name] : null,
                ];
            });

        $pendingCount = Activity::where('class_room_id', $student->class_room_id)
            ->where(function ($q) {
                $q->whereNull('deadline')
                    ->orWhere('deadline', '>', now());
            })
            ->whereDoesntHave('attempts', function ($q) use ($student) {
                $q->where('student_id', $student->id);
            })
            ->count();

        // 2. Attendance Stats (Simplified Global)
        // We reuse the logic: (Total Classes - Total Absences) / Total Classes
        $totalClasses = \App\Models\ClassDiary::where('class_room_id', $student->class_room_id)->sum('classes_count');

        $totalAbsences = \App\Models\Attendance::where('student_id', $student->id)
            ->where('status', 'absent')
            ->join('class_diaries', 'attendances.class_diary_id', '=', 'class_diaries.id')
            ->sum('class_diaries.classes_count');

        $attendancePercentage = $totalClasses > 0
            ? round((($totalClasses - $totalAbsences) / $totalClasses) * 100, 1)
            : 100;

        return Inertia::render('Aluno/Dashboard', [
            'activities' => $activities,
            'student' => $student->load('classRoom'),
            'attendancePercentage' => $attendancePercentage,
            'pendingCount' => $pendingCount
        ]);
    }
}
