<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\EducationLevel;
use App\Models\Grade;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Curriculum/Index', [
            'academicYears' => AcademicYear::orderBy('year', 'desc')->get(),
            'educationLevels' => EducationLevel::all(),
            'grades' => Grade::with('educationLevel')->get(),
            'subjects' => Subject::all(),
        ]);
    }
}
