<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Insert default gamification URL setting
        DB::table('settings')->insert([
            'key' => 'gamification_url',
            'value' => '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove gamification URL setting
        DB::table('settings')->where('key', 'gamification_url')->delete();
    }
};
