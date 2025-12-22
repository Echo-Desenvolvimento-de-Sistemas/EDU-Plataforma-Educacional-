<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssuedDocument extends Model
{
    protected $fillable = ['uuid', 'student_id', 'document_template_id', 'verification_hash', 'content_snapshot'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function template()
    {
        return $this->belongsTo(DocumentTemplate::class, 'document_template_id');
    }
}
