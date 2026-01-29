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
        Schema::table('bncc_skills', function (Blueprint $table) {
            // Change grade_year to string to support "1º, 2º", "Bebês", etc.
            $table->string('grade_year')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bncc_skills', function (Blueprint $table) {
            // Revert is risky if data exists, but purely technically:
            // $table->integer('grade_year')->change();
            // Since we can't guarantee conversion back to int, we will drop and re-add or just leave it.
            // For Safety in dev:
            // $table->integer('grade_year')->change(); 
        });
    }
};
