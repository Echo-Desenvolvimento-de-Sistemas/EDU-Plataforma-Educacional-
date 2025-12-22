<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = DocumentTemplate::all();
        return Inertia::render('Admin/DocumentTemplates/Index', [
            'templates' => $templates
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/DocumentTemplates/Edit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:declaration,history,report_card,other',
            'content' => 'required|string',
            'is_active' => 'boolean'
        ]);

        DocumentTemplate::create($validated);

        return redirect()->route('admin.document-templates.index')->with('success', 'Modelo criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DocumentTemplate $documentTemplate)
    {
        return Inertia::render('Admin/DocumentTemplates/Edit', [
            'template' => $documentTemplate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DocumentTemplate $documentTemplate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:declaration,history,report_card,other',
            'content' => 'required|string',
            'is_active' => 'boolean'
        ]);

        $documentTemplate->update($validated);

        return redirect()->route('admin.document-templates.index')->with('success', 'Modelo atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DocumentTemplate $documentTemplate)
    {
        $documentTemplate->delete();
        return redirect()->back()->with('success', 'Modelo excluído com sucesso!');
    }
}
