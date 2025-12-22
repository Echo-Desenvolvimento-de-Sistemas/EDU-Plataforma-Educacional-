<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use App\Models\ClassRoom;
use App\Models\PreRegistration;
use App\Models\EducationLevel;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Basic Counts
        $totalStudents = Student::count();
        $totalProfessors = User::where('role', 'professor')->count();
        $totalClasses = ClassRoom::count();
        $pendingPreRegistrations = PreRegistration::where('status', 'pending')->count();

        // 2. Students by Education Level (for Bar/Column Chart)
        // Group by Education Level Name
        $studentsByLevel = DB::table('students')
            ->join('class_rooms', 'students.class_room_id', '=', 'class_rooms.id')
            ->join('grades', 'class_rooms.grade_id', '=', 'grades.id')
            ->join('education_levels', 'grades.education_level_id', '=', 'education_levels.id')
            ->select('education_levels.name', DB::raw('count(*) as total'))
            ->groupBy('education_levels.name')
            ->get();

        // 3. Class Rooms distribution (Simple Pie: Morning/Afternoon if available, or just by Grade)
        // Let's do Students by Gender for diversity or Status
        // Since gender isn't explicit in the Student model snippets I've seen (usually it is), 
        // let's do Students by Grade Name (Top 5)
        $studentsByGrade = DB::table('students')
            ->join('class_rooms', 'students.class_room_id', '=', 'class_rooms.id')
            ->join('grades', 'class_rooms.grade_id', '=', 'grades.id')
            ->select('grades.name', DB::raw('count(*) as total'))
            ->groupBy('grades.name')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        // 4. Students by Gender (Pizza Chart)
        $studentsByGender = Student::select('sex', DB::raw('count(*) as total'))
            ->groupBy('sex')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->sex === 'M' ? 'Masculino' : ($item->sex === 'F' ? 'Feminino' : 'Outro'),
                    'total' => $item->total,
                ];
            });

        // 5. Recent Pre-Registrations (List)
        $recentPreRegistrations = PreRegistration::with('targetClass.grade')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($pre) {
                return [
                    'id' => $pre->id,
                    'name' => $pre->student_name,
                    'status' => $pre->status,
                    'date' => $pre->created_at->format('d/m/Y'),
                    'target_class' => $pre->targetClass->name ?? 'N/A',
                ];
            });

        // 6. Recent Users (List)
        $recentUsers = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        // 7. Students by Origin School (Top 5)
        $topSchools = Student::whereNotNull('origin_school')
            ->select('origin_school', DB::raw('count(*) as total'))
            ->groupBy('origin_school')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'totalProfessors' => $totalProfessors,
                'totalClasses' => $totalClasses,
                'pendingPreRegistrations' => $pendingPreRegistrations,
            ],
            'charts' => [
                'studentsByLevel' => $studentsByLevel,
                'studentsByGrade' => $studentsByGrade,
                'studentsByGender' => $studentsByGender,
                'topSchools' => $topSchools,
            ],
            'recent' => [
                'preRegistrations' => $recentPreRegistrations,
                'users' => $recentUsers,
            ]
        ]);
    }
}
