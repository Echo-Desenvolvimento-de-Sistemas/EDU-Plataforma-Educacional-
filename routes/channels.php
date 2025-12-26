<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('kanban.{boardId}', function ($user, $boardId) {
    if ($user->role === 'admin') {
        return true;
    }
    return $user->kanbanBoards()->where('kanban_board_id', $boardId)->exists();
});
