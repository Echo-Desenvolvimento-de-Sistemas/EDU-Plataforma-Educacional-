<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentTemplate;
use App\Models\Student;
use App\Services\DocumentGeneratorService;
use Illuminate\Http\Request;

class StudentDocumentController extends Controller
{
    protected $documentGenerator;

    public function __construct(DocumentGeneratorService $documentGenerator)
    {
        $this->documentGenerator = $documentGenerator;
    }

    /**
     * Generate and store a document for the student.
     */
    public function store(Request $request, Student $student)
    {
        $request->validate([
            'template_id' => 'required|exists:document_templates,id'
        ]);

        $template = DocumentTemplate::findOrFail($request->template_id);

        $this->documentGenerator->generate($template, $student);

        return redirect()->back()->with('success', 'Documento emitido com sucesso!');
    }
}
