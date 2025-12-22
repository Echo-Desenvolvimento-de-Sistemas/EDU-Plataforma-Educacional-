<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentTemplate;
use App\Models\IssuedDocument;
use App\Models\Student;
use App\Services\DocumentGeneratorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    protected $documentGenerator;

    public function __construct(DocumentGeneratorService $documentGenerator)
    {
        $this->documentGenerator = $documentGenerator;
    }

    /**
     * Display a listing of issued documents.
     */
    public function index(Request $request)
    {
        $query = IssuedDocument::with(['student', 'template'])->latest();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('student', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('cpf', 'like', "%{$search}%");
            });
        }

        $documents = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new document.
     */
    public function create()
    {
        // For the select inputs
        // Optimized: only select necessary fields.
        // In a real app with thousands of students, this should be an async search. 
        // For now, loading all is acceptable as per previous context (small scaler).
        $students = Student::select('id', 'name', 'cpf')->orderBy('name')->get();
        $templates = DocumentTemplate::where('is_active', true)->select('id', 'title', 'type')->get();

        return Inertia::render('Admin/Documents/Create', [
            'students' => $students,
            'templates' => $templates,
        ]);
    }

    /**
     * Store a newly created document in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'template_id' => 'required|exists:document_templates,id',
        ]);

        $student = Student::findOrFail($request->student_id);
        $template = DocumentTemplate::findOrFail($request->template_id);

        $this->documentGenerator->generate($template, $student);

        return redirect()->route('admin.documents.index')->with('success', 'Documento emitido com sucesso!');
    }
}
