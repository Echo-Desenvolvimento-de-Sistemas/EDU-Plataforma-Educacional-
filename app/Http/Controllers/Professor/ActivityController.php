<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ActivityResource;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::where('user_id', auth()->id())
            ->with('classRoom')
            ->latest()
            ->get();

        return Inertia::render('Professor/Activities/Index', [
            'activities' => $activities
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        // Load class rooms and question banks
        $classRooms = $user->allocations()->with('classRoom')->get()->pluck('classRoom')->unique('id')->values();
        $banks = \App\Models\QuestionBank::where('user_id', $user->id)->with('questions.options')->get();

        return Inertia::render('Professor/Activities/Create', [
            'classRooms' => $classRooms,
            'banks' => $banks
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'class_room_id' => 'required|exists:class_rooms,id',
            'deadline' => 'nullable|date',
            'questions' => 'required|array|min:1', // List of {id, points}
            'questions.*.id' => 'required|exists:questions,id',
            'questions.*.points' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            $activity = Activity::create([
                'title' => $request->title,
                'description' => $request->description,
                'deadline' => $request->deadline,
                'settings' => $request->settings ?? [],
                'user_id' => auth()->id(),
                'class_room_id' => $request->class_room_id,
            ]);

            // Sync questions
            // Input questions: [{id: 1, points: 2.0}, ...]
            $syncData = [];
            foreach ($request->questions as $index => $q) {
                $syncData[$q['id']] = [
                    'points' => $q['points'],
                    'order' => $index,
                ];
            }
            $activity->questions()->sync($syncData);

            DB::commit();
            return redirect()->route('professor.activities.index')->with('success', 'Atividade criada com sucesso!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Erro ao criar atividade: ' . $e->getMessage()]);
        }
    }

    public function show(Activity $activity)
    {
        if ($activity->user_id !== auth()->id())
            abort(403);

        $activity->load(['questions.options', 'classRoom', 'attempts.student']);

        return Inertia::render('Professor/Activities/Show', [
            'activity' => new ActivityResource($activity),
            'attempts' => $activity->attempts
        ]);
    }
}
