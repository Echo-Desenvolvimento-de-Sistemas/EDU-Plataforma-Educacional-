<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
 
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() !== 'sqlite') {
            // Update channels.type enum
            DB::statement("ALTER TABLE channels MODIFY COLUMN type ENUM('broadcast', 'communication', 'direct') NOT NULL");
     
            // Update messages.type enum to support all categories from ComposeModal
            // Normalizing to lowercase consistently
            DB::statement("ALTER TABLE messages MODIFY COLUMN type ENUM('text', 'image', 'file', 'system', 'notice', 'event', 'financial', 'urgent', 'homework') NOT NULL");
        }
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() !== 'sqlite') {
            // Revert to original enum values (risky if data exists, but standard for down())
            // Note: 'direct' and new message types will be truncated or cause errors if reverted
            DB::statement("ALTER TABLE channels MODIFY COLUMN type ENUM('broadcast', 'communication') NOT NULL");
            DB::statement("ALTER TABLE messages MODIFY COLUMN type ENUM('text', 'image', 'file', 'system') NOT NULL");
        }
    }
};
