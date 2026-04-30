<?php

namespace App\Models\Traits;

trait HasProfileAttributes
{
    /**
     * Get the user's profile photo URL.
     */
    public function getProfilePhotoUrlAttribute(): ?string
    {
        if ($this->role === 'aluno' && $this->relationLoaded('student')) {
            $student = $this->getRelation('student');
            if ($student && $student->photo_path) {
                return asset('storage/' . $student->photo_path);
            }
        }

        return null;
    }
}
