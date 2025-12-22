<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassDiary extends Model
{
    protected $fillable = [
        'class_room_id',
        'subject_id',
        'user_id',
        'date',
        'classes_count',
        'content',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
