<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\QuestionBank;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    public function create(Request $request)
    {
        $bankId = $request->query('bank_id');
        $bank = QuestionBank::findOrFail($bankId);

        if ($bank->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Professor/Questions/Create', [
            'bank' => $bank
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_bank_id' => 'required|exists:question_banks,id',
            'statement' => 'required|string',
            'type' => 'required|in:MULTIPLE_CHOICE,TRUE_FALSE',
            'difficulty' => 'required|integer|min:1|max:5',
            'explanation' => 'nullable|string',
            'options' => 'required|array|min:2',
            'options.*.label' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
            'subject' => 'nullable|string|max:255',
            'topic' => 'nullable|string|max:255',
            'grade_level' => 'nullable|string|max:255',
            'bncc_code' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
        ]);

        $bank = QuestionBank::findOrFail($validated['question_bank_id']);
        if ($bank->user_id !== auth()->id()) {
            abort(403);
        }

        $question = DB::transaction(function () use ($validated) {
            $question = Question::create([
                'question_bank_id' => $validated['question_bank_id'],
                'statement' => $validated['statement'],
                'type' => $validated['type'],
                'difficulty' => $validated['difficulty'],
                'explanation' => $validated['explanation'] ?? null,
                'subject' => $validated['subject'] ?? null,
                'topic' => $validated['topic'] ?? null,
                'grade_level' => $validated['grade_level'] ?? null,
                'bncc_code' => $validated['bncc_code'] ?? null,
                'tags' => $validated['tags'] ?? null,
            ]);

            foreach ($validated['options'] as $optionData) {
                $question->options()->create($optionData);
            }

            return $question;
        });

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Questão criada com sucesso!',
                'question' => $question->load('options')
            ]);
        }

        return redirect()->route('professor.question-banks.show', $bank->id)
            ->with('success', 'Questão criada com sucesso!');
    }

    public function update(Request $request, Question $question)
    {
        $bank = $question->bank;
        if ($bank->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'statement' => 'required|string',
            'type' => 'required|in:MULTIPLE_CHOICE,TRUE_FALSE',
            'difficulty' => 'required|integer|min:1|max:5',
            'explanation' => 'nullable|string',
            'options' => 'required|array|min:2',
            'options.*.id' => 'nullable|integer', // Allow ID for existing options
            'options.*.label' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
            'subject' => 'nullable|string|max:255',
            'topic' => 'nullable|string|max:255',
            'grade_level' => 'nullable|string|max:255',
            'bncc_code' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
        ]);

        $question = DB::transaction(function () use ($question, $validated) {
            $question->update([
                'statement' => $validated['statement'],
                'type' => $validated['type'],
                'difficulty' => $validated['difficulty'],
                'explanation' => $validated['explanation'] ?? null,
                'subject' => $validated['subject'] ?? null,
                'topic' => $validated['topic'] ?? null,
                'grade_level' => $validated['grade_level'] ?? null,
                'bncc_code' => $validated['bncc_code'] ?? null,
                'tags' => $validated['tags'] ?? null,
            ]);

            // Sync options strategy:
            // 1. Get IDs of incoming options that have IDs
            // 2. Delete options not in incoming IDs
            // 3. Update existing options
            // 4. Create new options

            $incomingIds = collect($validated['options'])
                ->pluck('id')
                ->filter()
                ->toArray();

            $question->options()->whereNotIn('id', $incomingIds)->delete();

            foreach ($validated['options'] as $optionData) {
                if (isset($optionData['id']) && $optionData['id']) {
                    $question->options()->where('id', $optionData['id'])->update([
                        'label' => $optionData['label'],
                        'is_correct' => $optionData['is_correct']
                    ]);
                } else {
                    $question->options()->create([
                        'label' => $optionData['label'],
                        'is_correct' => $optionData['is_correct']
                    ]);
                }
            }

            return $question;
        });

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Questão atualizada com sucesso!',
                'question' => $question->load('options')
            ]);
        }

        return back()->with('success', 'Questão atualizada com sucesso!');
    }

    public function destroy(Question $question)
    {
        $bank = $question->bank;
        if ($bank->user_id !== auth()->id()) {
            abort(403);
        }

        $question->delete();

        if (request()->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return back()->with('success', 'Questão excluída com sucesso!');
    }
}
