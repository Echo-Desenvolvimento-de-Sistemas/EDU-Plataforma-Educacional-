<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\ClassRoom;
use App\Models\Grade;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnsalamentoController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['academic_year_id', 'grade_id', 'class_room_id', 'search']);

        $academicYears = AcademicYear::orderBy('year', 'desc')->get();
        $grades = Grade::all();
        $classRooms = ClassRoom::when($request->grade_id, function ($query, $gradeId) {
            $query->where('grade_id', $gradeId);
        })->when($request->academic_year_id, function ($query, $yearId) {
            $query->where('academic_year_id', $yearId);
        })->get();

        // Students available for assignment (not in the selected class, or no class)
        // If a target class is selected, we might want to show students NOT in that class but eligible.
        // For now, let's fetch students based on filters.

        $studentsQuery = Student::query()
            ->with('classRoom')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            // If we have a grade filter, we might want to filter students by age or previous grade? 
            // Often "Ensalamento" is just taking students and putting them in a class.
            // Let's filter by unassigned if no class is selected, or just all students matching search.
            ->orderBy('name');

        // Logic: specific requirements might vary. 
        // Let's return a list of students that can be dragged/selected.

        $students = $studentsQuery->paginate(50)->withQueryString();

        return Inertia::render('Admin/Ensalamento/Index', [
            'academicYears' => $academicYears,
            'grades' => $grades,
            'classRooms' => $classRooms,
            'students' => $students,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        Student::whereIn('id', $request->student_ids)->update([
            'class_room_id' => $request->class_room_id
        ]);

        return back()->with('success', 'Alunos enturmados com sucesso!');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        Student::whereIn('id', $request->student_ids)->update([
            'class_room_id' => null
        ]);

        return back()->with('success', 'Alunos removidos da turma com sucesso!');
    }
}
