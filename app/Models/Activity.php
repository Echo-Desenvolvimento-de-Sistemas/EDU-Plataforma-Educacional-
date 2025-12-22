<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['title', 'description', 'deadline', 'settings', 'user_id', 'class_room_id'];

    protected $casts = [
        'deadline' => 'datetime',
        'settings' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'activity_questions')
            ->withPivot(['points', 'order'])
            ->orderByPivot('order');
    }

    public function attempts()
    {
        return $this->hasMany(StudentAttempt::class);
    }
}
