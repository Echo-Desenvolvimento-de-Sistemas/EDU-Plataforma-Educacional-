<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Guardian;
use App\Models\ClassRoom;

class Student extends Model
{
    protected $fillable = [
        'name',
        'birth_date',
        'cpf',
        'rg',
        'certidao_nascimento',
        'medical_info',
        'emergency_contact',
        'class_room_id',
        'photo_path',
        'social_name',
        'sex',
        'color_race',
        'nationality',
        'place_of_birth',
        'state_of_birth',
        'rg_issuer',
        'rg_state',
        'rg_date',
        'birth_cert_model',
        'birth_cert_number',
        'birth_cert_old_info',
        'nis',
        'mother_name',
        'father_name',
        'parents_marital_status',
        'authorized_pickups',
        'exit_authorization',
        'transport_info',
        'enrollment_date',
        'status',
        'origin_school',
        'observations',
        'user_id',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'rg_date' => 'date',
        'enrollment_date' => 'date',
        'birth_cert_old_info' => 'array',
        'authorized_pickups' => 'array',
        'exit_authorization' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function guardians()
    {
        return $this->belongsToMany(Guardian::class)
            ->withPivot(['kinship', 'is_financial_responsible', 'is_pedagogic_responsible', 'resides_with'])
            ->withTimestamps();
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function address()
    {
        return $this->hasOne(StudentAddress::class);
    }

    public function health()
    {
        return $this->hasOne(StudentHealth::class);
    }

    public function issuedDocuments()
    {
        return $this->hasMany(IssuedDocument::class);
    }
}
