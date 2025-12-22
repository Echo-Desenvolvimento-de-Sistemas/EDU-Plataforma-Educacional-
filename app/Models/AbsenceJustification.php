<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbsenceJustification extends Model
{
    protected $fillable = [
        'student_id',
        'start_date',
        'end_date',
        'type',
        'description',
        'status',
        'attachment_path',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
