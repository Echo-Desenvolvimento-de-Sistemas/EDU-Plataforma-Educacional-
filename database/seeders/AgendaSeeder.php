<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use App\Models\MessageRecipient;

class AgendaSeeder extends Seeder
{
    public function run()
    {
        // Ensure we have a user
        $user = User::first() ?? User::factory()->create([
            'name' => 'Test Parent',
            'email' => 'test@example.com',
        ]);

        // Create Channel
        $channel = Channel::firstOrCreate([
            'name' => 'Secretaria Escolar',
            'type' => 'BROADCAST',
        ], [
            'icon' => 'https://ui-avatars.com/api/?name=Secretaria&background=0D8ABC&color=fff',
            'is_active' => true,
        ]);

        // Create Message
        $message = Message::create([
            'channel_id' => $channel->id,
            'sender_id' => $user->id, // Assuming user can send too or just for seeding
            'body' => 'Olá! Bem-vindo à nova Agenda Digital da escola. Aqui você receberá comunicados importantes.',
            'type' => 'TEXT',
        ]);

        // Add Recipient
        MessageRecipient::create([
            'message_id' => $message->id,
            'recipient_id' => $user->id,
            'status' => 'DELIVERED',
        ]);

        $this->command->info('Agenda Digital mocked successfully.');
        $this->command->info("Test User ID: {$user->id}");
    }
}
