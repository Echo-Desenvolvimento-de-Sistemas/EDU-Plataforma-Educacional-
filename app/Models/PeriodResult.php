<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodResult extends Model
{
    protected $fillable = [
        'grading_period_id',
        'student_id',
        'class_room_id',
        'subject_id',
        'grade',
    ];

    protected $casts = [
        'grade' => 'decimal:2',
    ];

    public function gradingPeriod()
    {
        return $this->belongsTo(GradingPeriod::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
