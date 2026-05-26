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
        Schema::table('pre_registrations', function (Blueprint $table) {
            $table->timestamp('lgpd_accepted_at')->nullable();
            $table->string('lgpd_accepted_ip')->nullable();
            $table->string('lgpd_accepted_user_agent')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pre_registrations', function (Blueprint $table) {
            $table->dropColumn(['lgpd_accepted_at', 'lgpd_accepted_ip', 'lgpd_accepted_user_agent']);
        });
    }
};
