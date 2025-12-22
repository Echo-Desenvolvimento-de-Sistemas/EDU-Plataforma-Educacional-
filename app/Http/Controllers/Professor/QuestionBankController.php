<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\QuestionBank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionBankController extends Controller
{
    public function index()
    {
        $banks = QuestionBank::where('user_id', auth()->id())
            ->withCount('questions')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Professor/QuestionBanks/Index', [
            'banks' => $banks
        ]);
    }

    public function create()
    {
        return Inertia::render('Professor/QuestionBanks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $request->user()->questionBanks()->create($validated);

        return redirect()->route('professor.question-banks.index')
            ->with('success', 'Banco de questões criado com sucesso!');
    }

    public function show(QuestionBank $questionBank)
    {
        // policy check: ensure owner
        if ($questionBank->user_id !== auth()->id()) {
            abort(403);
        }

        $questionBank->load('questions.options');

        return Inertia::render('Professor/QuestionBanks/Show', [
            'bank' => $questionBank,
            'questions' => $questionBank->questions
        ]);
    }

    public function edit(QuestionBank $questionBank)
    {
        if ($questionBank->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Professor/QuestionBanks/Edit', [
            'bank' => $questionBank
        ]);
    }

    public function update(Request $request, QuestionBank $questionBank)
    {
        if ($questionBank->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $questionBank->update($validated);

        return redirect()->route('professor.question-banks.index')
            ->with('success', 'Banco atualizado com sucesso!');
    }

    public function destroy(QuestionBank $questionBank)
    {
        if ($questionBank->user_id !== auth()->id()) {
            abort(403);
        }

        $questionBank->delete();

        return redirect()->route('professor.question-banks.index')
            ->with('success', 'Banco excluído com sucesso!');
    }
}
