<?php

namespace App\Http\Controllers\Responsavel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Ensure user has guardian profile
        if (!$user->guardian) {
            return Inertia::render('Responsavel/Dashboard', [
                'students' => []
            ]);
        }

        $students = $user->guardian->students()->with(['classRoom.grade'])->get();

        return Inertia::render('Responsavel/Dashboard', [
            'students' => $students
        ]);
    }
}
