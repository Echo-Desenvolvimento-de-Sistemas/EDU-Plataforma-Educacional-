<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    protected $fillable = [
        'name',
        'email',
        'cpf',
        'phone',
        'rg',
        'profession',
        'workplace',
        'phone_work',
        'phone_home',
        'active',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class)
            ->withPivot(['kinship', 'is_financial_responsible', 'is_pedagogic_responsible', 'resides_with'])
            ->withTimestamps();
    }
}
