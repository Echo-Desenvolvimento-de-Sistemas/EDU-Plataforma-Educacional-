<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Student;
use App\Models\ClassRoom;
use App\Models\Subject;
use App\Models\ClassDiary;
use App\Models\Attendance;
use App\Models\GradingPeriod;
use App\Models\AcademicYear;
use App\Models\Grade;
use App\Models\EducationLevel;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AttendanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_batch_store_attendance()
    {
        // 1. Setup Data
        $admin = User::factory()->create(['role' => 'admin']);

        $level = EducationLevel::create(['name' => 'Fundamental 1', 'code' => 'F1']);
        $grade = Grade::create(['name' => '1º Ano', 'education_level_id' => $level->id]);
        $academicYear = AcademicYear::create(['year' => '2025', 'start_date' => '2025-01-01', 'end_date' => '2025-12-31']);

        $classRoom = ClassRoom::create(['name' => 'Turma A', 'grade_id' => $grade->id, 'academic_year_id' => $academicYear->id]);
        $subject = Subject::create(['name' => 'Matemática', 'code' => 'MAT']);

        $student1 = Student::create(['name' => 'João', 'class_room_id' => $classRoom->id]);
        $student2 = Student::create(['name' => 'Maria', 'class_room_id' => $classRoom->id]);

        // 2. Mock Request Data
        $payload = [
            'class_room_id' => $classRoom->id,
            'subject_id' => $subject->id,
            'date' => '2025-03-10',
            'classes_count' => 2, // Double lesson
            'content' => 'Introduction to Algebra',
            'students' => [
                ['id' => $student1->id, 'status' => 'present'],
                ['id' => $student2->id, 'status' => 'absent', 'observations' => 'Sick'],
            ]
        ];

        // 3. Act
        $response = $this->actingAs($admin)
            ->postJson(route('admin.attendance.batch'), $payload);

        // 4. Assert
        $response->assertStatus(200);

        // Check ClassDiary
        $this->assertDatabaseHas('class_diaries', [
            'class_room_id' => $classRoom->id,
            'classes_count' => 2,
            'date' => '2025-03-10',
        ]);

        // Check Attendances
        $this->assertDatabaseHas('attendances', [
            'student_id' => $student1->id,
            'status' => 'present',
        ]);

        $this->assertDatabaseHas('attendances', [
            'student_id' => $student2->id,
            'status' => 'absent',
            'observations' => 'Sick',
        ]);
    }

    public function test_calculates_frequency_correctly()
    {
        // Setup
        $admin = User::factory()->create(['role' => 'admin']);
        $level = EducationLevel::create(['name' => 'F1', 'code' => 'F1']);
        $grade = Grade::create(['name' => '1A', 'education_level_id' => $level->id]);
        $academicYear = AcademicYear::create(['year' => '2025', 'start_date' => '2025-01-01', 'end_date' => '2025-12-31']);
        $period = GradingPeriod::create([
            'academic_year_id' => $academicYear->id,
            'name' => '1º Bimestre',
            'start_date' => '2025-02-01',
            'end_date' => '2025-04-30'
        ]);

        $classRoom = ClassRoom::create(['name' => 'Turma Teste', 'grade_id' => $grade->id, 'academic_year_id' => $academicYear->id]);
        $student = Student::create(['name' => 'Teste Frequencia', 'class_room_id' => $classRoom->id]);

        // Create 2 Diaries (Total 4 classes)
        // Day 1: 2 classes, Absent
        $diary1 = ClassDiary::create([
            'class_room_id' => $classRoom->id,
            'user_id' => $admin->id,
            'date' => '2025-02-10',
            'classes_count' => 2
        ]);
        Attendance::create(['class_diary_id' => $diary1->id, 'student_id' => $student->id, 'status' => 'absent']);

        // Day 2: 2 classes, Present
        $diary2 = ClassDiary::create([
            'class_room_id' => $classRoom->id,
            'user_id' => $admin->id,
            'date' => '2025-02-11',
            'classes_count' => 2
        ]);
        Attendance::create(['class_diary_id' => $diary2->id, 'student_id' => $student->id, 'status' => 'present']);

        // Call Report
        $response = $this->actingAs($admin)
            ->get(route('admin.attendance.report', [
                'student_id' => $student->id,
                'grading_period_id' => $period->id
            ]));

        $response->assertStatus(200)
            ->assertJson([
                'total_classes' => 4,
                'total_absences' => 2,
                'percentage' => 50,
            ]);
    }
}
