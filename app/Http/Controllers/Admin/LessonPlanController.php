<?php

namespace App\Http\Controllers\Admin;

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

    public function index(Request $request)
    {
        $query = LessonPlan::with(['user', 'classRoom', 'subject']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('topic', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            // Default: show Submitted first, then others
            $query->orderByRaw("FIELD(status, 'SUBMITTED', 'REQUEST_CHANGES', 'APPROVED', 'DRAFT')");
        }

        $plans = $query->latest()->paginate(10);

        return Inertia::render('Admin/Planning/Index', [
            'plans' => $plans,
            'filters' => $request->only(['status', 'search'])
        ]);
    }

    public function show(LessonPlan $lessonPlan)
    {
        $lessonPlan->load(['user', 'classRoom', 'subject', 'bnccSkills', 'feedbacks.user']);

        return Inertia::render('Admin/Planning/Show', [
            'plan' => $lessonPlan
        ]);
    }

    public function approve(LessonPlan $lessonPlan)
    {
        $this->service->approve($lessonPlan->id);
        return back()->with('success', 'Planejamento aprovado com sucesso!');
    }

    public function requestChanges(Request $request, LessonPlan $lessonPlan)
    {
        $request->validate(['comment' => 'required|string']);
        $this->service->requestChanges($lessonPlan->id, $request->comment);
        return back()->with('success', 'Correções solicitadas com sucesso!');
    }
}
