<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\ClassRoom;
use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classRooms = ClassRoom::with(['grade', 'academicYear'])->paginate(10);
        return Inertia::render('Admin/ClassRooms/Index', [
            'classRooms' => $classRooms,
        ]);
    }

    public function create()
    {
        $grades = Grade::all();
        $academicYears = AcademicYear::where('status', 'open')->get();
        return Inertia::render('Admin/ClassRooms/Create', [
            'grades' => $grades,
            'academicYears' => $academicYears,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'grade_id' => 'required|exists:grades,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'shift' => 'required|in:matutino,vespertino,noturno,integral',
        ]);

        ClassRoom::create($request->all());

        return redirect()->route('admin.class-rooms.index');
    }

    public function edit(ClassRoom $classRoom)
    {
        $grades = Grade::all();
        $academicYears = AcademicYear::all();
        return Inertia::render('Admin/ClassRooms/Edit', [
            'classRoom' => $classRoom,
            'grades' => $grades,
            'academicYears' => $academicYears,
        ]);
    }

    public function update(Request $request, ClassRoom $classRoom)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'grade_id' => 'required|exists:grades,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'shift' => 'required|in:matutino,vespertino,noturno,integral',
        ]);

        $classRoom->update($request->all());

        return redirect()->route('admin.class-rooms.index');
    }

    public function destroy(ClassRoom $classRoom)
    {
        $classRoom->delete();
        return redirect()->route('admin.class-rooms.index');
    }
}
