<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChannelTarget extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'channel_id',
        'target_type',
        'target_id',
        'is_active',
    ];

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function target()
    {
        return $this->morphTo();
    }
}
