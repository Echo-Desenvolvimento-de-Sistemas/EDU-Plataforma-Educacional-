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
        Schema::create('class_diaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_room_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade'); // Nullable for fundamental 1
            $table->foreignId('user_id')->constrained(); // Teacher who registered
            $table->date('date');
            $table->integer('classes_count')->default(1);
            $table->text('content')->nullable();
            $table->timestamps();

            // Index for faster queries
            $table->index(['class_room_id', 'date']);
        });

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_diary_id')->constrained('class_diaries')->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['present', 'absent', 'late'])->default('present');
            $table->string('observations')->nullable();
            $table->timestamps();

            // Ensure one attendance per student per diary entry
            $table->unique(['class_diary_id', 'student_id']);
            $table->index(['student_id', 'status']);
        });

        Schema::create('absence_justifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date')->nullable(); // Single day if null
            $table->string('type'); // medical, family, etc
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('attachment_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absence_justifications');
        Schema::dropIfExists('attendances');
        Schema::dropIfExists('class_diaries');
    }
};
