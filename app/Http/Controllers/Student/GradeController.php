<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GradingPeriod;
use App\Models\Subject;

class GradeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $student = $user->student;

        if (!$student || !$student->class_room_id) {
            return redirect()->route('aluno.dashboard')->with('error', 'Aluno não enturmado.');
        }

        // 1. Fetch Grading Periods
        $teachingPeriods = GradingPeriod::orderBy('start_date')->get();

        // 2. Fetch Subjects linked to the Class
        // Assuming subjects are linked via allocations or we fetch all subjects.
        // Better: Fetch subjects for which there are grades or allocations in the class.
        // Simple approach: All active subjects.
        $subjects = Subject::orderBy('name')->get();

        // 3. Fetch Student Grades
        // We need to aggregate scores from StudentGrade model, which links to Assessment.

        $reportCard = [];

        foreach ($subjects as $subject) {
            $row = ['subject' => $subject->name];

            foreach ($teachingPeriods as $period) {
                // Sum scores for this student, subject, and period
                $score = \App\Models\StudentGrade::where('student_id', $student->id)
                    ->join('assessments', 'student_grades.assessment_id', '=', 'assessments.id')
                    ->where('assessments.subject_id', $subject->id)
                    ->where('assessments.grading_period_id', $period->id)
                    ->sum('student_grades.score');

                // Check if any grade exists to differentiate between 0 and "not graded" if needed.
                // For now, if sum is 0, it might be 0 score or no grades. 
                // A better check would be ->exists() or count(), but for display '-' is fine if 0 is rarely default.
                // However, sum() returns 0 if no rows.
                // Let's check count to be precise.

                $hasGrades = \App\Models\StudentGrade::where('student_id', $student->id)
                    ->join('assessments', 'student_grades.assessment_id', '=', 'assessments.id')
                    ->where('assessments.subject_id', $subject->id)
                    ->where('assessments.grading_period_id', $period->id)
                    ->exists();

                $row['period_' . $period->id] = $hasGrades ? (float) $score : '-';
            }

            $reportCard[] = $row;
        }

        return Inertia::render('Aluno/Grades/Index', [
            'periods' => $teachingPeriods,
            'reportCard' => $reportCard
        ]);
    }
}
