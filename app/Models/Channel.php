<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'icon',
        'is_active',
        'related_type',
        'related_id',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function related()
    {
        return $this->morphTo();
    }

    public function speakers()
    {
        return $this->belongsToMany(User::class, 'channel_user');
    }
}
