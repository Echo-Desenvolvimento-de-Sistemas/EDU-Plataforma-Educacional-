<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityQuestion extends Model
{
    protected $fillable = ['activity_id', 'question_id', 'points', 'order'];
}
