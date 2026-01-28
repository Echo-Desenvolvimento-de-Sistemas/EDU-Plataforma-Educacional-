<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EducationLevel;
use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grades = Grade::with('educationLevel')->get();
        return Inertia::render('Admin/Grades/Index', [
            'grades' => $grades,
        ]);
    }

    public function create()
    {
        $educationLevels = EducationLevel::all();
        return Inertia::render('Admin/Grades/Create', [
            'educationLevels' => $educationLevels,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'education_level_id' => 'required|exists:education_levels,id',
        ]);

        Grade::create($request->all());

        return redirect()->route('admin.grades.index');
    }

    public function edit(Grade $grade)
    {
        $educationLevels = EducationLevel::all();
        return Inertia::render('Admin/Grades/Edit', [
            'grade' => $grade,
            'educationLevels' => $educationLevels,
        ]);
    }

    public function update(Request $request, Grade $grade)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'education_level_id' => 'required|exists:education_levels,id',
        ]);

        $grade->update($request->all());

        return redirect()->route('admin.grades.index');
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return redirect()->route('admin.grades.index');
    }
}
