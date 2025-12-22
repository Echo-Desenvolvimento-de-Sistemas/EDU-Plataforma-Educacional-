<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EducationLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $educationLevels = EducationLevel::paginate(10);
        return Inertia::render('Admin/EducationLevels/Index', [
            'educationLevels' => $educationLevels,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/EducationLevels/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        EducationLevel::create($request->all());

        return redirect()->route('admin.education-levels.index');
    }

    public function edit(EducationLevel $educationLevel)
    {
        return Inertia::render('Admin/EducationLevels/Edit', [
            'educationLevel' => $educationLevel,
        ]);
    }

    public function update(Request $request, EducationLevel $educationLevel)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $educationLevel->update($request->all());

        return redirect()->route('admin.education-levels.index');
    }

    public function destroy(EducationLevel $educationLevel)
    {
        $educationLevel->delete();
        return redirect()->route('admin.education-levels.index');
    }
}
