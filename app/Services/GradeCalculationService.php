<?php

namespace App\Services;

use App\Models\Assessment;
use App\Models\PeriodResult;
use App\Models\StudentGrade;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GradeCalculationService
{
    /**
     * Calculate and store the period average for a student in a specific subject.
     *
     * @param int $studentId
     * @param int $classRoomId
     * @param int $subjectId
     * @param int $gradingPeriodId
     * @return float
     */
    public function calculatePeriodAverage(int $studentId, int $classRoomId, int $subjectId, int $gradingPeriodId): float
    {
        return DB::transaction(function () use ($studentId, $classRoomId, $subjectId, $gradingPeriodId) {
            // 1. Fetch all assessments for this period, class, and subject
            $assessments = Assessment::where('grading_period_id', $gradingPeriodId)
                ->where('class_room_id', $classRoomId)
                ->where('subject_id', $subjectId)
                ->get();

            if ($assessments->isEmpty()) {
                return 0.0;
            }

            // 2. Fetch student grades for these assessments
            $grades = StudentGrade::whereIn('assessment_id', $assessments->pluck('id'))
                ->where('student_id', $studentId)
                ->get()
                ->keyBy('assessment_id');

            // 3. Separate regular and recovery assessments
            $regularAssessments = $assessments->where('is_recovery', false);
            $recoveryAssessments = $assessments->where('is_recovery', true);

            // 4. Calculate Weighted Average for Regular Assessments
            $totalScore = 0;
            $totalWeight = 0;

            foreach ($regularAssessments as $assessment) {
                $grade = $grades->get($assessment->id);
                $score = $grade ? (float) $grade->score : 0; // Treat missing grade as 0 for now? Or ignore?
                // Usually missing grade = 0 until filled.

                $weight = (float) $assessment->weight;
                $totalScore += $score * $weight;
                $totalWeight += $weight;
            }

            $average = $totalWeight > 0 ? $totalScore / $totalWeight : 0;

            // 5. Build Logic for Recovery (Simple: If Recovery > Average, Use Recovery)
            // This is "Recuperação Paralela" or "Recuperação Bimestral" overriding logic.
            foreach ($recoveryAssessments as $assessment) {
                $recoveryGrade = $grades->get($assessment->id);
                if ($recoveryGrade && $recoveryGrade->score !== null) {
                    $score = (float) $recoveryGrade->score;
                    if ($score > $average) {
                        $average = $score;
                    }
                    // Note: If multiple recovery exams exist, this logic takes the highest if all are processed sequentially and > average.
                }
            }

            // 6. Round to 2 decimal places
            $finalGrade = round($average, 2);

            // 7. Store Result
            PeriodResult::updateOrCreate(
                [
                    'grading_period_id' => $gradingPeriodId,
                    'student_id' => $studentId,
                    'class_room_id' => $classRoomId,
                    'subject_id' => $subjectId,
                ],
                ['grade' => $finalGrade]
            );

            return $finalGrade;
        });
    }

    /**
     * Batch calculation for all students in a class.
     */
    public function calculateClassAverage(int $classRoomId, int $subjectId, int $gradingPeriodId): void
    {
        // Get all students in the class... handled by iterating students or efficiently querying.
        // For now, let's keep it simple and assume individual calculation calls or optimized later.
        // This is a placeholder for future optimization.
    }
}
