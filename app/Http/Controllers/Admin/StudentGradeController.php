<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassRoom;
use App\Models\AcademicYear;
use App\Models\Student;
use App\Models\GradingPeriod;
use App\Models\PeriodResult;

class StudentGradeController extends Controller
{
    public function index(Request $request)
    {
        $academicYearId = $request->query('academic_year_id');

        $query = ClassRoom::with(['academicYear', 'grade.educationLevel'])
            ->orderBy('name');

        if ($academicYearId) {
            $query->where('academic_year_id', $academicYearId);
        }

        $classRooms = $query->get();
        $academicYears = AcademicYear::orderByDesc('year')->get();

        return Inertia::render('Admin/StudentGrades/Index', [
            'classRooms' => $classRooms,
            'academicYears' => $academicYears,
            'filters' => [
                'academic_year_id' => $academicYearId
            ]
        ]);
    }

    public function show(ClassRoom $classRoom)
    {
        $classRoom->load(['students.user', 'grade', 'academicYear']);

        return Inertia::render('Admin/StudentGrades/Show', [
            'classRoom' => $classRoom,
            'students' => $classRoom->students,
        ]);
    }

    public function reportCard(Student $student)
    {
        $classRoom = $student->classRoom;

        if (!$classRoom) {
            return back()->with('error', 'Aluno não enturmado.');
        }

        $classRoom->load(['grade', 'academicYear']);

        $academicYearId = $classRoom->academic_year_id;

        $periods = GradingPeriod::where('academic_year_id', $academicYearId)
            ->orderBy('start_date')
            ->get();

        $results = PeriodResult::with(['subject'])
            ->where('student_id', $student->id)
            ->where('class_room_id', $classRoom->id)
            ->get();

        $settings = \App\Models\Setting::whereIn('key', ['logo_url', 'school_name'])->pluck('value', 'key');
        $schoolName = $settings['school_name'] ?? 'Edu Escola';
        $logoUrl = $settings['logo_url'] ?? null;

        return Inertia::render('Admin/StudentGrades/ReportCard', [
            'student' => $student,
            'classRoom' => $classRoom,
            'periods' => $periods,
            'results' => $results,
            'schoolName' => $schoolName,
            'logoUrl' => $logoUrl,
        ]);
    }

    public function entry()
    {
        $subjects = \App\Models\Subject::orderBy('name')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'name' => $s->name,
            ];
        })->values();

        $classes = ClassRoom::with(['grade', 'academicYear'])->orderBy('name')->get()->map(function ($class) {
            return [
                'id' => $class->id,
                'name' => $class->name . ' (' . ($class->grade->name ?? '') . ')',
            ];
        })->values();

        $gradingPeriods = GradingPeriod::orderBy('start_date')->get();

        return Inertia::render('Admin/StudentGrades/Entry', [
            'classes' => $classes,
            'subjects' => $subjects,
            'gradingPeriods' => $gradingPeriods
        ]);
    }

    public function getGradesApi(ClassRoom $classRoom, Request $request)
    {
        $gradingPeriodId = $request->query('grading_period_id');
        $subjectId = $request->query('subject_id');

        if (!$gradingPeriodId || !$subjectId) {
            return response()->json(['assessments' => [], 'grades' => [], 'students' => []]);
        }

        $assessments = \App\Models\Assessment::where('class_room_id', $classRoom->id)
            ->where('grading_period_id', $gradingPeriodId)
            ->where('subject_id', $subjectId)
            ->orderBy('date')
            ->get();

        $students = $classRoom->students()
            ->select('students.id', 'students.name')
            ->orderBy('name')
            ->get();

        $grades = \App\Models\StudentGrade::whereIn('assessment_id', $assessments->pluck('id'))
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

    public function storeBatch(Request $request, ClassRoom $classRoom, \App\Services\GradeCalculationService $calculationService)
    {
        $validated = $request->validate([
            'grading_period_id' => 'required|exists:grading_periods,id',
            'subject_id' => 'required|exists:subjects,id',
            'grades' => 'required|array',
            'grades.*.assessment_id' => 'required|exists:assessments,id',
            'grades.*.student_id' => 'required|exists:students,id',
            'grades.*.score' => 'nullable|numeric|min:0|max:1000',
        ]);

        \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $classRoom, $calculationService) {
            $studentIds = [];

            foreach ($validated['grades'] as $gradeData) {
                \App\Models\StudentGrade::updateOrCreate(
                    [
                        'assessment_id' => $gradeData['assessment_id'],
                        'student_id' => $gradeData['student_id'],
                    ],
                    [
                        'score' => $gradeData['score'],
                        'submitted_at' => now(),
                    ]
                );
                
                $studentIds[] = $gradeData['student_id'];
            }

            $uniqueStudentIds = array_unique($studentIds);
            foreach ($uniqueStudentIds as $studentId) {
                $calculationService->calculatePeriodAverage(
                    $studentId,
                    $classRoom->id,
                    $validated['subject_id'],
                    $validated['grading_period_id']
                );
            }
        });

        return back()->with('success', 'Notas salvas com sucesso.');
    }

    public function storeAssessment(Request $request, ClassRoom $classRoom)
    {
        $validated = $request->validate([
            'grading_period_id' => 'required|exists:grading_periods,id',
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'max_points' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'is_recovery' => 'boolean',
        ]);

        $assessment = \App\Models\Assessment::create([
            ...$validated,
            'class_room_id' => $classRoom->id,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Avaliação criada com sucesso.',
                'assessment' => $assessment
            ]);
        }

        return back()->with('success', 'Avaliação criada com sucesso.');
    }

    public function destroyAssessment(ClassRoom $classRoom, \App\Models\Assessment $assessment)
    {
        if ($assessment->class_room_id !== $classRoom->id) {
            abort(404);
        }

        $assessment->delete();
        return back()->with('success', 'Avaliação excluída.');
    }
}

