<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('lesson_plan_skills');
        Schema::dropIfExists('bncc_skills');
        
        if (Schema::hasColumn('questions', 'bncc_code')) {
            Schema::table('questions', function (Blueprint $table) {
                $table->dropColumn('bncc_code');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Not implementing down method since this is a feature removal
    }
};
