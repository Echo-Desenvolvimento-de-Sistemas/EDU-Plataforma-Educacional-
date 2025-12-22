<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationLevel extends Model
{
    protected $fillable = ['name', 'description'];

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
    //
}
