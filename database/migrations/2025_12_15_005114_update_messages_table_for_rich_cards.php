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
        Schema::table('messages', function (Blueprint $table) {
            $table->string('title')->nullable()->after('channel_id');
            // We modify 'type' to be a string to support various rich card types
            // If using MySQL, we might need raw statement if limited by Doctrine DBAL absence
            // But let's try strict schema change first, or just raw SQL for safety.
            $table->string('type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn('title');
            // Reverting enum is tricky without exact values, but we can try
            // For now, leaving it as string in down is safer than breaking logic
        });
    }
};
