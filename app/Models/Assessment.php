<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'grading_period_id',
        'class_room_id',
        'subject_id',
        'title',
        'description',
        'date',
        'max_points',
        'weight',
        'is_recovery',
    ];

    protected $casts = [
        'date' => 'date',
        'max_points' => 'decimal:2',
        'weight' => 'decimal:2',
        'is_recovery' => 'boolean',
    ];

    public function gradingPeriod()
    {
        return $this->belongsTo(GradingPeriod::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function grades()
    {
        return $this->hasMany(StudentGrade::class);
    }
}
