<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentHealth extends Model
{
    protected $fillable = [
        'student_id',
        'blood_type',
        'allergies',
        'food_restrictions',
        'continuous_meds',
        'has_disability',
        'disability_details',
        'cid',
        'health_plan',
        'health_unit',
        'vaccination_updated',
    ];

    protected $casts = [
        'has_disability' => 'boolean',
        'vaccination_updated' => 'boolean',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
