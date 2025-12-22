<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Grading Periods (Bimestres/Trimestres)
        Schema::create('grading_periods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_year_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Ex: 1º Bimestre
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });

        // 2. Assessments (Provas/Trabalhos)
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grading_period_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('date');
            $table->decimal('max_points', 8, 2);
            $table->decimal('weight', 5, 2)->default(1.00);
            $table->boolean('is_recovery')->default(false);
            $table->timestamps();
        });

        // 3. Student Grades (Notas Individuais)
        Schema::create('student_grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->decimal('score', 8, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();

            // Unique constraint: one grade per student per assessment
            $table->unique(['assessment_id', 'student_id']);
        });

        // 4. Period Results (Média Final do Bimestre)
        Schema::create('period_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grading_period_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->decimal('grade', 8, 2);
            $table->timestamps();

            // Unique constraint: one result per student per period per subject
            $table->unique(['grading_period_id', 'student_id', 'subject_id'], 'period_results_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('period_results');
        Schema::dropIfExists('student_grades');
        Schema::dropIfExists('assessments');
        Schema::dropIfExists('grading_periods');
    }
};
