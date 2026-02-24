<?php

namespace App\Http\Controllers;

use App\Models\SchoolEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        // Return JSON if requested (for calendar fetch)
        if ($request->wantsJson()) {
            $query = SchoolEvent::query();

            // Filter by Date Range
            if ($request->has('start') && $request->has('end')) {
                $query->where(function ($q) use ($request) {
                    $q->whereBetween('start_date', [$request->start, $request->end])
                        ->orWhereBetween('end_date', [$request->start, $request->end]);
                });
            }

            // Filter by Target Audience and Creator
            if (!in_array($user->role, ['admin', 'secretaria'])) {
                $role = $user->role; // 'professor', 'aluno', 'responsavel'

                $query->where(function ($q) use ($role, $user) {
                    $q->where('created_by', $user->id) // See their own created events (like personal events)
                        ->orWhereJsonContains('target_audience', $role) // See events targeted to their role
                        ->orWhereNull('target_audience'); // Legacy/Public support visible to all
                });
            }

            $events = $query->get();
            $classSchedules = [];

            // If it's a Professor, fetch their teaching classes
            if ($user->role === 'professor' && $user->professor) {
                $professorId = $user->professor->id;
                $classSchedules = \App\Models\ClassSchedule::whereIn('subject_id', function ($q) use ($professorId) {
                    $q->select('subject_id')
                        ->from('allocations')
                        ->where('professor_id', $professorId);
                })->with(['subject', 'classRoom'])->get();
            }
            // If it's a Student, fetch their attending classes
            elseif ($user->role === 'aluno' && $user->student) {
                $gradeId = $user->student->grade_id;
                $classSchedules = \App\Models\ClassSchedule::whereIn('subject_id', function ($q) use ($gradeId) {
                    $q->select('id')
                        ->from('subjects')
                        ->where('grade_id', $gradeId);
                })->with(['subject', 'classRoom'])->get();
            }

            return response()->json([
                'events' => $events,
                'classSchedules' => $classSchedules,
            ]);
        }

        return Inertia::render('Calendar/Index', [
            'can_edit' => in_array($user->role, ['admin', 'secretaria', 'professor']),
            'user_role' => $user->role,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Authorization: Admin, Secretaria, and Professor
        if (!in_array(auth()->user()->role, ['admin', 'secretaria', 'professor'])) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'type' => 'required|in:academic,holiday,event,meeting',
            'description' => 'nullable|string',
            'target_audience' => 'nullable|array',
            'target_audience.*' => 'string|in:professor,aluno,responsavel'
        ]);

        $data = $validated;

        if (auth()->user()->role === 'professor') {
            // Professors can only create events for students (or personal events if we decide to allow empty, but rule says "apenas para alunos")
            $data['target_audience'] = ['aluno'];
        }

        $event = SchoolEvent::create([
            ...$data,
            'created_by' => auth()->id()
        ]);

        return back()->with('success', 'Evento criado com sucesso.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SchoolEvent $event)
    {
        // Authorization
        if (!in_array(auth()->user()->role, ['admin', 'secretaria', 'professor'])) {
            abort(403, 'Unauthorized action.');
        }

        if (auth()->user()->role === 'professor' && $event->created_by !== auth()->id()) {
            abort(403, 'You can only update your own events.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'type' => 'required|in:academic,holiday,event,meeting',
            'description' => 'nullable|string',
            'target_audience' => 'nullable|array',
            'target_audience.*' => 'string|in:professor,aluno,responsavel'
        ]);

        $data = $validated;

        if (auth()->user()->role === 'professor') {
            $data['target_audience'] = ['aluno'];
        }

        $event->update($data);

        return back()->with('success', 'Evento atualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolEvent $event)
    {
        if (!in_array(auth()->user()->role, ['admin', 'secretaria', 'professor'])) {
            abort(403, 'Unauthorized action.');
        }

        if (auth()->user()->role === 'professor' && $event->created_by !== auth()->id()) {
            abort(403, 'You can only delete your own events.');
        }

        $event->delete();

        return back()->with('success', 'Evento removido.');
    }
}
