<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EducationLevel;
use App\Models\Grade;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\StudentAddress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ImportController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Import/Secret');
    }

    public function store(Request $request)
    {
        $request->validate([
            'json_data' => 'required|json',
        ]);

        $data = json_decode($request->input('json_data'), true);

        if (!is_array($data)) {
            return back()->withErrors(['json_data' => 'Invalid JSON format. Expected an array.']);
        }

        DB::beginTransaction();

        try {
            $stats = [
                'imported' => 0,
                'skipped' => 0,
                'errors' => [],
            ];

            foreach ($data as $index => $item) {
                try {
                    $this->processItem($item);
                    $stats['imported']++;
                } catch (\Exception $e) {
                    $stats['errors'][] = "Item $index: " . $e->getMessage();
                    Log::error("Import Error Item $index: " . $e->getMessage());
                }
            }

            DB::commit();

            return back()->with('success', "Import completed. Imported: {$stats['imported']}, Errors: " . count($stats['errors']));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Fatal Error: ' . $e->getMessage()]);
        }
    }

    private function processItem($item)
    {
        // 1. Guardian
        $guardianData = $item['guardian'] ?? null;
        if (!$guardianData || empty($guardianData['cpf'])) {
            throw new \Exception("Guardian Information Missing or CPF missing");
        }

        $guardian = Guardian::firstOrCreate(
            ['cpf' => $guardianData['cpf']],
            [
                'name' => $guardianData['name'],
                'email' => $guardianData['email'] ?? null,
                'phone' => $guardianData['phone'] ?? null,
            ]
        );

        // Create User for Guardian if needed (optional based on requirements, but good for access)
        // Ignoring user creation for now to keep it simple, or we can add it later.

        // 2. Class Room Resolution (Optional but recommended for migration)
        $classRoomId = null;
        if (isset($item['class_room']) && !empty($item['class_room']['name'])) {
            $classData = $item['class_room'];
            $academicYearId = $this->resolveAcademicYearId($classData['academic_year'] ?? date('Y'));
            $gradeId = $this->resolveGradeId($classData['grade_name'] ?? null);

            if ($academicYearId && $gradeId) {
                $classRoom = \App\Models\ClassRoom::firstOrCreate(
                    [
                        'name' => $classData['name'],
                        'academic_year_id' => $academicYearId,
                        'grade_id' => $gradeId,
                    ],
                    [
                        'shift' => $classData['shift'] ?? 'matutino',
                    ]
                );
                $classRoomId = $classRoom->id;
            }
        }

        // 3. Student
        $studentData = $item['student'] ?? null;
        if (!$studentData || empty($studentData['name'])) {
            throw new \Exception("Student Information Missing");
        }

        // Check if student exists by CPF (if provided) or Name + Birth Date
        $studentQuery = Student::query();
        if (!empty($studentData['cpf'])) {
            $studentQuery->where('cpf', $studentData['cpf']);
        } else {
            $studentQuery->where('name', $studentData['name'])
                ->where('birth_date', $studentData['birth_date']);
        }

        $student = $studentQuery->first();

        if (!$student) {
            $createData = [
                'name' => $studentData['name'],
                'birth_date' => $studentData['birth_date'],
                'cpf' => $studentData['cpf'] ?? null,
                'rg' => $studentData['rg'] ?? null,
                'nis' => $studentData['nis'] ?? null, // Added NIS
                'status' => 'active',
                'class_room_id' => $classRoomId, // Assign Class Room
                'sex' => $studentData['sex'] ?? 'M', // Defaults
                'color_race' => $studentData['color_race'] ?? 'não declarada',
                'mother_name' => $studentData['mother_name'] ?? 'Não informado',
                'birth_cert_model' => 'new', // Default
            ];

            // Filter nulls or handle them in model defaults
            $student = Student::create($createData);
        } else {
            // Update Class Room if not set
            if (!$student->class_room_id && $classRoomId) {
                $student->update(['class_room_id' => $classRoomId]);
            }
        }

        // 4. Link Guardian and Student
        // Check if already linked
        $exists = DB::table('guardian_student')
            ->where('guardian_id', $guardian->id)
            ->where('student_id', $student->id)
            ->exists();

        if (!$exists) {
            $guardian->students()->attach($student->id, [
                'relationship' => $guardianData['relationship'] ?? 'Responsável',
            ]);
        }

        // 5. Address
        $addressData = $item['address'] ?? null;
        if ($addressData) {
            StudentAddress::updateOrCreate(
                ['student_id' => $student->id],
                [
                    'cep' => $addressData['cep'] ?? '00000-000',
                    'street' => $addressData['street'] ?? 'N/A',
                    'number' => $addressData['number'] ?? 'S/N',
                    'complement' => $addressData['complement'] ?? null,
                    'neighborhood' => $addressData['neighborhood'] ?? 'N/A',
                    'city' => $addressData['city'] ?? 'N/A',
                    'state' => $addressData['state'] ?? 'N/A',
                    'zone' => $addressData['zone'] ?? 'urbana', // Default zone
                ]
            );
        }
    }

    private function resolveAcademicYearId($year)
    {
        $ac = \App\Models\AcademicYear::firstOrCreate(
            ['year' => $year],
            [
                'start_date' => "$year-01-01",
                'end_date' => "$year-12-31",
                'status' => 'open'
            ]
        );
        return $ac->id;
    }

    private function resolveGradeId($name)
    {
        if (!$name)
            return null;
        // Try exact match
        $grade = Grade::where('name', $name)->first();
        if ($grade)
            return $grade->id;

        // Try LIKE match
        $grade = Grade::where('name', 'like', "%$name%")->first();
        if ($grade)
            return $grade->id;

        // If not found, we cannot create easily without education_level_id. 
        // Fallback: Pick the first grade? No, too risky.
        // Try to finding 'Fundamental' education level and create?
        // Let's assume seeded data. If failed, return null.
        return null;
    }
}
