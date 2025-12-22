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
        Schema::table('channels', function (Blueprint $table) {
            // Change enum to string to support flexible types like 'CLASS'
            $table->string('type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('channels', function (Blueprint $table) {
            // Revert back to enum if needed, though risky with new data
            // Best effort revert
            // $table->enum('type', ['BROADCAST', 'SUPPORT'])->change(); 
        });
    }
};
