<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanFeedback extends Model
{
    protected $table = 'plan_feedbacks';

    protected $fillable = [
        'lesson_plan_id',
        'user_id',
        'comment',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    public function lessonPlan()
    {
        return $this->belongsTo(LessonPlan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
