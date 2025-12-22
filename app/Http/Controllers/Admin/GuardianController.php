<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guardian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuardianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Guardian::query()->latest();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('cpf', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $guardians = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Guardians/Index', [
            'guardians' => $guardians,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $grades = \App\Models\Grade::with('classRooms')->get();
        return Inertia::render('Admin/Guardians/Create', [
            'grades' => $grades,
        ]);
    }

    public function store(Request $request, \App\Services\AccessControlService $accessService)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'cpf' => 'required|string|max:14|unique:guardians',
            'phone' => 'nullable|string|max:20',
            'rg' => 'nullable|string|max:20',
            'profession' => 'nullable|string|max:255',
            'workplace' => 'nullable|string|max:255',
            'phone_work' => 'nullable|string|max:20',
            'phone_home' => 'nullable|string|max:20',
        ]);

        \DB::transaction(function () use ($request, $accessService) {
            $guardian = Guardian::create($request->all());

            // Attach Students if provided
            if ($request->has('students')) {
                foreach ($request->input('students') as $studentLink) {
                    $pivotData = [
                        'is_financial_responsible' => in_array($studentLink['type'], ['financial', 'both']),
                        'is_pedagogic_responsible' => in_array($studentLink['type'], ['pedagogic', 'both']),
                    ];
                    $guardian->students()->attach($studentLink['student_id'], $pivotData);
                }
            }

            $accessService->createAccess($guardian);
        });

        return redirect()->route('admin.guardians.index')->with('success', 'Responsável cadastrado com acesso criado.');
    }

    public function edit(Guardian $guardian)
    {
        $guardian->load(['students.classRoom.grade', 'user']);
        $grades = \App\Models\Grade::with('classRooms')->get();
        return Inertia::render('Admin/Guardians/Edit', [
            'guardian' => $guardian,
            'grades' => $grades,
        ]);
    }

    public function update(Request $request, Guardian $guardian)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'cpf' => 'required|string|max:14|unique:guardians,cpf,' . $guardian->id,
            'phone' => 'nullable|string|max:20',
            'rg' => 'nullable|string|max:20',
            'profession' => 'nullable|string|max:255',
            'workplace' => 'nullable|string|max:255',
            'phone_work' => 'nullable|string|max:20',
            'phone_home' => 'nullable|string|max:20',
        ]);

        $guardian->update($request->all());

        return redirect()->back(); // Stay on edit page
    }

    public function destroy(Guardian $guardian)
    {
        $guardian->delete();
        return redirect()->route('admin.guardians.index');
    }

    public function attachStudent(Request $request, Guardian $guardian)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'type' => 'required|string|in:financial,pedagogic,both,other', // Example types
        ]);

        // Map 'type' to pivot columns
        $pivotData = [
            'is_financial_responsible' => in_array($request->type, ['financial', 'both']),
            'is_pedagogic_responsible' => in_array($request->type, ['pedagogic', 'both']),
            // 'kinship' => 'Responsável', // Default or ask user?
        ];

        $guardian->students()->attach($request->student_id, $pivotData);

        return redirect()->back()->with('success', 'Estudante vinculado com sucesso.');
    }

    public function detachStudent(Guardian $guardian, \App\Models\Student $student)
    {
        $guardian->students()->detach($student->id);
        return redirect()->back()->with('success', 'Vínculo removido com sucesso.');
    }

    public function getStudentsByClass(\App\Models\ClassRoom $classRoom)
    {
        return response()->json($classRoom->students()->select('id', 'name')->get());
    }

    public function toggleStatus(Guardian $guardian)
    {
        $guardian->update(['active' => !$guardian->active]);

        return redirect()->back()->with('success', 'Status do responsável atualizado com sucesso.');
    }

    public function createUser(Guardian $guardian, \App\Services\AccessControlService $accessService)
    {
        try {
            $accessService->createAccess($guardian);
            return redirect()->back()->with('success', 'Acesso de usuário criado com sucesso.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors());
        }
    }
}
