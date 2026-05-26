<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreRegistration extends Model
{
    protected $fillable = [
        'token',
        'student_name',
        'status',
        'created_by',
        'target_class_id',
        'student_id',
        'type',
        'lgpd_accepted_at',
        'lgpd_accepted_ip',
        'lgpd_accepted_user_agent',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function targetClass()
    {
        return $this->belongsTo(ClassRoom::class, 'target_class_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
