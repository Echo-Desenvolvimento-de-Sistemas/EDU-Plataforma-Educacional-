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
        Schema::table('students', function (Blueprint $table) {
            $table->string('photo_path')->nullable();
            $table->string('social_name')->nullable();
            $table->enum('sex', ['M', 'F'])->nullable();
            $table->string('color_race')->nullable();
            $table->string('nationality')->default('Brasileira');
            $table->string('place_of_birth')->nullable();
            $table->string('state_of_birth')->nullable();

            // Docs
            $table->string('rg_issuer')->nullable();
            $table->string('rg_state')->nullable();
            $table->date('rg_date')->nullable();
            $table->enum('birth_cert_model', ['new', 'old'])->default('new');
            $table->string('birth_cert_number')->nullable();
            $table->json('birth_cert_old_info')->nullable();
            $table->string('nis')->nullable();

            // Family
            $table->string('mother_name')->nullable();
            $table->string('father_name')->nullable();
            $table->string('parents_marital_status')->nullable();

            // Security
            $table->json('authorized_pickups')->nullable();
            $table->boolean('exit_authorization')->default(false);
            $table->text('transport_info')->nullable();

            // Academic
            $table->date('enrollment_date')->nullable();
            $table->enum('status', ['active', 'cancelled', 'transferred', 'graduated'])->default('active');
            $table->string('origin_school')->nullable();
            $table->text('observations')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            //
        });
    }
};
