<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\StudentGrade;
use App\Models\Assessment;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SubjectPerformanceController extends Controller
{
    public function index()
    {
        // Fetch all subjects with their aggregated grade stats
        $subjects = Subject::withCount(['assessments as total_assessments'])
            ->get()
            ->map(function ($subject) {
                // Get all assessment IDs for this subject
                $assessmentIds = Assessment::where('subject_id', $subject->id)->pluck('id');

                // Calculate average score for this subject
                $averageScore = StudentGrade::whereIn('assessment_id', $assessmentIds)
                    ->avg('score');

                // Calculate pass rate (assuming >= 6.0 is passing)
                $totalGrades = StudentGrade::whereIn('assessment_id', $assessmentIds)->count();
                $passingGrades = StudentGrade::whereIn('assessment_id', $assessmentIds)
                    ->where('score', '>=', 6.0)
                    ->count();

                $passRate = $totalGrades > 0 ? ($passingGrades / $totalGrades) * 100 : 0;

                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'code' => $subject->code,
                    'total_assessments' => $subject->total_assessments,
                    'average_score' => round($averageScore, 1),
                    'pass_rate' => round($passRate, 1),
                ];
            });

        return Inertia::render('Admin/SubjectPerformance/Index', [
            'subjects' => $subjects
        ]);
    }

    public function show(Subject $subject)
    {
        // Detailed breakdown by ClassRoom

        // 1. Get Assessments for this subject, loaded with ClassRoom
        $assessments = Assessment::where('subject_id', $subject->id)
            ->with(['classRoom', 'gradingPeriod'])
            ->get();

        // 2. Aggregate by ClassRoom
        $classPerformance = $assessments->groupBy('class_room_id')->map(function ($assessments, $classId) {
            $classRoom = $assessments->first()->classRoom;
            $assessmentIds = $assessments->pluck('id');

            $avgScore = StudentGrade::whereIn('assessment_id', $assessmentIds)->avg('score');

            return [
                'class_name' => $classRoom ? $classRoom->name : 'Turma Desconhecida',
                'average_score' => round($avgScore, 1),
                'total_assessments' => $assessments->count(),
            ];
        })->values();

        return Inertia::render('Admin/SubjectPerformance/Show', [
            'subject' => $subject,
            'classPerformance' => $classPerformance,
        ]);
    }
}
