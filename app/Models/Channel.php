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

    /**
     * Get the icon attribute with corrected URL.
     * Fixes icons saved with old APP_URL (port 8000) to use current APP_URL.
     */
    public function getIconAttribute($value): ?string
    {
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
