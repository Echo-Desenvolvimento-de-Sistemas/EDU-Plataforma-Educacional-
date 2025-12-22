<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\ClassRoom;
use App\Models\StudentGrade;
use App\Services\GradeCalculationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GradeController extends Controller
{
    public function entry()
    {
        $user = auth()->user();

        // Get classes and subjects assigned to professor
        // We structure this as: 
        // [
        //    { 
        //      id: class_id, 
        //      name: class_name, 
        //      subjects: [{ id: subject_id, name: subject_name }] 
        //    }
        // ]

        $allocations = $user->allocations()
            ->with(['classRoom', 'subject'])
            ->get();

        $classes = $allocations->groupBy('class_room_id')->map(function ($items) {
            $first = $items->first();
            return [
                'id' => $first->classRoom->id,
                'name' => $first->classRoom->name,
                'subjects' => $items->map(function ($item) {
                    return [
                        'id' => $item->subject->id,
                        'name' => $item->subject->name
                    ];
                })->values()
            ];
        })->values();

        // Get grading periods for current year (Assuming active academic year)
        // For simplicity getting all for now, ideally filtered by active year
        $gradingPeriods = \App\Models\GradingPeriod::orderBy('start_date')->get();

        return \Inertia\Inertia::render('Professor/Grades/Index', [
            'classes' => $classes,
            'gradingPeriods' => $gradingPeriods
        ]);
    }

    public function index(ClassRoom $classRoom, Request $request)
    {
        $gradingPeriodId = $request->query('grading_period_id');
        $subjectId = $request->query('subject_id');

        if (!$gradingPeriodId || !$subjectId) {
            return response()->json(['assessments' => [], 'grades' => [], 'students' => []]);
        }

        // Fetch Assessments
        $assessments = Assessment::where('class_room_id', $classRoom->id)
            ->where('grading_period_id', $gradingPeriodId)
            ->where('subject_id', $subjectId)
            ->orderBy('date')
            ->get();

        // Fetch Students
        $students = $classRoom->students()
            ->select('students.id', 'students.name')
            ->orderBy('name')
            ->get();

        // Fetch Grades
        // We need all grades for these assessments
        $grades = StudentGrade::whereIn('assessment_id', $assessments->pluck('id'))
            ->get()
            ->groupBy('student_id')
            ->map(function ($studentGrades) {
                return $studentGrades->keyBy('assessment_id')->map->score;
            });

        return response()->json([
            'assessments' => $assessments,
            'grades' => $grades,
            'students' => $students
        ]);
    }

    public function storeBatch(Request $request, ClassRoom $classRoom, GradeCalculationService $calculationService)
    {
        $validated = $request->validate([
            'grading_period_id' => 'required|exists:grading_periods,id',
            'subject_id' => 'required|exists:subjects,id',
            'grades' => 'required|array', // Structure: [{ assessment_id: 1, student_id: 2, score: 10 }, ...]
            'grades.*.assessment_id' => 'required|exists:assessments,id',
            'grades.*.student_id' => 'required|exists:students,id',
            'grades.*.score' => 'nullable|numeric|min:0|max:1000', // Relaxed max check, relying on frontend and business logic
        ]);

        DB::transaction(function () use ($validated, $classRoom, $calculationService) {
            foreach ($validated['grades'] as $gradeData) {
                StudentGrade::updateOrCreate(
                    [
                        'assessment_id' => $gradeData['assessment_id'],
                        'student_id' => $gradeData['student_id'],
                    ],
                    [
                        'score' => $gradeData['score'],
                        'submitted_at' => now(), // Or use payload date
                    ]
                );

                // Recalculate average for this student
                $calculationService->calculatePeriodAverage(
                    $gradeData['student_id'],
                    $classRoom->id,
                    $validated['subject_id'],
                    $validated['grading_period_id']
                );
            }
        });

        return back()->with('success', 'Notas salvas com sucesso.');
    }
}
