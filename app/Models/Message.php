<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'channel_id',
        'title',
        'sender_id',
        'body',
        'type',
        'metadata',
        'content',
    ];

    public function getContentAttribute($value)
    {
        if (!$value) {
            return [];
        }
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : ['text' => $value, 'body' => $value];
    }

    public function setContentAttribute($value)
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $this->attributes['content'] = json_encode($decoded);
            } else {
                $this->attributes['content'] = json_encode(['text' => $value, 'body' => $value]);
            }
        } else {
            $this->attributes['content'] = json_encode($value);
        }
    }

    public function getBodyAttribute()
    {
        $content = $this->content;
        return $content['body'] ?? ($content['text'] ?? null);
    }

    public function setBodyAttribute($value)
    {
        $content = $this->content;
        $content['body'] = $value;
        $content['text'] = $value;
        $this->content = $content;
    }

    public function getTitleAttribute()
    {
        return $this->content['title'] ?? null;
    }

    public function setTitleAttribute($value)
    {
        $content = $this->content;
        $content['title'] = $value;
        $this->content = $content;
    }

    public function getMetadataAttribute()
    {
        return $this->content['metadata'] ?? [];
    }

    public function setMetadataAttribute($value)
    {
        $content = $this->content;
        $content['metadata'] = $value;
        $this->content = $content;
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipients()
    {
        return $this->hasMany(MessageRecipient::class);
    }
}
