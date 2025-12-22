<?php

namespace App\Http\Controllers\Secretaria;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BatchEnrollmentController extends Controller
{
    /**
     * Display the batch enrollment page.
     */
    public function index()
    {
        // Fetch all classes for the selection dropdowns
        // Grouping by grade or level might be nice, but simple list is fine for now
        $classes = ClassRoom::with(['grade', 'academicYear'])
            ->orderBy('name')
            ->get()
            ->map(function ($class) {
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'grade_name' => $class->grade->name ?? 'N/A',
                    'academic_year' => $class->academicYear->year ?? 'N/A',
                    'full_label' => "{$class->name} ({$class->grade->name} - {$class->academicYear->year})",
                ];
            });

        return Inertia::render('Secretaria/BatchEnrollment/Index', [
            'classes' => $classes,
        ]);
    }

    /**
     * Store the batch enrollment (move students).
     */
    public function store(Request $request)
    {
        $request->validate([
            'source_class_id' => 'required|exists:class_rooms,id',
            'destination_class_id' => 'required|exists:class_rooms,id|different:source_class_id',
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'exists:students,id',
        ]);

        try {
            DB::transaction(function () use ($request) {
                Student::whereIn('id', $request->student_ids)
                    ->where('class_room_id', $request->source_class_id) // Safety check
                    ->update(['class_room_id' => $request->destination_class_id]);
            });

            return redirect()->back()->with('success', count($request->student_ids) . ' alunos movidos com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao mover alunos: ' . $e->getMessage()]);
        }
    }
}
