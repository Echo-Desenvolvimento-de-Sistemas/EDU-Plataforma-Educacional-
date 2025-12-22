<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $fillable = ['name', 'education_level_id'];

    public function educationLevel()
    {
        return $this->belongsTo(EducationLevel::class);
    }

    public function classRooms()
    {
        return $this->hasMany(ClassRoom::class);
    }
}
