<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() !== 'sqlite') {
            // Add 'comunicado' to the ENUM list for messages.type
            // We must include all existing values to avoid truncation
            DB::statement("ALTER TABLE messages MODIFY COLUMN type ENUM('text', 'image', 'file', 'system', 'notice', 'event', 'financial', 'urgent', 'homework', 'comunicado') NOT NULL");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() !== 'sqlite') {
            // Revert to previous list
            DB::statement("ALTER TABLE messages MODIFY COLUMN type ENUM('text', 'image', 'file', 'system', 'notice', 'event', 'financial', 'urgent', 'homework') NOT NULL");
        }
    }
};
