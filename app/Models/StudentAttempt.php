<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentAttempt extends Model
{
    protected $fillable = ['student_id', 'activity_id', 'score', 'started_at', 'finished_at'];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
        'score' => 'decimal:2',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function answers()
    {
        return $this->hasMany(AttemptAnswer::class);
    }
}
