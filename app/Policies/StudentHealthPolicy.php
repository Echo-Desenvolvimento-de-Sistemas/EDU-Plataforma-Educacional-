<?php

namespace App\Policies;

use App\Models\StudentHealth;
use App\Models\User;
use App\Models\Allocation;

class StudentHealthPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, StudentHealth $studentHealth): bool
    {
        // 1. Admin/Secretaria can see everything
        if (in_array($user->role, ['admin', 'secretaria'])) {
            return true;
        }

        // 2. Professor can see if the student is in one of their classes
        if ($user->role === 'professor') {
            $student = $studentHealth->student;
            $classId = $student->class_room_id;
            
            return Allocation::where('user_id', $user->id)
                ->where('class_room_id', $classId)
                ->exists();
        }

        // 3. Guardian can see if it's their student
        if ($user->role === 'responsavel') {
            return $user->guardian && $user->guardian->students()->where('student_id', $studentHealth->student_id)->exists();
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, StudentHealth $studentHealth): bool
    {
        // Only Admin/Secretaria can update health records for now
        return in_array($user->role, ['admin', 'secretaria']);
    }
}
