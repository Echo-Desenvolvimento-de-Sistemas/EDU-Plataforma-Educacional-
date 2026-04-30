<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\AcademicYear;
use App\Models\EducationLevel;
use App\Models\Grade;
use App\Models\Subject;
use App\Models\ClassRoom;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\Allocation;
use App\Models\GradingPeriod;
use App\Models\ClassSchedule;
use App\Models\Assessment;
use App\Models\StudentGrade;
use App\Models\ClassDiary;
use App\Models\Attendance;
use App\Models\SchoolEvent;
use App\Models\DocumentTemplate;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Carbon\Carbon;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('pt_BR');

        // 1. Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin Demo',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $secretaria = User::firstOrCreate(
            ['email' => 'secretaria@example.com'],
            [
                'name' => 'Maria Silva (Secretária)',
                'password' => Hash::make('password'),
                'role' => 'secretaria',
                'email_verified_at' => now(),
            ]
        );

        $professor = User::firstOrCreate(
            ['email' => 'professor@example.com'],
            [
                'name' => 'Prof. João Oliveira',
                'password' => Hash::make('password'),
                'role' => 'professor',
                'email_verified_at' => now(),
            ]
        );

        $alunoUser = User::firstOrCreate(
            ['email' => 'aluno@example.com'],
            [
                'name' => 'Lucas Ferreira (Aluno)',
                'password' => Hash::make('password'),
                'role' => 'aluno',
                'email_verified_at' => now(),
            ]
        );

        // 2. Academic Infrastructure
        $year = AcademicYear::firstOrCreate(
            ['year' => '2024'],
            ['start_date' => '2024-02-01', 'end_date' => '2024-12-20', 'status' => 'open']
        );

        $periods = [
            ['name' => '1º Bimestre', 'start_date' => '2024-02-01', 'end_date' => '2024-04-30'],
            ['name' => '2º Bimestre', 'start_date' => '2024-05-01', 'end_date' => '2024-07-15'],
            ['name' => '3º Bimestre', 'start_date' => '2024-08-01', 'end_date' => '2024-09-30'],
            ['name' => '4º Bimestre', 'start_date' => '2024-10-01', 'end_date' => '2024-12-20'],
        ];

        foreach ($periods as $p) {
            GradingPeriod::firstOrCreate(
                ['academic_year_id' => $year->id, 'name' => $p['name']],
                $p
            );
        }

        $edLevel = EducationLevel::firstOrCreate(['name' => 'Ensino Fundamental II']);

        $grades = [];
        foreach (['6º Ano', '7º Ano', '8º Ano', '9º Ano'] as $gName) {
            $grades[] = Grade::firstOrCreate(
                ['name' => $gName],
                ['education_level_id' => $edLevel->id]
            );
        }

        $subjects = [];
        $subjectList = [
            'Matemática' => 'MAT',
            'Português' => 'POR',
            'História' => 'HIS',
            'Geografia' => 'GEO',
            'Ciências' => 'CIE',
            'Inglês' => 'ING'
        ];

        foreach ($subjectList as $sName => $sCode) {
            $subject = Subject::where('code', $sCode)->first();
            
            if (!$subject) {
                try {
                    $subject = Subject::create([
                        'code' => $sCode,
                        'name' => $sName
                    ]);
                } catch (\Exception $e) {
                    // Se falhar (ex: outro container inseriu no meio tempo), tenta buscar novamente
                    $subject = Subject::where('code', $sCode)->first();
                }
            }
            
            if ($subject) {
                $subjects[] = $subject;
            }
        }

        // 3. Classes and Students
        foreach ($grades as $grade) {
            $class = ClassRoom::firstOrCreate(
                ['name' => "Turma " . mb_substr($grade->name, 0, 1) . "01", 'academic_year_id' => $year->id],
                [
                    'grade_id' => $grade->id,
                    'shift' => 'matutino',
                ]
            );

            // Allocations for our demo professor
            foreach ($subjects as $subject) {
                Allocation::firstOrCreate([
                    'user_id' => $professor->id,
                    'class_room_id' => $class->id,
                    'subject_id' => $subject->id
                ]);
            }

            // Create 10 students per class only if class is empty
            if ($class->students()->count() === 0) {
                for ($i = 0; $i < 10; $i++) {
                    $studentName = $faker->name();
                    $guardian = Guardian::create([
                        'name' => $faker->name(),
                        'email' => $faker->unique()->safeEmail(),
                        'phone' => '419' . $faker->numerify('########'),
                        'cpf' => $faker->numerify('###########'),
                        'active' => true
                    ]);

                    $student = Student::create([
                        'name' => $studentName,
                        'birth_date' => $faker->date('Y-m-d', '-12 years'),
                        'sex' => $faker->randomElement(['M', 'F']),
                        'status' => 'active',
                        'enrollment_date' => now(),
                    ]);

                    // Attach guardian
                    $student->guardians()->attach($guardian->id, [
                        'kinship' => 'Pai/Mãe',
                        'is_financial_responsible' => true,
                        'is_pedagogic_responsible' => true,
                        'resides_with' => true,
                    ]);

                    // Enroll student in class
                    $student->update(['class_room_id' => $class->id]);

                    // Special case for our demo student
                    if ($grade->name === '6º Ano' && $i === 0) {
                        $alunoUser->update(['name' => $studentName]);
                        $student->update(['user_id' => $alunoUser->id]);
                    }
                }
            }

            // 4. Class Schedules (Horários de Aula) - only if empty
            if ($class->schedules()->count() === 0) {
                $days = [1, 2, 3, 4, 5]; // Mon-Fri
                $startTimes = ['07:30', '08:20', '09:10', '10:20', '11:10'];
                foreach ($days as $day) {
                    foreach ($startTimes as $index => $startTime) {
                        $subject = $subjects[$index % count($subjects)];
                        ClassSchedule::create([
                            'class_room_id' => $class->id,
                            'subject_id' => $subject->id,
                            'day_of_week' => $day,
                            'start_time' => $startTime,
                            'end_time' => Carbon::parse($startTime)->addMinutes(50)->format('H:i'),
                        ]);
                    }
                }
            }

            // 5. Assessments & Grades (Boletim) - only if empty
            $period = GradingPeriod::where('academic_year_id', $year->id)->first();
            if (Assessment::where('class_room_id', $class->id)->count() === 0) {
                foreach ($subjects as $subject) {
                    $assessment = Assessment::create([
                        'grading_period_id' => $period->id,
                        'class_room_id' => $class->id,
                        'subject_id' => $subject->id,
                        'title' => 'Avaliação Mensal - ' . $period->name,
                        'date' => Carbon::parse($period->start_date)->addDays(20),
                        'max_points' => 10.0,
                        'weight' => 1.0,
                    ]);

                    foreach ($class->students as $student) {
                        StudentGrade::create([
                            'assessment_id' => $assessment->id,
                            'student_id' => $student->id,
                            'score' => $faker->randomFloat(1, 5, 10),
                            'submitted_at' => now(),
                        ]);
                    }
                }
            }

            // 6. Attendance (Frequência) - only if empty
            if (ClassDiary::where('class_room_id', $class->id)->count() === 0) {
                $lastDays = [now()->subDays(1), now()->subDays(2), now()->subDays(3)];
                foreach ($lastDays as $date) {
                    if ($date->isWeekend()) continue;

                    $diary = ClassDiary::create([
                        'class_room_id' => $class->id,
                        'subject_id' => $subjects[0]->id,
                        'user_id' => $professor->id,
                        'date' => $date->format('Y-m-d'),
                        'content' => 'Aula expositiva sobre ' . $faker->sentence(3),
                        'classes_count' => 2,
                    ]);

                    foreach ($class->students as $student) {
                        Attendance::create([
                            'class_diary_id' => $diary->id,
                            'student_id' => $student->id,
                            'status' => $faker->optional(0.9, 'absent')->randomElement(['present']),
                        ]);
                    }
                }
            }
        }

        // 7. School Calendar (Calendário Escolar)
        SchoolEvent::firstOrCreate(
            ['title' => 'Início das Aulas', 'start_date' => '2024-02-05 08:00:00'],
            [
                'type' => 'academic',
                'description' => 'Boas vindas aos alunos',
                'created_by' => $admin->id,
            ]
        );

        SchoolEvent::firstOrCreate(
            ['title' => 'Feriado de Carnaval', 'start_date' => '2024-02-12 00:00:00'],
            [
                'type' => 'holiday',
                'end_date' => '2024-02-14 23:59:59',
                'description' => 'Recesso escolar',
                'created_by' => $admin->id,
            ]
        );

        SchoolEvent::firstOrCreate(
            ['title' => 'Reunião de Pais e Mestres', 'start_date' => '2024-03-10 19:00:00'],
            [
                'type' => 'meeting',
                'description' => 'Alinhamento pedagógico do 1º bimestre',
                'created_by' => $admin->id,
            ]
        );

        // 8. Document Templates (Modelos de Documentos)
        DocumentTemplate::updateOrCreate(
            ['title' => 'Declaração de Matrícula'],
            [
                'type' => 'declaration',
                'content' => '<h1>DECLARAÇÃO DE MATRÍCULA</h1><p>Declaramos para os devidos fins que o(a) aluno(a) <strong>{{student_name}}</strong> está regularmente matriculado(a) no <strong>{{grade_name}}</strong> nesta instituição de ensino.</p>',
                'is_active' => true,
            ]
        );

        DocumentTemplate::updateOrCreate(
            ['title' => 'Boletim Escolar'],
            [
                'type' => 'report_card',
                'content' => '<h1>BOLETIM ESCOLAR</h1><p>Relatório de desempenho do aluno {{student_name}} referente ao ano letivo {{year}}.</p>',
                'is_active' => true,
            ]
        );
    }
}
