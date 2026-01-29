<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\LessonPlan;
use App\Services\LessonPlanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonPlanController extends Controller
{
    protected $service;

    public function __construct(LessonPlanService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $plans = LessonPlan::with(['classRoom', 'subject', 'bnccSkills'])
            ->where('user_id', auth()->id())
            ->orderBy('start_date', 'desc')
            ->get();

        return Inertia::render('Professor/Planning/Index', [
            'plans' => $plans
        ]);
    }

    public function create()
    {
        $user = auth()->user();

        // Fetch classes linked to the professor via allocations
        $classes = \App\Models\ClassRoom::whereIn('id', function ($query) use ($user) {
            $query->select('class_room_id')
                ->from('allocations')
                ->where('user_id', $user->id);
        })->get(['id', 'name']);

        // Fetch subjects linked to the professor via allocations
        $subjects = \App\Models\Subject::whereIn('id', function ($query) use ($user) {
            $query->select('subject_id')
                ->from('allocations')
                ->where('user_id', $user->id);
        })->get(['id', 'name']);

        return Inertia::render('Professor/Planning/Edit', [
            'plan' => null,
            'classes' => $classes,
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'topic' => 'required|string',
            'methodology' => 'nullable|string',
            'resources' => 'nullable|string',
            'evaluation' => 'nullable|string',
            'bncc_skills' => 'array'
        ]);

        $data['user_id'] = auth()->id();

        $this->service->create($data);

        return redirect()->route('professor.planning.index')->with('success', 'Planejamento criado com sucesso!');
    }

    public function edit(LessonPlan $plan)
    {
        // Authorize
        if ($plan->user_id !== auth()->id()) {
            abort(403);
        }

        $plan->load('bnccSkills', 'feedbacks.user');

        $user = auth()->user();

        $classes = \App\Models\ClassRoom::whereIn('id', function ($query) use ($user) {
            $query->select('class_room_id')
                ->from('allocations')
                ->where('user_id', $user->id);
        })->get(['id', 'name']);

        $subjects = \App\Models\Subject::whereIn('id', function ($query) use ($user) {
            $query->select('subject_id')
                ->from('allocations')
                ->where('user_id', $user->id);
        })->get(['id', 'name']);

        return Inertia::render('Professor/Planning/Edit', [
            'plan' => $plan,
            'classes' => $classes,
            'subjects' => $subjects,
        ]);
    }

    public function update(Request $request, LessonPlan $plan)
    {
        // Authorize
        if ($plan->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'topic' => 'required|string',
            'methodology' => 'nullable|string',
            'resources' => 'nullable|string',
            'evaluation' => 'nullable|string',
            'bncc_skills' => 'array'
        ]);

        $this->service->update($plan, $data);

        return redirect()->back()->with('success', 'Planejamento atualizado!');
    }

    public function submit(LessonPlan $plan)
    {
        if ($plan->user_id !== auth()->id()) {
            abort(403);
        }

        $this->service->submitForReview($plan);

        return redirect()->back()->with('success', 'Enviado para coordenação!');
    }

    public function destroy(LessonPlan $plan)
    {
        if ($plan->user_id !== auth()->id()) {
            abort(403);
        }

        $plan->delete();

        return redirect()->route('professor.planning.index')->with('success', 'Removido.');
    }
}
