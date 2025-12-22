<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Student::with('classRoom');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('cpf', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%");
            });
        }

        if ($request->has('class_room_id') && $request->input('class_room_id') !== 'all') {
            $query->where('class_room_id', $request->input('class_room_id'));
        }

        $students = $query->paginate(10)->withQueryString();
        $classRooms = ClassRoom::all();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'classRooms' => $classRooms,
            'filters' => $request->only(['search', 'class_room_id']),
        ]);
    }

    public function create()
    {
        $classRooms = ClassRoom::all();
        return Inertia::render('Admin/Students/Create', [
            'classRooms' => $classRooms,
        ]);
    }

    public function store(Request $request, \App\Services\AccessControlService $accessService)
    {
        $validated = $request->validate([
            // Student
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'cpf' => 'required|string|max:14|unique:students',
            'rg' => 'nullable|string|max:20',
            'certidao_nascimento' => 'nullable|string|max:255', // Legacy field, keeping for now or mapping
            'medical_info' => 'nullable|string', // Legacy
            'emergency_contact' => 'nullable|string', // Legacy
            'class_room_id' => 'nullable|exists:class_rooms,id',
            'photo_path' => 'nullable|string',
            'social_name' => 'nullable|string|max:255',
            'sex' => 'required|in:M,F',
            'color_race' => 'required|string',
            'nationality' => 'nullable|string',
            'place_of_birth' => 'nullable|string',
            'state_of_birth' => 'nullable|string',
            'rg_issuer' => 'nullable|string',
            'rg_state' => 'nullable|string',
            'rg_date' => 'nullable|date',
            'birth_cert_model' => 'required|in:new,old',
            'birth_cert_number' => 'nullable|string',
            'birth_cert_old_info' => 'nullable|array',
            'nis' => 'nullable|string',
            'mother_name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'parents_marital_status' => 'nullable|string',
            'authorized_pickups' => 'nullable|array',
            'exit_authorization' => 'boolean',
            'transport_info' => 'nullable|string',
            'enrollment_date' => 'nullable|date',
            'status' => 'required|in:active,cancelled,transferred,graduated',
            'origin_school' => 'nullable|string',
            'observations' => 'nullable|string',

            // Address
            'address.cep' => 'required|string',
            'address.street' => 'required|string',
            'address.number' => 'required|string',
            'address.complement' => 'nullable|string',
            'address.neighborhood' => 'required|string',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
            'address.zone' => 'required|in:urbana,rural',
            'address.phone_contact' => 'nullable|string',

            // Health
            'health.blood_type' => 'nullable|string',
            'health.allergies' => 'nullable|string',
            'health.food_restrictions' => 'nullable|string',
            'health.continuous_meds' => 'nullable|string',
            'health.has_disability' => 'boolean',
            'health.disability_details' => 'nullable|string',
            'health.cid' => 'nullable|string',
            'health.health_plan' => 'nullable|string',
            'health.health_unit' => 'nullable|string',
            'health.vaccination_updated' => 'boolean',
        ]);

        \DB::transaction(function () use ($request, $validated, $accessService) {
            $student = Student::create($request->only([
                'name',
                'birth_date',
                'cpf',
                'rg',
                'class_room_id',
                'photo_path',
                'social_name',
                'sex',
                'color_race',
                'nationality',
                'place_of_birth',
                'state_of_birth',
                'rg_issuer',
                'rg_state',
                'rg_date',
                'birth_cert_model',
                'birth_cert_number',
                'birth_cert_old_info',
                'nis',
                'mother_name',
                'father_name',
                'parents_marital_status',
                'authorized_pickups',
                'exit_authorization',
                'transport_info',
                'enrollment_date',
                'status',
                'origin_school',
                'observations'
            ]));

            if ($request->has('address')) {
                $student->address()->create($request->input('address'));
            }

            if ($request->has('health')) {
                $student->health()->create($request->input('health'));
            }

            // Create Access automatically
            try {
                $accessService->createAccess($student);
            } catch (\Exception $e) {
                // Log error or ignore? User requirement is "shall be created".
                // If we fail here, transaction rolls back.
                // Re-throwing exception to stop registration and alert user.
                throw $e;
            }
        });

        return redirect()->route('admin.students.index')->with('success', 'Aluno cadastrado com acesso criado.');
    }

    public function edit(Student $student)
    {
        $classRooms = ClassRoom::all();
        $guardians = \App\Models\Guardian::all();
        $student->load(['guardians', 'address', 'health', 'user']);

        // Fetch data for document issuance
        $templates = \App\Models\DocumentTemplate::where('is_active', true)->get();
        $issuedDocuments = $student->issuedDocuments()->with('template')->latest()->get();

        return Inertia::render('Admin/Students/Edit', [
            'student' => $student,
            'classRooms' => $classRooms,
            'guardians' => $guardians,
            'templates' => $templates,
            'issuedDocuments' => $issuedDocuments,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            // Student
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'cpf' => 'required|string|max:14|unique:students,cpf,' . $student->id,
            'rg' => 'nullable|string|max:20',
            'class_room_id' => 'nullable|exists:class_rooms,id',
            'photo_path' => 'nullable|string',
            'social_name' => 'nullable|string|max:255',
            'sex' => 'required|in:M,F',
            'color_race' => 'required|string',
            'nationality' => 'nullable|string',
            'place_of_birth' => 'nullable|string',
            'state_of_birth' => 'nullable|string',
            'rg_issuer' => 'nullable|string',
            'rg_state' => 'nullable|string',
            'rg_date' => 'nullable|date',
            'birth_cert_model' => 'required|in:new,old',
            'birth_cert_number' => 'nullable|string',
            'birth_cert_old_info' => 'nullable|array',
            'nis' => 'nullable|string',
            'mother_name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'parents_marital_status' => 'nullable|string',
            'authorized_pickups' => 'nullable|array',
            'exit_authorization' => 'boolean',
            'transport_info' => 'nullable|string',
            'enrollment_date' => 'nullable|date',
            'status' => 'required|in:active,cancelled,transferred,graduated',
            'origin_school' => 'nullable|string',
            'observations' => 'nullable|string',

            // Address
            'address.cep' => 'required|string',
            'address.street' => 'required|string',
            'address.number' => 'required|string',
            'address.complement' => 'nullable|string',
            'address.neighborhood' => 'required|string',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
            'address.zone' => 'required|in:urbana,rural',
            'address.phone_contact' => 'nullable|string',

            // Health
            'health.blood_type' => 'nullable|string',
            'health.allergies' => 'nullable|string',
            'health.food_restrictions' => 'nullable|string',
            'health.continuous_meds' => 'nullable|string',
            'health.has_disability' => 'boolean',
            'health.disability_details' => 'nullable|string',
            'health.cid' => 'nullable|string',
            'health.health_plan' => 'nullable|string',
            'health.health_unit' => 'nullable|string',
            'health.vaccination_updated' => 'boolean',

            'guardian_ids' => 'nullable|array',
            'guardian_ids.*' => 'exists:guardians,id',
        ]);

        \DB::transaction(function () use ($request, $student) {
            $student->update($request->only([
                'name',
                'birth_date',
                'cpf',
                'rg',
                'class_room_id',
                'photo_path',
                'social_name',
                'sex',
                'color_race',
                'nationality',
                'place_of_birth',
                'state_of_birth',
                'rg_issuer',
                'rg_state',
                'rg_date',
                'birth_cert_model',
                'birth_cert_number',
                'birth_cert_old_info',
                'nis',
                'mother_name',
                'father_name',
                'parents_marital_status',
                'authorized_pickups',
                'exit_authorization',
                'transport_info',
                'enrollment_date',
                'status',
                'origin_school',
                'observations'
            ]));

            if ($request->has('address')) {
                $student->address()->updateOrCreate(['student_id' => $student->id], $request->input('address'));
            }

            if ($request->has('health')) {
                $student->health()->updateOrCreate(['student_id' => $student->id], $request->input('health'));
            }

            if ($request->has('guardian_ids')) {
                $student->guardians()->sync($request->guardian_ids);
            }
        });

        return redirect()->route('admin.students.index');
    }

    public function destroy(Student $student)
    {
        \DB::transaction(function () use ($student) {
            // 1. Delete Pre-Registrations (Force delete to remove FK constraint)
            \App\Models\PreRegistration::where('student_id', $student->id)->delete();

            // 2. Detach Guardians
            $student->guardians()->detach();

            // 3. Delete Related (Address, Health, Documents, Attendance, Grades)
            $student->address()->delete();
            $student->health()->delete();
            $student->issuedDocuments()->delete();

            // Delete academic records
            \App\Models\Attendance::where('student_id', $student->id)->delete();
            \App\Models\StudentGrade::where('student_id', $student->id)->delete();

            // 4. Delete associated User if exists
            if ($student->user) {
                $user = $student->user; // Assign to $user for consistency with the provided snippet
                // Agenda Message Relations
                \Illuminate\Support\Facades\DB::table('message_recipients')->where('recipient_id', $user->id)->delete();
                // Check if message_reads table exists or just safe delete
                try {
                    // Assuming message_reads might use user_id or recipient_id. If not sure, skip or check schema.
                    // If message_recipients has read_at, we might not have message_reads.
                    // Let's remove this if we are not sure, or try 'recipient_id' if consistent.
                    // \Illuminate\Support\Facades\DB::table('message_reads')->where('user_id', $user->id)->delete();
                } catch (\Exception $e) {
                }

                $user->delete();
            }
            // 5. Delete Student
            $student->delete();
        });

        return redirect()->route('admin.students.index')->with('success', 'Aluno excluído com sucesso.');
    }

    public function show(Student $student)
    {
        $student->load(['classRoom', 'address', 'health', 'guardians']);
        return response()->json($student);
    }

    public function toggleStatus(Student $student)
    {
        $newStatus = $student->status === 'active' ? 'cancelled' : 'active';
        $student->update(['status' => $newStatus]);

        return redirect()->back()->with('success', 'Status do estudante atualizado com sucesso.');
    }

    public function createUser(Student $student, \App\Services\AccessControlService $accessService)
    {
        try {
            $accessService->createAccess($student);
            return redirect()->back()->with('success', 'Acesso de usuário criado com sucesso.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors());
        }
    }

    public function resetPassword(Request $request, Student $student)
    {
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!$student->user) {
            return redirect()->back()->with('error', 'Este aluno não possui um usuário associado.');
        }

        $student->user->update([
            'password' => \Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Senha redefinida com sucesso.');
    }

    public function attendance(Student $student)
    {
        $student->load(['classRoom.grade', 'classRoom.academicYear']);

        // Fetch all attendances for this student with diary info
        $attendances = \App\Models\Attendance::where('student_id', $student->id)
            ->with(['classDiary.subject'])
            ->get();

        // Group by Subject
        $subjectsData = $attendances->groupBy(function ($att) {
            return $att->classDiary->subject->id;
        })->map(function ($subjectAttendances) {
            $subject = $subjectAttendances->first()->classDiary->subject;

            $totalClasses = $subjectAttendances->sum(fn($a) => $a->classDiary->classes_count);

            // For presence count, we need to consider how attendances are stored.
            // Assuming 1 row per diary/student. If diary has 2 classes, and status is present, then 2 presences.
            // If status is absent, 2 absences.

            $presences = $subjectAttendances->where('status', 'present')->sum(fn($a) => $a->classDiary->classes_count);
            $absences = $subjectAttendances->where('status', 'absent')->sum(fn($a) => $a->classDiary->classes_count);
            // Justified are counted as presences in many systems, or separate. Let's keep separate for display but maybe calculate % differently if needed.
            // For now, simple percentage: (Presences + Justified) / Total

            $justified = $subjectAttendances->where('status', 'justified')->sum(fn($a) => $a->classDiary->classes_count);
            $late = $subjectAttendances->where('status', 'late')->sum(fn($a) => $a->classDiary->classes_count); // Treat late as present? Usually yes.

            $effectivePresences = $presences + $justified + $late; // Adjust policy as needed

            $percentage = $totalClasses > 0 ? round(($effectivePresences / $totalClasses) * 100, 1) : 100;

            return [
                'id' => $subject->id,
                'name' => $subject->name,
                'stats' => [
                    'total_classes' => $totalClasses,
                    'presences' => $presences,
                    'absences' => $absences,
                    'justified' => $justified,
                    'late' => $late,
                    'percentage' => $percentage,
                ],
                'records' => $subjectAttendances->map(function ($att) {
                    return [
                        'date' => $att->classDiary->date,
                        'status' => $att->status,
                        'classes_count' => $att->classDiary->classes_count,
                        'content' => $att->classDiary->content,
                        'observations' => $att->observations,
                    ];
                })->sortByDesc('date')->values()
            ];
        })->values();

        return Inertia::render('Admin/Students/Attendance', [
            'student' => $student,
            'subjects' => $subjectsData
        ]);
    }
}
