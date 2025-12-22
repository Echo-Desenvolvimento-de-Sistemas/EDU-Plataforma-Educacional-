<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\DocumentTemplate;
use App\Models\IssuedDocument;
use App\Services\DocumentGeneratorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $student = auth()->user()->student;

        if (!$student) {
            return redirect()->route('dashboard')->with('error', 'Perfil de aluno não encontrado.');
        }

        $templates = DocumentTemplate::where('is_active', true)
            ->get();

        $issuedDocuments = IssuedDocument::where('student_id', $student->id)
            ->with('template')
            ->latest()
            ->get();

        return Inertia::render('Aluno/Documents/Index', [
            'templates' => $templates,
            'issuedDocuments' => $issuedDocuments,
        ]);
    }

    public function store(Request $request, DocumentGeneratorService $service)
    {
        $request->validate([
            'template_id' => 'required|exists:document_templates,id',
        ]);

        $student = auth()->user()->student;
        $template = DocumentTemplate::findOrFail($request->template_id);

        $service->generate($template, $student);

        return redirect()->back()->with('success', 'Documento gerado com sucesso!');
    }

    public function show(IssuedDocument $document)
    {
        $student = auth()->user()->student;

        if ($document->student_id !== $student->id) {
            abort(403, 'Acesso negado.');
        }

        return Inertia::render('Aluno/Documents/Show', [
            'document' => $document,
        ]);
    }
}
