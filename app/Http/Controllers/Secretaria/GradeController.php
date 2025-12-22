<?php

namespace App\Http\Controllers\Secretaria;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassRoom;
use App\Models\AcademicYear;
use App\Models\Student;
use App\Models\GradingPeriod;
use App\Models\PeriodResult;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        // Get generic list of classes with filter options (e.g. current academic year is default)
        // For now, let's list all classes ordered by year and name

        $academicYearId = $request->query('academic_year_id');

        $query = ClassRoom::with(['academicYear', 'grade.educationLevel'])
            ->orderBy('name');

        if ($academicYearId) {
            $query->where('academic_year_id', $academicYearId);
        }

        $classRooms = $query->get();
        $academicYears = AcademicYear::orderByDesc('year')->get();

        return Inertia::render('Secretaria/Grades/Index', [
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

        return Inertia::render('Secretaria/Grades/Show', [
            'classRoom' => $classRoom,
            'students' => $classRoom->students,
        ]);
    }

    public function reportCard(Student $student)
    {
        // Assuming student belongs to a class, and we want report card for that class/year.
        // We might need to pass classRoomId if student has history, but for now take current.

        $classRoom = $student->classRoom; // Assuming relation exists or we get it via enrollment

        if (!$classRoom) {
            return back()->with('error', 'Aluno não enturmado.');
        }

        $classRoom->load(['grade', 'academicYear']);

        $academicYearId = $classRoom->academic_year_id;

        $periods = GradingPeriod::where('academic_year_id', $academicYearId)
            ->orderBy('start_date')
            ->get();

        // Get Period Results
        $results = PeriodResult::with(['subject'])
            ->where('student_id', $student->id)
            ->where('class_room_id', $classRoom->id)
            ->get(); // Collection of results. We might want to group by Subject on frontend.

        // Fetch School Settings
        $settings = \App\Models\Setting::whereIn('key', ['logo_url', 'school_name'])->pluck('value', 'key');
        $schoolName = $settings['school_name'] ?? 'Edu Escola'; // Default fallback
        $logoUrl = $settings['logo_url'] ?? null;

        return Inertia::render('Secretaria/Grades/ReportCard', [
            'student' => $student,
            'classRoom' => $classRoom,
            'periods' => $periods,
            'results' => $results,
            'schoolName' => $schoolName,
            'logoUrl' => $logoUrl,
        ]);
    }
}
