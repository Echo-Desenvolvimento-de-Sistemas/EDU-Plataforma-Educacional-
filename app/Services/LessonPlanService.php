<?php

namespace App\Services;

use App\Models\LessonPlan;
use App\Models\PlanFeedback;
use Illuminate\Support\Facades\DB;
use Exception;

class LessonPlanService
{
    /**
     * Create a new lesson plan
     */
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $plan = LessonPlan::create([
                'user_id' => $data['user_id'],
                'class_room_id' => $data['class_room_id'],
                'subject_id' => $data['subject_id'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'topic' => $data['topic'],
                'methodology' => $data['methodology'] ?? null,
                'resources' => $data['resources'] ?? null,
                'evaluation' => $data['evaluation'] ?? null,
                'status' => 'DRAFT',
            ]);

            if (!empty($data['bncc_skills'])) {
                $plan->bnccSkills()->sync($data['bncc_skills']);
            }

            return $plan;
        });
    }

    /**
     * Update an existing lesson plan
     */
    public function update(LessonPlan $plan, array $data)
    {
        return DB::transaction(function () use ($plan, $data) {
            $plan->update([
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'topic' => $data['topic'],
                'methodology' => $data['methodology'] ?? null,
                'resources' => $data['resources'] ?? null,
                'evaluation' => $data['evaluation'] ?? null,
                // Do not update status directly here, use transitions
            ]);

            if (isset($data['bncc_skills'])) {
                $plan->bnccSkills()->sync($data['bncc_skills']);
            }

            // If it was REQUEST_CHANGES, maybe reset to DRAFT or keep as is? 
            // Usually if teacher edits, it goes back to DRAFT or stays until submit.
            // Let's keep status as is until explicit submit.

            return $plan;
        });
    }

    /**
     * Submit plan for coordination review
     */
    public function submitForReview(LessonPlan $plan)
    {
        if ($plan->status === 'APPROVED') {
            throw new Exception("Plan is already approved.");
        }

        $plan->update(['status' => 'SUBMITTED']);

        // TODO: Notification logic here

        return $plan;
    }

    /**
     * Approve a plan
     */
    public function approve(LessonPlan $plan)
    {
        $plan->update(['status' => 'APPROVED']);

        // TODO: Notification

        return $plan;
    }

    /**
     * Request changes on a plan
     */
    public function requestChanges(LessonPlan $plan, string $comment, int $coordinatorId)
    {
        return DB::transaction(function () use ($plan, $comment, $coordinatorId) {
            $plan->update(['status' => 'REQUEST_CHANGES']);

            PlanFeedback::create([
                'lesson_plan_id' => $plan->id,
                'user_id' => $coordinatorId,
                'comment' => $comment
            ]);

            return $plan;
        });
    }

    /**
     * Clone a plan to a new date (Reuse logic)
     */
    public function clonePlan(LessonPlan $originalPlan, string $newStartDate, string $newEndDate)
    {
        return DB::transaction(function () use ($originalPlan, $newStartDate, $newEndDate) {
            $newPlan = $originalPlan->replicate(['status', 'created_at', 'updated_at', 'deleted_at']);
            $newPlan->start_date = $newStartDate;
            $newPlan->end_date = $newEndDate;
            $newPlan->status = 'DRAFT';
            $newPlan->save();

            // Clone skills pivot
            $skillIds = $originalPlan->bnccSkills()->pluck('bncc_skills.id');
            $newPlan->bnccSkills()->sync($skillIds);

            return $newPlan;
        });
    }
}
