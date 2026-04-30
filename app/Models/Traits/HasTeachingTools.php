<?php

namespace App\Models\Traits;

use App\Models\QuestionBank;
use App\Models\Kanban\KanbanBoard;

trait HasTeachingTools
{
    public function questionBanks()
    {
        return $this->hasMany(QuestionBank::class);
    }

    public function kanbanBoards()
    {
        return $this->belongsToMany(KanbanBoard::class, 'kanban_board_user', 'user_id', 'board_id')
            ->withPivot('permission')
            ->withTimestamps();
    }
}
