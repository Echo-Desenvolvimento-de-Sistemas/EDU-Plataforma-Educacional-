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
        // 1. Habilidades da BNCC
        Schema::create('bncc_skills', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Ex: EF01MA01
            $table->text('description');
            $table->string('component'); // Ex: Matematica
            $table->integer('grade_year'); // Ex: 1 (ano)
            $table->timestamps();

            $table->index(['component', 'grade_year']);
        });

        // 2. Planos de Aula (Semanários)
        Schema::create('lesson_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // Professor
            $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');

            $table->date('start_date');
            $table->date('end_date');

            $table->string('topic'); // Tema
            $table->text('methodology')->nullable();
            $table->text('resources')->nullable(); // Recursos didáticos
            $table->text('evaluation')->nullable(); // Como será avaliado

            // Status Flow: DRAFT -> SUBMITTED -> (APPROVED | REQUEST_CHANGES)
            $table->enum('status', ['DRAFT', 'SUBMITTED', 'APPROVED', 'REQUEST_CHANGES'])->default('DRAFT');

            $table->timestamps();
            $table->softDeletes();
        });

        // 3. Tabela Pivô (Planos <-> BNCC)
        Schema::create('lesson_plan_skills', function (Blueprint $table) {
            $table->foreignId('lesson_plan_id')->constrained('lesson_plans')->onDelete('cascade');
            $table->foreignId('bncc_skill_id')->constrained('bncc_skills')->onDelete('cascade');
            $table->primary(['lesson_plan_id', 'bncc_skill_id']);
        });

        // 4. Feedbacks da Coordenação
        Schema::create('plan_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_plan_id')->constrained('lesson_plans')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users'); // Coordenador que comentou
            $table->text('comment');
            $table->timestamp('read_at')->nullable(); // Se o professor leu
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedagogical_planning_tables');
    }
};
