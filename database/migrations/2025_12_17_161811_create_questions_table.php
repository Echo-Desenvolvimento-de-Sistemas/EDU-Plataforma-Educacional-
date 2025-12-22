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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_bank_id')->constrained()->cascadeOnDelete();
            $table->longText('statement');
            $table->enum('type', ['MULTIPLE_CHOICE', 'TRUE_FALSE'])->default('MULTIPLE_CHOICE');
            $table->tinyInteger('difficulty')->default(1)->comment('1: Easy, 2: Medium, 3: Hard');
            $table->text('explanation')->nullable()->comment('Feedback for the student');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
