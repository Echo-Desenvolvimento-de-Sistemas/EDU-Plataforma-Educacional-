<?php

namespace App\Services;

use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use App\Jobs\SendCommunicationJob;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AgendaService
{
    /**
     * Create a new agenda channel.
     */
    public function createChannel(string $title, string $type, ?Model $context = null, bool $canReply = false, ?string $iconPath = null): Channel
    {
        return Channel::create([
            'title' => $title,
            'type' => $type,
            'context_type' => $context ? get_class($context) : null,
            'context_id' => $context ? $context->id : null,
            'can_reply' => $canReply,
            'icon_path' => $iconPath,
            'is_active' => true,
        ]);
    }

    /**
     * Update an existing agenda channel.
     */
    public function updateChannel(Channel $channel, array $data): Channel
    {
        $channel->update($data);
        return $channel;
    }

    /**
     * Add a user to a channel with speaker permissions.
     */
    public function addUserToChannel(Channel $channel, User $user, bool $isSpeaker = false): void
    {
        $channel->users()->syncWithoutDetaching([
            $user->id => ['is_speaker' => $isSpeaker]
        ]);
    }

    /**
     * Remove a user from a channel.
     */
    public function removeUserFromChannel(Channel $channel, User $user): void
    {
        $channel->users()->detach($user->id);
    }

    /**
     * Send a message to a channel.
     */
    public function sendMessage(Channel $channel, User $sender, array $content, string $type = 'text', ?int $targetId = null): Message
    {
        // ACL check
        if ($channel->type === 'broadcast' && !$this->isUserSpeaker($channel, $sender)) {
            throw new \Exception("User is not authorized to speak in this broadcast channel.");
        }

        return DB::transaction(function () use ($channel, $sender, $content, $type, $targetId) {
            $isSpeaker = $this->isUserSpeaker($channel, $sender);
            $effectiveTargetId = $targetId;

            // In communication channels, if a non-speaker (student/guardian) sends, 
            // the target_id automatically becomes their own ID (marking the thread).
            if ($channel->type === 'communication' && !$isSpeaker && !$effectiveTargetId) {
                $effectiveTargetId = $sender->id;
            }

            $message = Message::create([
                'channel_id' => $channel->id,
                'sender_id' => $sender->id,
                'target_id' => $effectiveTargetId,
                'content' => $content,
                'type' => $type,
            ]);

            // Dispatch job with appropriate priority and recipients
            $priority = $channel->type === 'broadcast' ? 'low' : 'high';
            
            // Calculate recipients based on telemarketing model
            $recipients = $channel->users;
            
            if ($channel->type === 'communication' && $effectiveTargetId) {
                // If it's a communication channel with a target (thread), 
                // only the target user and the speakers should receive it.
                $recipients = $channel->users()
                    ->whereRaw('(users.id = ? OR channel_users.is_speaker = ?)', [$effectiveTargetId, true])
                    ->get();
            }

            \App\Jobs\SendCommunicationJob::dispatch($message, $recipients)
                ->onQueue($priority);

            return $message;
        });
    }

    /**
     * Get or create a direct channel for a student (staff <-> student/guardians)
     */
    public function getOrCreateDirectChannel(User $sender, \App\Models\Student $student): Channel
    {
        // Try to find existing direct channel for this student
        $channel = Channel::where('type', 'direct')
            ->where('context_type', \App\Models\Student::class)
            ->where('context_id', $student->id)
            ->first();

        if (!$channel) {
            $channel = $this->createChannel(
                $student->name,
                'direct',
                $student,
                true // Direct channels always allow reply
            );
        }

        // Ensure sender is a member/speaker
        $this->addUserToChannel($channel, $sender, true);

        // Ensure student user is a member
        if ($student->user_id) {
            $this->addUserToChannel($channel, $student->user, false);
        }

        // Ensure guardians are members
        foreach ($student->guardians as $guardian) {
            if ($guardian->user_id) {
                $this->addUserToChannel($channel, $guardian->user, false);
            }
        }

        return $channel;
    }

    /**
     * Sync the audience for a channel based on provided targets.
     * Targets can be ['ClassRoom:id', 'Student:id', 'Guardian:id', 'User:id']
     */
    public function syncChannelAudience(Channel $channel, array $targets): void
    {
        $userIds = collect([]);

        foreach ($targets as $targetStr) {
            [$type, $id] = explode(':', $targetStr);
            
            switch (strtolower($type)) {
                case 'classroom':
                    $class = \App\Models\ClassRoom::with(['students.user', 'students.guardians.user'])->find($id);
                    if ($class) {
                        foreach ($class->students as $student) {
                            if ($student->user) $userIds->push($student->user->id);
                            foreach ($student->guardians as $guardian) {
                                if ($guardian->user) $userIds->push($guardian->user->id);
                            }
                        }
                    }
                    break;
                case 'student':
                    $student = \App\Models\Student::with(['user', 'guardians.user'])->find($id);
                    if ($student) {
                        if ($student->user) $userIds->push($student->user->id);
                        foreach ($student->guardians as $guardian) {
                            if ($guardian->user) $userIds->push($guardian->user->id);
                        }
                    }
                    break;
                case 'guardian':
                    $guardian = \App\Models\Guardian::with('user')->find($id);
                    if ($guardian && $guardian->user) {
                        $userIds->push($guardian->user->id);
                    }
                    break;
                case 'user':
                    $userIds->push($id);
                    break;
            }

            // Save target record if not exists
            $channel->channelTargets()->updateOrCreate([
                'target_type' => $this->resolveTargetType($type),
                'target_id' => $id,
            ]);
        }

        // Sync to channel_users as non-speakers
        $syncData = $userIds->unique()->mapWithKeys(fn($id) => [$id => ['is_speaker' => false]])->toArray();
        $channel->users()->syncWithoutDetaching($syncData);
    }

    private function resolveTargetType(string $type): string
    {
        return match (strtolower($type)) {
            'classroom' => \App\Models\ClassRoom::class,
            'student' => \App\Models\Student::class,
            'guardian' => \App\Models\Guardian::class,
            'user' => \App\Models\User::class,
            default => $type,
        };
    }

    /**
     * Check if a user is a speaker in a channel.
     */
    public function isUserSpeaker(Channel $channel, User $user): bool
    {
        return $channel->users()
            ->where('user_id', $user->id)
            ->wherePivot('is_speaker', true)
            ->exists();
    }
}
