<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\ClassSchedule;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassScheduleController extends Controller
{
    public function index()
    {
        // Fetch all classrooms for selection
        $classRooms = ClassRoom::with('grade')->orderBy('name')->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name . ' - ' . $c->grade->name,
            ];
        });

        $subjects = Subject::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Admin/ClassSchedules/Index', [
            'classRooms' => $classRooms,
            'subjects' => $subjects,
        ]);
    }

    public function getByClass(ClassRoom $classRoom)
    {
        $schedules = ClassSchedule::where('class_room_id', $classRoom->id)
            ->with('subject')
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return response()->json($schedules);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        ClassSchedule::create($validated);

        return back()->with('success', 'Horário adicionado com sucesso.');
    }

    public function destroy(ClassSchedule $schedule)
    {
        $schedule->delete();
        return back()->with('success', 'Horário removido com sucesso.');
    }
}
