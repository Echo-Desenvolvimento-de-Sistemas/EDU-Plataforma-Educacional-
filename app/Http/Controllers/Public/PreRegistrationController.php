<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PreRegistration;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\StudentAddress;
use App\Models\StudentHealth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PreRegistrationController extends Controller
{
    public function show($token)
    {
        $preRegistration = PreRegistration::where('token', $token)
            ->where('status', 'pending')
            ->with(['student.address', 'student.health', 'student.guardians'])
            ->firstOrFail();

        $initialData = null;

        if ($preRegistration->type === 'renewal' && $preRegistration->student) {
            $student = $preRegistration->student;
            $guardian = $student->guardians->first(); // Assuming primary guardian

            $initialData = [
                'name' => $student->name,
                'social_name' => $student->social_name,
                'sex' => $student->sex,
                'color_race' => $student->color_race,
                'nationality' => $student->nationality,
                'place_of_birth' => $student->place_of_birth,
                'state_of_birth' => $student->state_of_birth,
                'birth_date' => $student->birth_date ? \Carbon\Carbon::parse($student->birth_date)->format('Y-m-d') : '',
                'cpf' => $student->cpf,
                'rg' => $student->rg,
                'rg_issuer' => $student->rg_issuer,
                'rg_state' => $student->rg_state,
                'rg_date' => $student->rg_date ? \Carbon\Carbon::parse($student->rg_date)->format('Y-m-d') : '',
                'mother_name' => $student->mother_name,
                'father_name' => $student->father_name,
                'parents_marital_status' => $student->parents_marital_status,

                'address' => $student->address ? [
                    'cep' => $student->address->cep,
                    'street' => $student->address->street,
                    'number' => $student->address->number,
                    'complement' => $student->address->complement,
                    'neighborhood' => $student->address->neighborhood,
                    'city' => $student->address->city,
                    'state' => $student->address->state,
                    'zone' => $student->address->zone,
                    'phone_contact' => $student->address->phone_contact,
                ] : null,

                'health' => $student->health ? [
                    'blood_type' => $student->health->blood_type,
                    'allergies' => $student->health->allergies,
                    'food_restrictions' => $student->health->food_restrictions,
                    'continuous_meds' => $student->health->continuous_meds,
                    'has_disability' => $student->health->has_disability,
                    'disability_details' => $student->health->disability_details,
                    'cid' => $student->health->cid,
                    'health_plan' => $student->health->health_plan,
                    'health_unit' => $student->health->health_unit,
                    'vaccination_updated' => $student->health->vaccination_updated,
                ] : null,

                'guardian' => $guardian ? [
                    'name' => $guardian->name,
                    'cpf' => $guardian->cpf,
                    'rg' => $guardian->rg,
                    'phone' => $guardian->phone,
                    'email' => $guardian->email,
                    'kinship' => $guardian->pivot->kinship,
                ] : null,
            ];
        }

        return Inertia::render('Public/PreRegistration/Form', [
            'token' => $token,
            'student_name' => $preRegistration->student_name,
            'initialData' => $initialData,
            'type' => $preRegistration->type,
        ]);
    }

    public function store(Request $request, $token, \App\Services\AccessControlService $accessService)
    {
        $preRegistration = PreRegistration::where('token', $token)
            ->where('status', 'pending')
            ->firstOrFail();

        $isRenewal = $preRegistration->type === 'renewal';
        $studentId = $preRegistration->student_id;

        // Validation Rules
        $rules = [
            // Student
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'cpf' => 'required|string|max:14' . ($isRenewal ? '' : '|unique:students'), // Ignore unique check for renewal if same student
            'sex' => 'required|in:M,F',
            'color_race' => 'required|string',
            'mother_name' => 'required|string|max:255',

            // Address
            'address.cep' => 'required|string',
            'address.street' => 'required|string',
            'address.number' => 'required|string',
            'address.neighborhood' => 'required|string',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
            'address.zone' => 'required|in:urbana,rural',

            // Guardian
            'guardian.name' => 'required|string|max:255',
            'guardian.cpf' => 'required|string|max:14',
            'guardian.phone' => 'required|string',
            'guardian.kinship' => 'required|string',
        ];

        // If renewal, we might need to exclude current student from unique check explicitly if needed, 
        // but since we are updating, standard unique check might fail if we don't exclude.
        // For simplicity, let's assume CPF doesn't change or we handle it. 
        // Actually, if it's renewal, we should probably validate that the CPF matches the record or allow update if it was wrong?
        // Let's keep it simple: unique check applies to others.
        if ($isRenewal) {
            $rules['cpf'] = 'required|string|max:14|unique:students,cpf,' . $studentId;
        }

        $validated = $request->validate($rules);

        DB::transaction(function () use ($request, $preRegistration, $isRenewal, $studentId, $accessService) {
            $studentData = $request->only([
                'name',
                'birth_date',
                'cpf',
                'sex',
                'color_race',
                'mother_name',
                'social_name',
                'nationality',
                'place_of_birth',
                'state_of_birth',
                'rg',
                'rg_issuer',
                'rg_state',
                'rg_date',
                'father_name',
                'parents_marital_status'
            ]);

            if ($isRenewal && $studentId) {
                // UPDATE Existing Student
                $student = Student::findOrFail($studentId);
                $student->update($studentData);

                // Update Address
                $student->address()->updateOrCreate([], $request->input('address'));

                // Update Health
                if ($request->has('health')) {
                    $student->health()->updateOrCreate([], $request->input('health'));
                }

                // For renewal, we keep the current class_room_id. 
                // The target_class_id in preRegistration is the "future" class.
            } else {
                // CREATE New Student
                $student = Student::create($studentData);

                // Assign to Target Class immediately for new students
                if ($preRegistration->target_class_id) {
                    $student->class_room_id = $preRegistration->target_class_id;
                    $student->save();
                }

                $student->address()->create($request->input('address'));

                if ($request->has('health')) {
                    $student->health()->create($request->input('health'));
                }
            }

            // Handle Guardian (Find by CPF or Create)
            $guardianData = $request->input('guardian');
            $guardian = Guardian::firstOrCreate(
                ['cpf' => $guardianData['cpf']],
                [
                    'name' => $guardianData['name'],
                    'phone' => $guardianData['phone'],
                    'email' => $guardianData['email'] ?? null,
                    'rg' => $guardianData['rg'] ?? null,
                ]
            );

            // Link Guardian (Sync for renewal to avoid duplicates or just attach if not exists)
            // For simplicity, we sync without detaching others? Or just ensure this one is attached.
            if (!$student->guardians()->where('guardian_id', $guardian->id)->exists()) {
                $student->guardians()->attach($guardian->id, [
                    'kinship' => $guardianData['kinship'],
                    'is_financial_responsible' => true,
                    'is_pedagogic_responsible' => true,
                    'resides_with' => true,
                ]);
            } else {
                // Update pivot if needed
                $student->guardians()->updateExistingPivot($guardian->id, [
                    'kinship' => $guardianData['kinship'],
                ]);
            }

            // Complete Pre-Registration
            $preRegistration->update([
                'status' => 'completed',
                'student_id' => $student->id
            ]);

            // Create Access for Student and Guardian
            // We use try-catch to ensure that if user creation fails (e.g. duplicate email generated), we fail.
            // Actually, per requirement, it MUST be created.
            $accessService->createAccess($student);

            // For guardian, check if they already have a user?
            // AccessControlService checks unique email/username.
            // If guardian was found (firstOrCreate), they might already have a user.
            // AccessControlService should handle this?
            // "If User::where('email', $email)->exists()... throw"
            // So if guardian exists and has email, it might throw if we try to create again.
            // We should check if guardian already has a user.

            if (!$guardian->user_id) {
                $accessService->createAccess($guardian);
            }
        });

        return redirect()->route('pre-registration.success');
    }
}
