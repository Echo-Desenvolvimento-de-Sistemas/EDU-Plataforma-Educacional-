<?php

namespace App\Models\Traits;

use App\Models\Allocation;
use App\Models\Student;
use App\Models\Guardian;

trait HasAcademicRelations
{
    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function guardian()
    {
        return $this->hasOne(Guardian::class);
    }
}
