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
}
