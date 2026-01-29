<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ClassRoom;
use App\Models\Subject;
use App\Models\Allocation;
use App\Models\Grade;
use App\Models\AcademicYear;
use App\Models\EducationLevel;

class AllocationSeeder extends Seeder
{
    public function run()
    {
        $professor = User::where('email', 'professor@example.com')->first();

        if (!$professor) {
            $professor = User::factory()->create([
                'email' => 'professor@example.com',
                'role' => 'professor'
            ]);
        }

        // Ensure dependencies exist
        $edLevel = EducationLevel::firstOrCreate(['name' => 'Ensino Fundamental']);
        $grade1 = Grade::firstOrCreate(['name' => '1º Ano'], ['education_level_id' => $edLevel->id]);
        $grade2 = Grade::firstOrCreate(['name' => '2º Ano'], ['education_level_id' => $edLevel->id]);

        $year = AcademicYear::firstOrCreate(
            ['year' => '2024'],
            ['start_date' => '2024-01-01', 'end_date' => '2024-12-31', 'status' => 'open']
        );

        // Create Classes
        $class1 = ClassRoom::firstOrCreate(
            ['name' => 'Turma 101'],
            ['grade_id' => $grade1->id, 'academic_year_id' => $year->id, 'shift' => 'matutino']
        );

        $class2 = ClassRoom::firstOrCreate(
            ['name' => 'Turma 201'],
            ['grade_id' => $grade2->id, 'academic_year_id' => $year->id, 'shift' => 'vespertino']
        );

        // Create Subjects
        $math = Subject::firstOrCreate(['name' => 'Matemática', 'code' => 'MAT']);
        $portuguese = Subject::firstOrCreate(['name' => 'Língua Portuguesa', 'code' => 'POR']);
        $science = Subject::firstOrCreate(['name' => 'Ciências', 'code' => 'CIE']);

        // Allocate
        // Professor teaches Math in 101
        Allocation::firstOrCreate([
            'user_id' => $professor->id,
            'class_room_id' => $class1->id,
            'subject_id' => $math->id,
        ]);

        // Professor teaches Portuguese in 101
        Allocation::firstOrCreate([
            'user_id' => $professor->id,
            'class_room_id' => $class1->id,
            'subject_id' => $portuguese->id,
        ]);

        // Professor teaches Science in 201
        Allocation::firstOrCreate([
            'user_id' => $professor->id,
            'class_room_id' => $class2->id,
            'subject_id' => $science->id,
        ]);

        $this->command->info('Allocations seeded for professor@example.com');
    }
}
