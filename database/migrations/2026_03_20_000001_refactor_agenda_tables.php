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
        // Drop old tables to start fresh with UUIDs and new names
        Schema::dropIfExists('message_recipients');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('channel_user');
        Schema::dropIfExists('channels');

        Schema::create('channels', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->string('title');
            $table->enum('type', ['broadcast', 'communication', 'direct']);
            $table->boolean('can_reply')->default(false);
            $table->string('context_type')->nullable();
            $table->char('context_id', 36)->nullable();
            $table->index(['context_type', 'context_id']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('channel_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->char('channel_id', 36);
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');
            $table->boolean('is_speaker')->default(false);
            $table->timestamp('last_read_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'channel_id']);
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->char('channel_id', 36);
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->json('content'); // Supports rich cards, text, stickers, etc.
            $table->enum('type', [
                'text', 'image', 'file', 'system', 'notice', 'event', 'financial', 'urgent', 'homework', 'comunicado'
            ]);
            $table->timestamps();
        });

        Schema::create('message_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'message_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_recipients');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('channel_users');
        Schema::dropIfExists('channels');

        // Note: We don't recreate the old tables here to avoid complexity, 
        // as this is a fundamental architectural shift.
    }
};
