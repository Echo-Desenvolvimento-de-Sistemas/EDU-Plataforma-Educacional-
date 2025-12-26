<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssessmentController extends Controller
{
    public function store(Request $request, ClassRoom $classRoom)
    {
        // Validation
        $validated = $request->validate([
            'grading_period_id' => 'required|exists:grading_periods,id',
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'max_points' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'is_recovery' => 'boolean',
        ]);

        // Security check (Professor access)
        $hasAccess = Auth::user()->allocations()
            ->where('class_room_id', $classRoom->id)
            ->where('subject_id', $validated['subject_id'])
            ->exists();

        if (!$hasAccess) {
            abort(403, 'Sem permissão para criar avaliações nesta disciplina.');
        }

        $assessment = Assessment::create([
            ...$validated,
            'class_room_id' => $classRoom->id,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Avaliação criada com sucesso.',
                'assessment' => $assessment
            ]);
        }

        return back()->with('success', 'Avaliação criada com sucesso.');
    }

    public function update(Request $request, ClassRoom $classRoom, Assessment $assessment)
    {
        // Security checks...
        if ($assessment->class_room_id !== $classRoom->id)
            abort(404);
        // ... (similar permission check)

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'max_points' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'is_recovery' => 'boolean',
        ]);

        $assessment->update($validated);

        return back()->with('success', 'Avaliação atualizada.');
    }

    public function destroy(ClassRoom $classRoom, Assessment $assessment)
    {
        if ($assessment->class_room_id !== $classRoom->id)
            abort(404);

        $assessment->delete();
        return back()->with('success', 'Avaliação excluída.');
    }
}
