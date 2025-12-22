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

        // Overall Stats
        $totalClassesOverall = 0;
        $totalAbsencesOverall = 0;

        foreach ($subjects as $subject) {
            // 1. Total Classes for this Subject in this Class
            $totalClasses = ClassDiary::where('class_room_id', $student->class_room_id)
                ->where('subject_id', $subject->id)
                ->sum('classes_count');

            // 2. Total Absences
            $absences = Attendance::where('student_id', $student->id)
                ->where('status', 'absent')
                ->whereHas('classDiary', function ($q) use ($subject) {
                    $q->where('subject_id', $subject->id);
                })
                ->get()
                ->sum(function ($att) {
                    return $att->classDiary->classes_count;
                });

            // 3. Justified
            $justified = Attendance::where('student_id', $student->id)
                // Assuming we might mark 'justified' directly in status or via separate logic
                // For now, let's treat status 'justified' if it exists, or rely on AbsenceJustification model
                // For simplicity in this view, let's assume raw count from Attendance table if we used status='justified' or 'absent'
                // But wait, the previous controller used 'absent' + Justification Model.
                // Let's stick to simplest display: Total Absences vs Total Classes.
                ->where('status', 'justified') // If we updated status
                ->count();

            // Percentage
            $percentage = $totalClasses > 0
                ? round((($totalClasses - $absences) / $totalClasses) * 100, 1)
                : 100;

            $attendanceStats[] = [
                'subject' => $subject->name,
                'total_classes' => $totalClasses,
                'total_absences' => $absences,
                'percentage' => $percentage
            ];

            $totalClassesOverall += $totalClasses;
            $totalAbsencesOverall += $absences;
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
