<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'class_diary_id',
        'student_id',
        'status',
        'observations',
    ];

    public function classDiary()
    {
        return $this->belongsTo(ClassDiary::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
