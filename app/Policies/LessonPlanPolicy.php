<?php

namespace App\Policies;

use App\Models\LessonPlan;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LessonPlanPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Everyone logged in can see their own list or coordination list
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, LessonPlan $lessonPlan): bool
    {
        // Owner or Coordination/Admin
        return $user->id === $lessonPlan->user_id 
            || in_array($user->role, ['admin', 'secretaria']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LessonPlan $lessonPlan): bool
    {
        // Only owner can update, and only if not approved?
        return $user->id === $lessonPlan->user_id && $lessonPlan->status !== 'APPROVED';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, LessonPlan $lessonPlan): bool
    {
        return $user->id === $lessonPlan->user_id;
    }

    /**
     * Determine whether the user can approve the model.
     */
    public function approve(User $user): bool
    {
        return in_array($user->role, ['admin', 'secretaria']);
    }
}
