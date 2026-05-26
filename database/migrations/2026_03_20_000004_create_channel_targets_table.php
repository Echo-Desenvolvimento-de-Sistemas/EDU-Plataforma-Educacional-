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
        Schema::create('channel_targets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('channel_id')->constrained('channels')->onDelete('cascade');
            $table->string('target_type'); // e.g. App\Models\ClassRoom, App\Models\Student, etc.
            $table->string('target_id'); // Using string for flexibility with UUIDs or IDs
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['target_type', 'target_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('channel_targets');
    }
};
