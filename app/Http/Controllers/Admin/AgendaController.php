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
        $channels = $query->with('related')->get();

        // Fetch data for ComposeModal
        $classes = [];
        $students = [];

        if ($user->role === 'admin' || $user->role === 'secretaria') {
            $classes = ClassRoom::with('grade')->get();
            $students = Student::whereNotNull('user_id')->get(['id', 'name']);
        } elseif ($user->role === 'professor') {
            $classes = $user->allocations()->with('classRoom.grade')->get()->pluck('classRoom');
            $classIds = $classes->pluck('id')->toArray();
            $students = Student::whereIn('class_room_id', $classIds)->whereNotNull('user_id')->get(['id', 'name']);
        }

        $staff = User::whereIn('role', ['admin', 'secretaria', 'professor'])->get(['id', 'name', 'role']);

        // Extra data for new unified page (formerly in AgendaSettingController)
        $groups = Channel::where('type', 'BROADCAST')
            ->whereNull('related_type')
            ->with('speakers:id,name,role')
            ->get();

        $classRooms = ClassRoom::with(['allocations.user', 'channel.speakers', 'grade'])->get()->map(function ($cr) {
            $gradeName = $cr->grade ? $cr->grade->name : '';
            return [
                'id'         => $cr->id,
                'name'       => $cr->name,
                'series'     => $gradeName,
                'letter'     => ($cr->name !== $gradeName) ? $cr->name : '',
                'channel'    => $cr->channel,
                'professors' => $cr->allocations->map(fn($a) => $a->user)->unique('id')->values(),
            ];
        });

        return Inertia::render('Admin/Agenda/Index', [
            'channels'   => $channels,
            'groups'     => $groups,
            'classes'    => $classRooms,
            'students'   => $students,
            'staff'      => $staff,
            'userRole'   => $user->role,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:BROADCAST,CLASS,DIRECT',
            'icon' => 'nullable',
            'related_type' => 'nullable|string',
            'related_id' => 'nullable|integer',
            'can_reply' => 'nullable|boolean',
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
            'can_reply' => $validated['can_reply'] ?? false,
            'related_type' => $validated['related_type'] ?? null,
            'related_id' => $validated['related_id'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Canal criado com sucesso.');
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'channel_id' => 'nullable|exists:channels,id',
            'class_room_id' => 'nullable|exists:class_rooms,id',
            'student_id' => 'nullable|exists:students,id',
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'exists:students,id',
            'title' => 'nullable|string|max:255',
            'body' => 'required|string',
            'type' => 'required|string',
            'target_audience' => 'nullable|in:student,guardian,both',
            'metadata' => 'nullable|array',
            'banner_image' => 'nullable|image|max:2048',
            'attachments.*' => 'nullable|file|max:10240',
        ]);

        $sender = auth()->user();
        $channel = null;

        // 1. Resolve Channel
        if ($validated['channel_id']) {
            $channel = Channel::findOrFail($validated['channel_id']);
        } elseif ($validated['class_room_id']) {
            // Find class channel or create one
            $channel = Channel::firstOrCreate(
                [
                    'related_type' => ClassRoom::class,
                    'related_id' => $validated['class_room_id'],
                    'type' => 'CLASS'
                ],
                [
                    'name' => 'Canal: ' . ClassRoom::find($validated['class_room_id'])->name,
                    'icon' => 'message-circle',
                    'is_active' => true,
                ]
            );
        } elseif (!empty($validated['student_ids'])) {
            // Multi-student selection
            $firstStudent = Student::findOrFail($validated['student_ids'][0]);
            $channel = Channel::firstOrCreate(
                [
                    'type' => 'BROADCAST',
                    'name' => 'Mensagem Direta - ' . now()->format('d/m/Y H:i'),
                ],
                [
                    'icon' => 'message-circle',
                    'is_active' => true,
                ]
            );
        } elseif (!empty($validated['student_id'])) {
            $student = Student::findOrFail($validated['student_id']);
            $studentUser = $student->user;
            
            if (!$studentUser) {
                return back()->with('error', 'Este aluno não possui um usuário cadastrado.');
            }

            $channel = Channel::firstOrCreate(
                [
                    'type' => 'DIRECT',
                    'related_type' => User::class,
                    'related_id' => $studentUser->id
                ],
                [
                    'name' => 'Chat: ' . $student->name,
                    'icon' => 'message-square',
                    'is_active' => true,
                    'can_reply' => true,
                ]
            );
            
            // Ensure sender is a speaker in this DM channel if not already
            if (!$channel->speakers()->where('user_id', $sender->id)->exists()) {
                $channel->speakers()->attach($sender->id);
            }
        }

        if (!$channel) {
            return back()->with('error', 'Destinatário inválido.');
        }

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

            // 2. Dispatch Processing Job (Async/AfterResponse)
            // Using dispatchAfterResponse ensures the user gets a 200 OK immediately
            // even if the queue driver is set to 'sync' (common in dev).
            \App\Jobs\ProcessMessageRecipientsJob::dispatchAfterResponse(
                $message,
                $validated['target_audience'] ?? 'both',
                $validated['student_ids'] ?? []
            );
        });

        return redirect()->back()->with('success', 'Mensagem enviada com sucesso.');
    }

    /**
     * Start a direct message with a student
     */
    public function startDirectMessage(Student $student)
    {
        $admin = auth()->user();
        $studentUser = $student->user;

        if (!$studentUser) {
            return back()->with('error', 'Este aluno não possui um usuário cadastrado.');
        }

        // Find or create a DIRECT channel between these two
        // For simplicity, we name it after the student
        $channelName = "Chat: " . $student->name;
        
        // Try to find existing DIRECT channel related to this student's user
        $channel = Channel::where('type', 'DIRECT')
            ->where('related_type', User::class)
            ->where('related_id', $studentUser->id)
            ->first();

        if (!$channel) {
            $channel = Channel::create([
                'name' => $channelName,
                'type' => 'DIRECT',
                'icon' => 'message-square',
                'is_active' => true,
                'can_reply' => true, // DMs are always two way
                'related_type' => User::class,
                'related_id' => $studentUser->id,
            ]);

            // Add the sender as a speaker (Admin/Prof etc)
            $channel->speakers()->attach($admin->id);
            // In DMs, the related_id user is the other participant
        }

        return redirect()->route('admin.agenda.index')->with('select_channel', $channel->id);
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
}
