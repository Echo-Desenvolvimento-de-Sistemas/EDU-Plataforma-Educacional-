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
        Schema::table('guardian_student', function (Blueprint $table) {
            $table->string('kinship')->nullable();
            $table->boolean('is_financial_responsible')->default(false);
            $table->boolean('is_pedagogic_responsible')->default(false);
            $table->boolean('resides_with')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('guardian_student', function (Blueprint $table) {
            //
        });
    }
};
