<?php

namespace App\Models\Kanban;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KanbanColumn extends Model
{
    use HasFactory;

    protected $fillable = ['board_id', 'name', 'order', 'color'];

    public function board()
    {
        return $this->belongsTo(KanbanBoard::class, 'board_id');
    }

    public function cards()
    {
        return $this->hasMany(KanbanCard::class, 'column_id')->orderBy('order');
    }
}
