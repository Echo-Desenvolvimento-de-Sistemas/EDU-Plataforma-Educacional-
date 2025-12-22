<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PreRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PreRegistrationController extends Controller
{
    public function index()
    {
        $preRegistrations = PreRegistration::with([
            'creator',
            'targetClass',
            'student',
            'student.address',
            'student.health',
            'student.guardians'
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        $classRooms = \App\Models\ClassRoom::with(['academicYear', 'grade'])->get();
        $academicYears = \App\Models\AcademicYear::orderBy('year', 'desc')->get();
        // Limit students to active ones for performance, or implement search later
        $students = \App\Models\Student::select('id', 'name', 'cpf')->orderBy('name')->get();

        return Inertia::render('Admin/PreRegistrations/Index', [
            'preRegistrations' => $preRegistrations,
            'classRooms' => $classRooms,
            'academicYears' => $academicYears,
            'students' => $students,
        ]);
    }

    public function migrate($id)
    {
        $preRegistration = PreRegistration::findOrFail($id);

        if ($preRegistration->status !== 'completed' || !$preRegistration->student_id || !$preRegistration->target_class_id) {
            return redirect()->back()->with('error', 'Pré-matrícula inválida para migração.');
        }

        $student = $preRegistration->student;
        $student->class_room_id = $preRegistration->target_class_id;
        $student->save();

        return redirect()->back()->with('success', 'Aluno migrado com sucesso para a turma alvo.');
    }

    public function batchMigrate()
    {
        $preRegistrations = PreRegistration::where('status', 'completed')
            ->whereNotNull('target_class_id')
            ->whereNotNull('student_id')
            ->with('student')
            ->get();

        $count = 0;

        foreach ($preRegistrations as $pr) {
            if ($pr->student) {
                // Check if already in target class to avoid redundant updates? 
                // Or just force update. Force update is safer to ensure consistency.
                if ($pr->student->class_room_id !== $pr->target_class_id) {
                    $pr->student->class_room_id = $pr->target_class_id;
                    $pr->student->save();
                    $count++;
                }
            }
        }

        if ($count === 0) {
            return redirect()->back()->with('info', 'Nenhum aluno precisou ser migrado.');
        }

        return redirect()->back()->with('success', "Processo concluído: {$count} alunos foram migrados para suas novas turmas.");
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_name' => 'nullable|string|max:255',
            'target_class_id' => 'nullable|exists:class_rooms,id',
            'student_id' => 'nullable|exists:students,id',
            'type' => 'required|in:new,renewal',
        ]);

        PreRegistration::create([
            'token' => Str::random(32),
            'student_name' => $request->student_name,
            'created_by' => auth()->id(),
            'target_class_id' => $request->target_class_id,
            'student_id' => $request->student_id,
            'type' => $request->type,
        ]);

        return redirect()->back();
    }

    public function show(PreRegistration $preRegistration)
    {
        $preRegistration->load([
            'creator',
            'targetClass',
            'student.address',
            'student.health',
            'student.guardians'
        ]);
        return response()->json($preRegistration);
    }

    public function destroy($id)
    {
        $preRegistration = PreRegistration::find($id);

        if ($preRegistration) {
            $preRegistration->delete();
        }

        return redirect()->back();
    }
}
