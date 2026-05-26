<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'type',
        'icon',
        'is_active',
        'can_reply',
        'context_type',
        'context_id',
    ];

    protected $appends = ['name', 'icon'];

    public function getNameAttribute()
    {
        return $this->title;
    }

    public function getTypeAttribute($value)
    {
        $upper = strtoupper($value);
        return $upper === 'COMMUNICATION' ? 'CLASS' : $upper;
    }

    public function setTypeAttribute($value)
    {
        $upper = strtoupper($value);
        $this->attributes['type'] = $upper === 'CLASS' ? 'COMMUNICATION' : $upper;
    }

    /**
     * Get the icon attribute with corrected URL.
     * Fixes icons saved with old APP_URL (port 8000) to use current APP_URL.
     */
    public function getIconAttribute(): ?string
    {
        $value = $this->attributes['icon_path'] ?? null;
        if (!$value) {
            return null;
        }

        // If icon contains old localhost URLs, replace with current APP_URL
        if (str_contains($value, 'http://127.0.0.1:8000') || str_contains($value, 'http://localhost:8000')) {
            $value = str_replace('http://127.0.0.1:8000', config('app.url'), $value);
            $value = str_replace('http://localhost:8000', config('app.url'), $value);
        }

        return $value;
    }

    public function setIconAttribute($value)
    {
        $this->attributes['icon_path'] = $value;
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function related()
    {
        return $this->morphTo(__FUNCTION__, 'context_type', 'context_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'channel_users')
            ->withPivot('is_speaker', 'last_read_at')
            ->withTimestamps();
    }

    public function speakers()
    {
        return $this->belongsToMany(User::class, 'channel_users')
            ->wherePivot('is_speaker', true)
            ->withPivot('is_speaker', 'last_read_at')
            ->withTimestamps();
    }

    public function recipients()
    {
        return $this->hasManyThrough(MessageRecipient::class, Message::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'channel_student');
    }
}
