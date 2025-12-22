<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Allocation;
use App\Models\ClassRoom;
use App\Models\GradingPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ClassRoomController extends Controller
{
    /**
     * List all classes for the professor.
     */
    public function index()
    {
        $user = Auth::user();

        $classes = $user->allocations()
            ->with(['classRoom.grade', 'classRoom.academicYear', 'classRoom.students'])
            ->get()
            ->groupBy('class_room_id')
            ->map(function ($allocs) {
                $first = $allocs->first();
                $classRoom = $first->classRoom;

                // Calculate simple metrics
                $studentCount = $classRoom->students->count();

                // Calculate average attendance for this class (broad approximation)
                // In a real app, this might need a cached aggregate or more complex query
                $totalDiaries = \App\Models\ClassDiary::where('class_room_id', $classRoom->id)->count();
                $attendanceRate = 0;

                if ($totalDiaries > 0 && $studentCount > 0) {
                    $totalPossible = $totalDiaries * $studentCount;
                    // Count specific attendances (present or justified maybe?)
                    // For now, let's just use raw 'present' count
                    $presentCount = \DB::table('attendances')
                        ->join('class_diaries', 'attendances.class_diary_id', '=', 'class_diaries.id')
                        ->where('class_diaries.class_room_id', $classRoom->id)
                        ->where('attendances.status', 'present')
                        ->count();

                    $attendanceRate = round(($presentCount / $totalPossible) * 100);
                }

                return [
                    'id' => $classRoom->id,
                    'name' => $classRoom->name,
                    'grade' => $classRoom->grade->name,
                    'year' => $classRoom->academicYear->year,
                    'student_count' => $studentCount,
                    'attendance_rate' => $attendanceRate,
                    'subjects' => $allocs->map(fn($a) => $a->subject->name)->unique()->values(),
                ];
            })
            ->values();

        return Inertia::render('Professor/Classes/Index', [
            'classes' => $classes
        ]);
    }

    /**
     * Show class details, assessments, and gradebook.
     */
    public function show(ClassRoom $classRoom, Request $request)
    {
        // 1. Verify access (Professor must have an allocation in this class)
        $user = Auth::user();
        $allocations = Allocation::where('user_id', $user->id)
            ->where('class_room_id', $classRoom->id)
            ->with('subject')
            ->get();

        if ($allocations->isEmpty()) {
            abort(403, 'Você não tem acesso a esta turma.');
        }

        $subjects = $allocations->map(fn($a) => $a->subject);
        // Default to first subject if not specified
        $selectedSubjectId = $request->query('subject_id', $subjects->first()->id);

        // Ensure selected subject is valid for this professor
        if (!$subjects->contains('id', $selectedSubjectId)) {
            $selectedSubjectId = $subjects->first()->id;
        }

        // 2. Get active academic year from class
        $academicYearId = $classRoom->academic_year_id;
        $periods = GradingPeriod::where('academic_year_id', $academicYearId)->get();

        // 3. Get students in this class
        // With basic attendance stats per student for the 'Overview' tab
        $students = $classRoom->students()->with('user')->orderBy('name')->get()->map(function ($student) use ($classRoom, $selectedSubjectId) {
            // Calculate attendance % for this student in this subject
            $diariesCount = \App\Models\ClassDiary::where('class_room_id', $classRoom->id)
                ->where('subject_id', $selectedSubjectId)
                ->count();

            $presentCount = \App\Models\Attendance::where('student_id', $student->id)
                ->whereHas('classDiary', function ($q) use ($classRoom, $selectedSubjectId) {
                    $q->where('class_room_id', $classRoom->id)
                        ->where('subject_id', $selectedSubjectId);
                })
                ->where('status', 'present')
                ->count();

            $attendanceRate = $diariesCount > 0 ? round(($presentCount / $diariesCount) * 100) : 100;

            return [
                'id' => $student->id,
                'name' => $student->name,
                'user' => $student->user,
                'attendance_rate' => $attendanceRate,
            ];
        });

        // 4. Fetch Attendance History (Diaries)
        $attendanceHistory = \App\Models\ClassDiary::where('class_room_id', $classRoom->id)
            ->where('subject_id', $selectedSubjectId)
            ->orderBy('date', 'desc')
            ->limit(15)
            ->get();

        // 5. Class Metrics for this Subject
        $classAttendanceRate = $students->avg('attendance_rate');

        return Inertia::render('Professor/ClassRoom/Show', [
            'classRoom' => $classRoom->load('grade'),
            'subjects' => $subjects,
            'selectedSubjectId' => (int) $selectedSubjectId,
            'periods' => $periods,
            'students' => $students,
            'attendanceHistory' => $attendanceHistory,
            'metrics' => [
                'attendance_rate' => round($classAttendanceRate ?? 0),
                'student_count' => $students->count(),
            ]
        ]);
    }

    /**
     * Show individual student details (Grades + Attendance).
     */
    public function student(ClassRoom $classRoom, \App\Models\Student $student, Request $request)
    {
        $user = Auth::user();
        $selectedSubjectId = $request->query('subject_id');

        // Verify access
        $hasAccess = Allocation::where('user_id', $user->id)
            ->where('class_room_id', $classRoom->id)
            ->when($selectedSubjectId, fn($q) => $q->where('subject_id', $selectedSubjectId))
            ->exists();

        if (!$hasAccess)
            abort(403);

        if (!$selectedSubjectId) {
            // Default to first subject found for this prof/class
            $firstAlloc = Allocation::where('user_id', $user->id)->where('class_room_id', $classRoom->id)->first();
            $selectedSubjectId = $firstAlloc->subject_id;
        }

        $subject = \App\Models\Subject::findOrFail($selectedSubjectId);

        // 1. Attendance History
        $attendanceHistory = \App\Models\Attendance::where('student_id', $student->id)
            ->whereHas('classDiary', function ($q) use ($classRoom, $selectedSubjectId) {
                $q->where('class_room_id', $classRoom->id)
                    ->where('subject_id', $selectedSubjectId);
            })
            ->with('classDiary')
            ->get()
            ->sortByDesc('classDiary.date')
            ->values();

        // 2. Grades
        // Fetch all assessments and the student's grades
        // Use the GradeController logic or re-implement fetching
        $academicYearId = $classRoom->academic_year_id;
        $periods = GradingPeriod::where('academic_year_id', $academicYearId)->with([
            'assessments' => function ($q) use ($classRoom, $selectedSubjectId) {
                $q->where('class_room_id', $classRoom->id)
                    ->where('subject_id', $selectedSubjectId);
            },
            'assessments.grades' => function ($q) use ($student) {
                $q->where('student_id', $student->id);
            }
        ])->get();

        return Inertia::render('Professor/ClassRoom/Student', [
            'classRoom' => $classRoom,
            'student' => $student,
            'subject' => $subject,
            'attendanceHistory' => $attendanceHistory,
            'periods' => $periods,
        ]);
    }
}
