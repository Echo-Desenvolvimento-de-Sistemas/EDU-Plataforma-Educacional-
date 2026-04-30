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
        if (\Illuminate\Support\Facades\DB::getDriverName() !== 'sqlite') {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE attendances MODIFY COLUMN status ENUM('present', 'absent', 'late', 'justified') NOT NULL DEFAULT 'present'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to original enum list
        // WARNING: Data with 'justified' status might be truncated or cause errors if preventing check constraint. 
        // For safety, we map them back to 'absent' or leave as is if not strict mode, but strict mode usually fails.
        // We will just map 'justified' to 'absent' before reverting.
        if (\Illuminate\Support\Facades\DB::getDriverName() !== 'sqlite') {
            \Illuminate\Support\Facades\DB::table('attendances')->where('status', 'justified')->update(['status' => 'absent']);
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE attendances MODIFY COLUMN status ENUM('present', 'absent', 'late') NOT NULL DEFAULT 'present'");
        }
    }
};
