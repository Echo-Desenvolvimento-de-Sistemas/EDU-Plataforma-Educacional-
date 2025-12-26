<?php

namespace App\Events;

use App\Models\Kanban\KanbanCard;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class KanbanCardUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $card;

    public function __construct(KanbanCard $card)
    {
        $this->card = $card->load('assignee');
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('kanban.' . $this->card->column->board_id),
        ];
    }
}
