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

        // 3. Fetch Student Grades from PeriodResult table (optimized, no N+1)
        $periodResults = \App\Models\PeriodResult::where('student_id', $student->id)
            ->get()
            ->groupBy('subject_id');

        $reportCard = [];

        foreach ($subjects as $subject) {
            $row = ['subject' => $subject->name];
            
            $subjectResults = $periodResults->get($subject->id, collect());

            foreach ($teachingPeriods as $period) {
                $result = $subjectResults->firstWhere('grading_period_id', $period->id);
                
                $row['period_' . $period->id] = $result ? (float) $result->grade : '-';
            }

            $reportCard[] = $row;
        }

        return Inertia::render('Aluno/Grades/Index', [
            'periods' => $teachingPeriods,
            'reportCard' => $reportCard
        ]);
    }
}
