<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\IssuedDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentValidationController extends Controller
{
    public function validateDocument(string $uuid)
    {
        $document = IssuedDocument::with(['student', 'template'])
            ->where('uuid', $uuid)
            ->first();

        if (!$document) {
            return Inertia::render('Public/Documents/DocumentValidate', [
                'isValid' => false,
                'message' => 'Documento não encontrado ou inválido.',
            ]);
        }

        return Inertia::render('Public/Documents/DocumentValidate', [
            'isValid' => true,
            'document' => [
                'uuid' => $document->uuid,
                'student_name' => $document->student->name,
                'document_type' => $document->template->title,
                'issued_at' => $document->created_at->format('d/m/Y H:i:s'),
                'content_snapshot' => $document->content_snapshot,
            ],
        ]);
    }
}
