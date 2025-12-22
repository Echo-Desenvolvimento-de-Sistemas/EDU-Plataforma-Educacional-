<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['question_bank_id', 'statement', 'type', 'difficulty', 'explanation', 'subject', 'topic', 'grade_level', 'bncc_code', 'tags'];

    protected $casts = [
        'difficulty' => 'integer',
        'tags' => 'array',
    ];

    public function bank()
    {
        return $this->belongsTo(QuestionBank::class, 'question_bank_id');
    }

    public function options()
    {
        return $this->hasMany(QuestionOption::class);
    }
}
