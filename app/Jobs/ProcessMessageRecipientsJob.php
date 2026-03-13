<?php

namespace App\Jobs;

use App\Models\Message;
use App\Models\MessageRecipient;
use App\Models\Student;
use App\Models\User;
use App\Models\ClassRoom;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessMessageRecipientsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $targetAudience;
    protected $studentIds;

    /**
     * Create a new job instance.
     */
    public function __construct(Message $message, string $targetAudience = 'both', array $studentIds = [])
    {
        $this->message = $message;
        $this->targetAudience = $targetAudience;
        $this->studentIds = $studentIds;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $channel = $this->message->channel;
        
        // 1. Resolve Recipients
        $recipientIds = $this->resolveRecipients($channel, $this->targetAudience, $this->studentIds);

        if ($recipientIds->isEmpty()) {
            Log::info("No recipients found for message ID: {$this->message->id}");
            return;
        }

        // 2. Create Recipients in Bulk
        $recipientData = $recipientIds->map(function ($userId) {
            return [
                'message_id' => $this->message->id,
                'recipient_id' => $userId,
                'read_at' => null,
                'status' => 'DELIVERED',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        // Insert in chunks
        foreach (array_chunk($recipientData, 500) as $chunk) {
            MessageRecipient::insert($chunk);
        }

        // 3. Dispatch WhatsApp Notification Job (Async)
        try {
            SendWhatsAppNotification::dispatch(
                $this->message->id,
                $recipientIds->toArray()
            );
        } catch (\Exception $e) {
            Log::error('Failed to dispatch WhatsApp job from ProcessMessageRecipientsJob: ' . $e->getMessage());
        }
    }

    protected function resolveRecipients($channel, string $targetAudience, array $studentIds)
    {
        // If multi-student IDs provided, use those directly
        if (!empty($studentIds)) {
            $selectedStudents = Student::whereIn('id', $studentIds)->get();
            return $this->resolveByTarget($selectedStudents, $targetAudience);
        }

        // If Broadcast, sent to ALL active users
        if ($channel->type === 'BROADCAST') {
            return User::where('id', '!=', $this->message->sender_id)
                ->where('active', true)
                ->pluck('id');
        }

        // If Class channel, resolve by target audience
        if ($channel->related_type === ClassRoom::class) {
            $classRoomId = $channel->related_id;
            $classStudents = Student::where('class_room_id', $classRoomId)->get();
            return $this->resolveByTarget($classStudents, $targetAudience);
        }

        // If Direct message, send to the related user
        if ($channel->type === 'DIRECT' && $channel->related_type === User::class) {
            return collect([$channel->related_id]);
        }

        return collect([]);
    }

    protected function resolveByTarget($students, string $targetAudience)
    {
        $recipientIds = collect([]);

        if ($targetAudience === 'student' || $targetAudience === 'both') {
            $studentUserIds = $students->whereNotNull('user_id')->pluck('user_id');
            $recipientIds = $recipientIds->merge($studentUserIds);
        }

        if ($targetAudience === 'guardian' || $targetAudience === 'both') {
            $studentIds = $students->pluck('id');
            $guardianUserIds = DB::table('students')
                ->join('guardian_student', 'students.id', '=', 'guardian_student.student_id')
                ->join('guardians', 'guardian_student.guardian_id', '=', 'guardians.id')
                ->whereIn('students.id', $studentIds)
                ->whereNotNull('guardians.user_id')
                ->select('guardians.user_id')
                ->distinct()
                ->pluck('user_id');
            $recipientIds = $recipientIds->merge($guardianUserIds);
        }

        return $recipientIds->unique();
    }
}
