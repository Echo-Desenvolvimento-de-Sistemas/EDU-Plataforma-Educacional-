<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Allocation;
use App\Models\ClassRoom;

class ReportController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 1. Get all classes for this professor
        $allocations = Allocation::where('user_id', $user->id)
            ->with(['classRoom', 'subject'])
            ->get();

        $classRooms = $allocations->map->classRoom->unique('id');
        $subjectIds = $allocations->pluck('subject_id')->unique();

        // 2. Metrics
        $totalStudents = 0;
        $totalClassesTaught = 0;
        $globalAttendanceSum = 0;
        $globalAttendanceCount = 0;

        $classPerformance = [];
        $studentsAtRisk = [];

        foreach ($classRooms as $classRoom) {
            $classStudents = $classRoom->students;
            $totalStudents += $classStudents->count();

            // Get allocations for this specific class to know which subjects to check
            $classAllocations = $allocations->where('class_room_id', $classRoom->id);
            $classSubjectIds = $classAllocations->pluck('subject_id');

            // Diaries count for this class (filtered by prof's subjects)
            $diaries = \App\Models\ClassDiary::where('class_room_id', $classRoom->id)
                ->whereIn('subject_id', $classSubjectIds)
                ->get();

            $diariesCount = $diaries->count();
            $totalClassesTaught += $diariesCount;

            // Calculate Class Average Attendance
            $classRawAttendance = 0;
            $classPossibleAttendance = $diariesCount * $classStudents->count();

            if ($classPossibleAttendance > 0) {
                $presentCount = \DB::table('attendances')
                    ->whereIn('class_diary_id', $diaries->pluck('id'))
                    ->where('status', 'present')
                    ->count();

                $classRawAttendance = ($presentCount / $classPossibleAttendance) * 100;
            }

            $classPerformance[] = [
                'id' => $classRoom->id,
                'name' => $classRoom->name,
                'grade' => $classRoom->grade->name,
                'attendance_rate' => round($classRawAttendance),
                'student_count' => $classStudents->count(),
            ];

            $globalAttendanceSum += $classRawAttendance * $classStudents->count(); // Weighted sum
            $globalAttendanceCount += $classStudents->count();

            // 3. Identification of Students at Risk (per student in this class)
            foreach ($classStudents as $student) {
                // Calculate student's personal attendance in this professor's subjects
                $studentPresent = \App\Models\Attendance::where('student_id', $student->id)
                    ->whereIn('class_diary_id', $diaries->pluck('id'))
                    ->where('status', 'present')
                    ->count();

                $studentRate = $diariesCount > 0 ? ($studentPresent / $diariesCount) * 100 : 100;

                // Risk Criteria: < 75% Attendance
                // (Future: Add Grade Check < 60%)
                if ($studentRate < 75) {
                    $studentsAtRisk[] = [
                        'id' => $student->id,
                        'name' => $student->name,
                        'class_name' => $classRoom->name,
                        'risk_type' => 'Baixa Frequência',
                        'value' => round($studentRate) . '%',
                        'class_room_id' => $classRoom->id, // For linking
                        'subject_id' => $classSubjectIds->first(), // Approximate link
                    ];
                }
            }
        }

        $averageAttendance = $globalAttendanceCount > 0 ? round($globalAttendanceSum / $globalAttendanceCount) : 0;

        return Inertia::render('Professor/Reports', [
            'metrics' => [
                'total_students' => $totalStudents,
                'total_classes' => $totalClassesTaught,
                'average_attendance' => $averageAttendance,
                'risk_count' => count($studentsAtRisk),
            ],
            'classPerformance' => $classPerformance,
            'studentsAtRisk' => collect($studentsAtRisk)->take(10)->values(), // Top 10 worst
        ]);
    }
}
