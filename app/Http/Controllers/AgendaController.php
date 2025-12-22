<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Message;
use App\Models\MessageRecipient;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Fetch conversations (channels where user has received messages or subscribed)
        // For simplicity, showing all ACTIVE channels for now.
        // In a real app, you might filter this by MessageRecipient existence or distinct channel_ids
        $query = Channel::where('is_active', true);

        if ($user->role === 'aluno') {
            $student = $user->student;
            if ($student && $student->class_room_id) {
                $query->where(function ($q) use ($student) {
                    $q->where(function ($q2) use ($student) {
                        $q2->where('related_type', ClassRoom::class)
                            ->where('related_id', $student->class_room_id);
                    })->orWhereNull('related_type'); // Global/Broadcast channels
                });
            } else {
                // Student has no class, maybe show nothing or just global?
                // Let's safe fallback to just global/broadcast to avoid leaking other classes
                $query->whereNull('related_type');
            }
        }

        if ($user->role === 'responsavel') {
            $guardian = $user->guardian;
            if ($guardian) {
                // Get classes of all students related to this guardian
                $studentClassIds = $guardian->students()
                    ->whereNotNull('class_room_id')
                    ->pluck('class_room_id')
                    ->unique();

                $query->where(function ($q) use ($studentClassIds) {
                    $q->where(function ($q2) use ($studentClassIds) {
                        $q2->where('related_type', ClassRoom::class)
                            ->whereIn('related_id', $studentClassIds);
                    })->orWhereNull('related_type');
                });
            } else {
                $query->whereNull('related_type');
            }
        }

        $conversations = $query->with([
            'messages' => function ($query) {
                $query->latest()->limit(1);
            }
        ])
            ->get()
            ->sortByDesc(function ($channel) {
                $lastMessage = $channel->messages->first();
                return $lastMessage ? $lastMessage->created_at->timestamp : 0;
            })
            ->values()
            ->map(function ($channel) use ($user) {
                $lastMessage = $channel->messages->first();
                $unreadCount = 0;

                if ($lastMessage) {
                    $unreadCount = MessageRecipient::where('message_id', $lastMessage->id)
                        ->where('recipient_id', $user->id)
                        ->whereNull('read_at')
                        ->count();
                }

                return [
                    'id' => $channel->id,
                    'name' => $channel->name,
                    'icon' => $channel->icon,
                    'last_message' => $lastMessage ? $lastMessage->body : null,
                    'last_message_at' => $lastMessage ? $lastMessage->created_at->diffForHumans() : null,
                    'unread_count' => $unreadCount,
                ];
            });

        // 2. Fetch Allowed Channels for Composition
        $allowedChannels = collect([]);

        if ($user->role === 'professor') {
            // Get classes the professor is allocated to
            $classIds = $user->allocations()->pluck('class_room_id')->unique();

            // Find Channels linked to these classes
            $classChannels = Channel::where('related_type', ClassRoom::class)
                ->whereIn('related_id', $classIds)
                ->get()
                ->map(function ($c) {
                    return ['id' => $c->id, 'name' => $c->name];
                });

            $allowedChannels = $allowedChannels->merge($classChannels);
        } elseif ($user->role === 'admin') {
            $broadcasts = Channel::where('type', 'BROADCAST')->get()->map(function ($c) {
                return ['id' => $c->id, 'name' => $c->name];
            });
            $allowedChannels = $allowedChannels->merge($broadcasts);
        }

        // 3. Add explicit speaking channels (from settings)
        // This allows Secretaria or specific Professors to speak in Broadcast groups
        $explicitChannels = $user->speakingChannels->map(function ($c) {
            return ['id' => $c->id, 'name' => $c->name];
        });

        $allowedChannels = $allowedChannels->merge($explicitChannels)->unique('id');

        if (request()->wantsJson()) {
            return response()->json([
                'channels' => $conversations,
            ]);
        }

        return Inertia::render('Agenda/Inbox', [
            'channels' => $conversations,
            'allowedChannels' => $allowedChannels->values(),
            'canConfigure' => $user->role === 'admin',
        ]);
    }

    public function show(Channel $channel)
    {
        $user = auth()->user();

        $messages = $this->getFormattedMessages($channel, $user);

        if (request()->wantsJson()) {
            return response()->json($messages);
        }

        return Inertia::render('Agenda/Chat', [
            'channel' => [
                'id' => $channel->id,
                'name' => $channel->name,
                'icon' => $channel->icon,
            ],
            'messages' => $messages,
        ]);
    }

    public function poll(Channel $channel)
    {
        $user = auth()->user();
        return response()->json($this->getFormattedMessages($channel, $user));
    }

    private function getFormattedMessages($channel, $user)
    {
        return $channel->messages()
            ->with([
                'sender',
                'recipients' => function ($query) use ($user) {
                    $query->where('recipient_id', $user->id);
                }
            ])
            ->latest()
            ->paginate(50)
            ->through(function ($message) use ($user) {
                // Formatting logic moved here
                $visualContext = match ($message->type) {
                    'URGENT' => '#ef4444',
                    'FINANCIAL' => '#22c55e',
                    'EVENT' => '#3b82f6',
                    'NOTICE' => '#f59e0b',
                    'HOMEWORK' => '#8b5cf6',
                    default => '#64748b',
                };

                $typeLabel = match ($message->type) {
                    'URGENT' => 'Urgente',
                    'FINANCIAL' => 'Financeiro',
                    'EVENT' => 'Evento',
                    'NOTICE' => 'Aviso',
                    'HOMEWORK' => 'Atividade de Casa',
                    default => 'Geral',
                };

                $actions = [];
                if (isset($message->metadata['action_type'])) {
                    $actions[] = [
                        'type' => $message->metadata['action_type'],
                        'label' => $message->metadata['action_label'] ?? 'Ação',
                        'data' => $message->metadata['action_data'] ?? null,
                        'style' => $message->type === 'URGENT' || $message->type === 'FINANCIAL' ? 'primary' : 'outline',
                    ];
                }

                $myReceipt = $message->recipients->first();
                return [
                    'id' => $message->id,
                    'title' => $message->title,
                    'body' => $message->body,
                    'type' => $message->type,
                    'type_label' => $typeLabel,
                    'visual_context' => $visualContext,
                    'metadata' => $message->metadata,
                    'actions' => $actions,
                    'created_at_human' => $message->created_at->locale('pt_BR')->diffForHumans(),
                    'created_at' => $message->created_at->format('H:i'),
                    'is_me' => $message->sender_id === $user->id,
                    'sender' => [
                        'name' => $message->sender->name,
                        'role' => $message->sender->role,
                        'avatar' => $message->sender->profile_photo_url ?? null,
                    ],
                    'read_at' => $myReceipt ? $myReceipt->read_at : null,
                ];
            });
    }

    public function markAsRead(Request $request, Message $message)
    {
        $user = auth()->user();

        $recipient = MessageRecipient::where('message_id', $message->id)
            ->where('recipient_id', $user->id)
            ->first();

        if ($recipient && is_null($recipient->read_at)) {
            $recipient->update(['read_at' => now(), 'status' => 'READ']);
        }

        return response()->json(['success' => true]);
    }
}
