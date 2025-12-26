<?php

namespace App\Models\Kanban;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KanbanBoard extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'created_by'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'kanban_board_user', 'board_id', 'user_id')
            ->withPivot('permission')
            ->withTimestamps();
    }

    public function columns()
    {
        return $this->hasMany(KanbanColumn::class, 'board_id')->orderBy('order');
    }
}
