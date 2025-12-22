<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ClassRoom;
use App\Models\QuestionBank;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\Allocation;
use App\Models\AcademicYear;
use App\Models\Grade;
use App\Models\EducationLevel;
use App\Models\Subject;
use Illuminate\Support\Facades\Hash;

class WizardTestSeeder extends Seeder
{
    public function run()
    {
        // 1. Dependencies
        $edLevel = EducationLevel::firstOrCreate(['name' => 'Ensino Mágico']);

        $grade = Grade::firstOrCreate(
            ['name' => '1º Ano de Feitiçaria'],
            ['education_level_id' => $edLevel->id]
        );

        $year = AcademicYear::firstOrCreate(
            ['year' => '2025'],
            [
                'start_date' => '2025-01-01',
                'end_date' => '2025-12-31',
                'status' => 'active'
            ]
        );

        // 2. Create Processor
        $professor = User::firstOrCreate(
            ['email' => 'professor@wizard.com'],
            [
                'name' => 'Professor Wizard',
                'password' => Hash::make('password'),
                'role' => 'professor',
                'active' => true,
            ]
        );

        // 3. Create Class Room
        $classRoom = ClassRoom::firstOrCreate(
            ['name' => 'Turma Wizard 101'],
            [
                'grade_id' => $grade->id,
                'academic_year_id' => $year->id,
                'shift' => 'matutino',
            ]
        );

        // 4. Allocate Professor
        $subject = Subject::firstOrCreate(['name' => 'Matemática Mágica']);

        Allocation::firstOrCreate([
            'user_id' => $professor->id,
            'class_room_id' => $classRoom->id,
            'subject_id' => $subject->id,
        ]);

        // 5. Create Question Bank
        $bank = QuestionBank::firstOrCreate(
            ['title' => 'Banco Geral de Feitiços', 'user_id' => $professor->id],
            ['description' => 'Questões sobre levitação e poções.']
        );

        // 6. Create Questions
        // Easy Multiple Choice
        $q1 = Question::firstOrCreate( // Check by statement to avoid dupes
            ['statement' => 'Qual é o encantamento para levitar objetos?', 'question_bank_id' => $bank->id],
            [
                'type' => 'MULTIPLE_CHOICE',
                'difficulty' => 1,
            ]
        );
        QuestionOption::firstOrCreate(['question_id' => $q1->id, 'label' => 'Wingardium Leviosa'], ['is_correct' => true]);
        QuestionOption::firstOrCreate(['question_id' => $q1->id, 'label' => 'Expelliarmus'], ['is_correct' => false]);
        QuestionOption::firstOrCreate(['question_id' => $q1->id, 'label' => 'Avada Kedavra'], ['is_correct' => false]);

        // Medium True/False
        $q2 = Question::firstOrCreate(
            ['statement' => 'Poção Polissuco permite transformar-se em outra pessoa.', 'question_bank_id' => $bank->id],
            [
                'type' => 'TRUE_FALSE',
                'difficulty' => 2,
            ]
        );
        QuestionOption::firstOrCreate(['question_id' => $q2->id, 'label' => 'Verdadeiro'], ['is_correct' => true]);
        QuestionOption::firstOrCreate(['question_id' => $q2->id, 'label' => 'Falso'], ['is_correct' => false]);

        // Hard Multiple Choice
        $q3 = Question::firstOrCreate(
            ['statement' => 'Qual ingrediente NÃO faz parte da Poção do Morto-Vivo?', 'question_bank_id' => $bank->id],
            [
                'type' => 'MULTIPLE_CHOICE',
                'difficulty' => 3,
            ]
        );
        QuestionOption::firstOrCreate(['question_id' => $q3->id, 'label' => 'Asfódelo'], ['is_correct' => false]);
        QuestionOption::firstOrCreate(['question_id' => $q3->id, 'label' => 'Losna'], ['is_correct' => false]);
        QuestionOption::firstOrCreate(['question_id' => $q3->id, 'label' => 'Bezoar'], ['is_correct' => true]);

        $this->command->info('Wizard Test Data Seeded Successfully!');
    }
}
