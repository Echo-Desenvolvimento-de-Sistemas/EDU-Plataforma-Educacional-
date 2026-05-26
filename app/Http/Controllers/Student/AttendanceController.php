<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Subject;
use App\Models\Attendance;
use App\Models\ClassDiary;

class AttendanceController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $student = $user->student;

        if (!$student || !$student->class_room_id) {
            return redirect()->route('aluno.dashboard')->with('error', 'Aluno não enturmado.');
        }

        $subjects = Subject::orderBy('name')->get();
        $attendanceStats = [];

        // 1. Pre-fetch all class diaries for this class
        $classDiaries = ClassDiary::where('class_room_id', $student->class_room_id)->get();
        
        // Group classes count by subject
        $classesPerSubject = $classDiaries->groupBy('subject_id')->map(function ($diaries) {
            return $diaries->sum('classes_count');
        });

        // 2. Pre-fetch all absences for this student with related class diary
        $absences = Attendance::with('classDiary')
            ->where('student_id', $student->id)
            ->where('status', 'absent')
            ->get();
            
        // Group absences by subject
        $absencesPerSubject = $absences->groupBy(function ($att) {
            return $att->classDiary->subject_id ?? null;
        })->map(function ($atts) {
            return $atts->sum(function ($att) {
                return $att->classDiary->classes_count ?? 0;
            });
        });

        $totalClassesOverall = 0;
        $totalAbsencesOverall = 0;

        foreach ($subjects as $subject) {
            $totalClasses = $classesPerSubject->get($subject->id, 0);
            $absencesCount = $absencesPerSubject->get($subject->id, 0);

            // Percentage
            $percentage = $totalClasses > 0
                ? round((($totalClasses - $absencesCount) / $totalClasses) * 100, 1)
                : 100;

            $attendanceStats[] = [
                'subject' => $subject->name,
                'total_classes' => $totalClasses,
                'total_absences' => $absencesCount,
                'percentage' => $percentage
            ];

            $totalClassesOverall += $totalClasses;
            $totalAbsencesOverall += $absencesCount;
        }

        $overallPercentage = $totalClassesOverall > 0
            ? round((($totalClassesOverall - $totalAbsencesOverall) / $totalClassesOverall) * 100, 1)
            : 100;

        return Inertia::render('Aluno/Attendance/Index', [
            'stats' => $attendanceStats,
            'overall' => [
                'percentage' => $overallPercentage,
                'total_absences' => $totalAbsencesOverall
            ]
        ]);
    }
}
