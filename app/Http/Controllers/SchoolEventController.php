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
        // Return JSON if requested (for calendar fetch) or render the View
        if ($request->wantsJson()) {
            $query = SchoolEvent::query();

            if ($request->has('start') && $request->has('end')) {
                $query->where(function ($q) use ($request) {
                    $q->whereBetween('start_date', [$request->start, $request->end])
                        ->orWhereBetween('end_date', [$request->start, $request->end]);
                });
            }

            return response()->json($query->get());
        }

        return Inertia::render('Calendar/Index', [
            // Pass initial events for the current month? Or let frontend fetch.
            // Let's pass simplified logic for now or just the User Role to know permissions
            'can_edit' => in_array(auth()->user()->role, ['admin', 'secretaria'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Authorization: Only Admin and Secretaria
        if (!in_array(auth()->user()->role, ['admin', 'secretaria'])) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'type' => 'required|in:academic,holiday,event,meeting',
            'description' => 'nullable|string'
        ]);

        $event = SchoolEvent::create([
            ...$validated,
            'created_by' => auth()->id()
        ]);

        return back()->with('success', 'Evento criado com sucesso.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SchoolEvent $schoolEvent) // Model binding usually requires 'event' param name matching route or explicit binding
    {
        // Authorization
        if (!in_array(auth()->user()->role, ['admin', 'secretaria'])) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'type' => 'required|in:academic,holiday,event,meeting',
            'description' => 'nullable|string'
        ]);

        $schoolEvent->update($validated);

        return back()->with('success', 'Evento atualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolEvent $schoolEvent)
    {
        if (!in_array(auth()->user()->role, ['admin', 'secretaria'])) {
            abort(403, 'Unauthorized action.');
        }

        $schoolEvent->delete();

        return back()->with('success', 'Evento removido.');
    }
}
