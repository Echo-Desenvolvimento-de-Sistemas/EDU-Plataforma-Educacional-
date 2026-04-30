<?php

namespace App\Models\Traits;

use App\Models\Channel;

trait HasCommunicationRelations
{
    public function speakingChannels()
    {
        return $this->belongsToMany(Channel::class, 'channel_user');
    }
}
