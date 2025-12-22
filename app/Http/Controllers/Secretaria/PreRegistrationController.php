<?php

namespace App\Http\Controllers\Secretaria;

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

        $classRooms = \App\Models\ClassRoom::all();
        // Limit students to active ones for performance, or implement search later
        $students = \App\Models\Student::select('id', 'name', 'cpf')->orderBy('name')->get();

        return Inertia::render('Secretaria/PreRegistrations/Index', [
            'preRegistrations' => $preRegistrations,
            'classRooms' => $classRooms,
            'students' => $students,
        ]);
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
