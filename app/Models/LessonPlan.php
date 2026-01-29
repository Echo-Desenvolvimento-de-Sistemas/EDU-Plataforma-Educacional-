<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LessonPlan extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'class_room_id',
        'subject_id',
        'start_date',
        'end_date',
        'topic',
        'methodology',
        'resources',
        'evaluation',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function bnccSkills()
    {
        return $this->belongsToMany(BnccSkill::class, 'lesson_plan_skills');
    }

    public function feedbacks()
    {
        return $this->hasMany(PlanFeedback::class);
    }
}
