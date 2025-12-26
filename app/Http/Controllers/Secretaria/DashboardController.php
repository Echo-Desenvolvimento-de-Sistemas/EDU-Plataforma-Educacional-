<?php

namespace App\Http\Controllers\Secretaria;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\PreRegistration;
use App\Models\ClassRoom;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Total Active Students
        $totalStudents = Student::where('status', 'active')->count();

        // 2. Pending Pre-Registrations
        $pendingPreRegistrations = PreRegistration::where('status', 'pending')->count();

        // 3. Active Classes
        $activeClasses = ClassRoom::whereHas('academicYear', function ($q) {
            $q->where('status', 'active'); // Assuming there's a status or we pick current year
        })->count();

        // Fallback if no specific 'active' status on academic year usually
        if ($activeClasses === 0) {
            $activeClasses = ClassRoom::count();
        }

        // 4. Recent Pre-Registrations (Limit 5)
        $recentPreRegistrations = PreRegistration::with('targetClass')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Secretaria/Dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'pendingPreRegistrations' => $pendingPreRegistrations,
                'activeClasses' => $activeClasses,
            ],
            'recentPreRegistrations' => $recentPreRegistrations
        ]);
    }
}
