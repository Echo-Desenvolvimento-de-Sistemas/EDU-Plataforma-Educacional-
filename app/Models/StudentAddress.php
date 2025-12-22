<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentAddress extends Model
{
    protected $fillable = [
        'student_id',
        'cep',
        'street',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state',
        'zone',
        'phone_contact',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
