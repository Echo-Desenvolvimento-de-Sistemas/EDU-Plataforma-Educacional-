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

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'ordered_ids' => 'required|array',
            'ordered_ids.*' => 'integer|exists:class_schedules,id',
        ]);

        // Get the schedules for this specific class and day that are being reordered
        $schedules = ClassSchedule::where('class_room_id', $validated['class_room_id'])
            ->where('day_of_week', $validated['day_of_week'])
            ->whereIn('id', $validated['ordered_ids'])
            ->orderBy('start_time')
            ->get();

        if ($schedules->count() !== count($validated['ordered_ids'])) {
            return response()->json(['error' => 'Invalid schedule IDs provided'], 400);
        }

        // Extract the original start and end times in chronological order
        $timeSlots = $schedules->map(function ($schedule) {
            return [
                'start_time' => $schedule->start_time,
                'end_time' => $schedule->end_time,
            ];
        })->toArray();

        // Update each schedule with the new corresponding timeslot based on their new order
        foreach ($validated['ordered_ids'] as $index => $id) {
            $timeslot = $timeSlots[$index];
            ClassSchedule::where('id', $id)->update([
                'start_time' => $timeslot['start_time'],
                'end_time' => $timeslot['end_time'],
            ]);
        }

        return response()->json(['success' => true]);
    }
}
