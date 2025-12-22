<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\Message;
use App\Models\MessageRecipient;
use App\Models\User;
use App\Models\ClassRoom;
use App\Models\Student;
use App\Models\Guardian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AgendaController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Channel::withCount('messages')->latest();

        if ($user->role === 'responsavel') {
            $guardian = Guardian::where('user_id', $user->id)->first();

            if ($guardian) {
                // Get IDs of classes where guardian has students
                $classIds = $guardian->students()
                    ->pluck('class_room_id')
                    ->filter()
                    ->unique()
                    ->values()
                    ->toArray();

                $query->where(function ($q) use ($classIds) {
                    // Show Broadcasts (Global)
                    $q->where('type', 'BROADCAST')
                        // And Class-specific channels for their students
                        ->orWhere(function ($q2) use ($classIds) {
                            $q2->where('related_type', ClassRoom::class)
                                ->whereIn('related_id', $classIds);
                        });
                });
            } else {
                // Guardian with no profile or students sees only Broadcasts
                $query->where('type', 'BROADCAST');
            }
        } elseif ($user->role === 'aluno') {
            // Similar logic for students if needed, or currently they see everything?
            // Usually students only see their class + broadcast
            if ($user->student) {
                $classId = $user->student->class_room_id;
                $query->where(function ($q) use ($classId) {
                    $q->where('type', 'BROADCAST')
                        ->orWhere(function ($q2) use ($classId) {
                            $q2->where('related_type', ClassRoom::class)
                                ->where('related_id', $classId);
                        });
                });
            } else {
                $query->where('type', 'BROADCAST');
            }
        } elseif ($user->role === 'professor') {
            // Professors see their allocated classes + broadcast + explicitly assigned
            $allowedClassIds = $user->allocations()->pluck('class_room_id')->toArray();
            $explicitChannelIds = $user->speakingChannels->pluck('id')->toArray();

            $query->where(function ($q) use ($allowedClassIds, $explicitChannelIds) {
                $q->where('type', 'BROADCAST')
                    ->orWhere(function ($q2) use ($allowedClassIds) {
                        $q2->where('related_type', ClassRoom::class)
                            ->whereIn('related_id', $allowedClassIds);
                    })
                    ->orWhereIn('id', $explicitChannelIds);
            });
        }

        // Admin sees everything (no filter applied)

        $channels = $query->get();

        return Inertia::render('Admin/Agenda/Index', [
            'channels' => $channels,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:BROADCAST,CLASS',
            'icon' => 'nullable', // Can be file or string
            // If it's a specific class channel
            'related_type' => 'nullable|string',
            'related_id' => 'nullable|integer',
        ]);

        $iconPath = 'message-circle'; // Default

        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('channels', 'public');
            $iconPath = asset('storage/' . $path);
        } elseif (isset($validated['icon']) && is_string($validated['icon'])) {
            $iconPath = $validated['icon'];
        }

        $channel = Channel::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'icon' => $iconPath,
            'is_active' => true,
            'related_type' => $validated['related_type'] ?? null,
            'related_id' => $validated['related_id'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Canal criado com sucesso.');
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'channel_id' => 'required|exists:channels,id',
            'title' => 'nullable|string|max:255',
            'body' => 'required|string',
            'type' => 'required|string', // Flexible type for Rich Cards
            'metadata' => 'nullable|array',
            'banner_image' => 'nullable|image|max:2048', // 2MB
            'attachments.*' => 'nullable|file|max:10240', // 10MB
        ]);

        $channel = Channel::findOrFail($validated['channel_id']);
        $sender = auth()->user();

        // Security Check for Professors
        if ($sender->role === 'professor') {
            // Verify if the channel is related to one of the professor's classes
            $allowedClassIds = $sender->allocations()->pluck('class_room_id')->toArray();

            // Check if channel is bound to a class AND that class is in allocations
            // OR check if channel is explicitly allowed (speakingChannels)
            $isClassChannel = $channel->related_type === ClassRoom::class && in_array($channel->related_id, $allowedClassIds);
            $isExplicitChannel = $sender->speakingChannels->contains($channel->id);

            if (!$isClassChannel && !$isExplicitChannel) {
                abort(403, 'Você não tem permissão para enviar mensagens neste canal.');
            }
        }

        // Handle File Uploads and Prepare Metadata
        $metadata = $validated['metadata'] ?? [];

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('agenda/banners', 'public');
            $metadata['banner_image'] = asset('storage/' . $path);
        }

        if ($request->hasFile('attachments')) {
            $attachments = [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('agenda/attachments', 'public'); // Store file
                $attachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'url' => asset('storage/' . $path),
                    'size' => $this->formatSize($file->getSize()),
                    'mime' => $file->getMimeType(),
                ];
            }
            $metadata['attachments'] = $attachments;
        }

        DB::transaction(function () use ($channel, $sender, $validated, $metadata) {
            // 1. Create Message
            $message = Message::create([
                'channel_id' => $channel->id,
                'sender_id' => $sender->id,
                'title' => $validated['title'] ?? null,
                'body' => $validated['body'],
                'type' => $validated['type'],
                'metadata' => $metadata,
            ]);

            // 2. Determine Recipients
            $recipientIds = $this->resolveRecipients($channel);

            // 3. Create Recipients in Bulk
            $recipientData = collect($recipientIds)->map(function ($userId) use ($message) {
                return [
                    'message_id' => $message->id,
                    'recipient_id' => $userId,
                    'read_at' => null,
                    'status' => 'DELIVERED',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray();

            // Insert in chunks to avoid memory issues
            foreach (array_chunk($recipientData, 500) as $chunk) {
                MessageRecipient::insert($chunk);
            }

            // Dispatch WhatsApp Notification Job (Async)
            // Send to ALL recipients
            try {
                \App\Jobs\SendWhatsAppNotification::dispatchAfterResponse(
                    $message->id,
                    $recipientIds->toArray()
                );
            } catch (\Exception $e) {
                // Don't block message creation if queue fails
                \Illuminate\Support\Facades\Log::error('Failed to dispatch WhatsApp job: ' . $e->getMessage());
            }
        });

        return redirect()->back()->with('success', 'Mensagem enviada com sucesso.');
    }

    private function formatSize($bytes)
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        }
        return $bytes . ' bytes';
    }

    protected function resolveRecipients(Channel $channel)
    {
        // If Broadcast, sent to ALL users (or specific roles if we refine later)
        if ($channel->type === 'BROADCAST') {
            // Dangerous for large scale, but fine for MVP
            // Ideally filter by active status
            return User::where('id', '!=', auth()->id())->pluck('id');
        }

        // If Class channel, send to Students (Users) and Guardians (Users) linked to that Class
        if ($channel->related_type === ClassRoom::class) {
            $classRoomId = $channel->related_id;

            // Get students in this class
            $studentUserIds = Student::where('class_room_id', $classRoomId)
                ->whereNotNull('user_id')
                ->pluck('user_id');

            // Get guardians of students in this class
            // This is complex: Class -> Students -> Guardians -> User
            // Assuming we want to reach Guardian Users
            $guardianUserIds = DB::table('students')
                ->join('guardian_student', 'students.id', '=', 'guardian_student.student_id')
                ->join('guardians', 'guardian_student.guardian_id', '=', 'guardians.id')
                ->where('students.class_room_id', $classRoomId)
                ->whereNotNull('guardians.user_id')
                ->select('guardians.user_id')
                ->distinct()
                ->pluck('user_id');

            return $studentUserIds->merge($guardianUserIds)->unique();
        }

        return [];
    }
}
