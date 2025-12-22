<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    protected $fillable = ['name', 'grade_id', 'academic_year_id', 'shift'];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }

    public function channel()
    {
        return $this->morphOne(Channel::class, 'related');
    }
}
