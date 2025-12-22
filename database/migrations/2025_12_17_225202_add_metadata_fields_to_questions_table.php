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
        Schema::table('questions', function (Blueprint $table) {
            $table->string('subject')->nullable()->after('question_bank_id');
            $table->string('topic')->nullable()->after('subject');
            $table->string('grade_level')->nullable()->after('topic');
            $table->string('bncc_code')->nullable()->after('grade_level');
            $table->json('tags')->nullable()->after('bncc_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn(['subject', 'topic', 'grade_level', 'bncc_code', 'tags']);
        });
    }
};
