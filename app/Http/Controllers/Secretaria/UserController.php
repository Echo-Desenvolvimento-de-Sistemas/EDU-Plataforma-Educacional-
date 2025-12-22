<?php

namespace App\Http\Controllers\Secretaria;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ClassRoom;
use App\Models\Subject;
use App\Models\Allocation;
use App\Models\AcademicYear;
use App\Models\EducationLevel;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!$request->has('role') && !$request->has('search')) {
            return Inertia::render('Secretaria/Users/Overview');
        }

        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->role, function ($query, $role) {
                $query->where('role', $role);
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Secretaria/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Secretaria/Users/Create', [
            'classRooms' => ClassRoom::with(['grade', 'academicYear'])->get(),
            'subjects' => Subject::all(),
            'academicYears' => AcademicYear::all(),
            'educationLevels' => EducationLevel::all(),
            'grades' => Grade::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:admin,secretaria,professor,aluno',
            'cpf' => 'nullable|string|unique:users',
            'username' => 'nullable|string|unique:users',
            'active' => 'boolean',
            'allocations' => 'nullable|array',
            'allocations.*.class_room_id' => 'required|exists:class_rooms,id',
            'allocations.*.subjects' => 'required|array',
            'allocations.*.subjects.*' => 'exists:subjects,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'cpf' => $request->cpf,
            'username' => $request->username,
            'active' => $request->active ?? true,
        ]);

        if ($request->role === 'professor' && $request->has('allocations')) {
            foreach ($request->allocations as $allocation) {
                foreach ($allocation['subjects'] as $subjectId) {
                    Allocation::firstOrCreate([
                        'user_id' => $user->id,
                        'class_room_id' => $allocation['class_room_id'],
                        'subject_id' => $subjectId,
                    ]);
                }
            }
        }

        return redirect()->route('secretaria.users.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load(['allocations.classRoom.grade.educationLevel', 'allocations.classRoom.academicYear', 'allocations.subject']);

        return Inertia::render('Secretaria/Users/Edit', [
            'user' => $user,
            'classRooms' => ClassRoom::with(['grade', 'academicYear'])->get(),
            'subjects' => Subject::all(),
            'academicYears' => AcademicYear::all(),
            'educationLevels' => EducationLevel::all(),
            'grades' => Grade::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|string|in:admin,secretaria,professor,aluno',
            'cpf' => 'nullable|string|unique:users,cpf,' . $user->id,
            'username' => 'nullable|string|unique:users,username,' . $user->id,
            'active' => 'boolean',
            'allocations' => 'nullable|array',
            'allocations.*.class_room_id' => 'required|exists:class_rooms,id',
            'allocations.*.subjects' => 'required|array',
            'allocations.*.subjects.*' => 'exists:subjects,id',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'cpf' => $request->cpf,
            'username' => $request->username,
            'active' => $request->active,
        ];

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        if ($request->role === 'professor') {
            // Sync allocations
            $user->allocations()->delete();

            if ($request->has('allocations')) {
                foreach ($request->allocations as $allocation) {
                    foreach ($allocation['subjects'] as $subjectId) {
                        Allocation::create([
                            'user_id' => $user->id,
                            'class_room_id' => $allocation['class_room_id'],
                            'subject_id' => $subjectId,
                        ]);
                    }
                }
            }
        }

        return redirect()->route('secretaria.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('secretaria.users.index');
    }
}
