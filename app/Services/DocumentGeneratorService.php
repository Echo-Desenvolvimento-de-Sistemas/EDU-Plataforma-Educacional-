<?php

namespace App\Services;

use App\Models\DocumentTemplate;
use App\Models\Student;
use App\Models\IssuedDocument;
use App\Models\Setting;
use Illuminate\Support\Str;

class DocumentGeneratorService
{
    /**
     * Generate a document for a student based on a template.
     *
     * @param DocumentTemplate $template
     * @param Student $student
     * @return IssuedDocument
     */
    public function generate(DocumentTemplate $template, Student $student)
    {
        $uuid = (string) Str::uuid();

        // Fetch School Settings
        $schoolName = Setting::where('key', 'school_name')->value('value') ?? 'Edu Escola';
        $logoUrl = Setting::where('key', 'logo_url')->value('value');

        // Prepare Logo HTML
        $logoHtml = '';
        if ($logoUrl) {
            // Ensure we use the full URL if stored relatively
            $cleanLogoUrl = str_replace('storage/', '', $logoUrl);
            $fullLogoUrl = str_starts_with($logoUrl, 'http') ? $logoUrl : asset('storage/' . $cleanLogoUrl);
            $logoHtml = "<img src='{$fullLogoUrl}' alt='Logo' style='max-height: 80px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;' />";
        }

        // Fetch Class Info
        $gradeDescription = 'não enturmado';
        if ($student->classRoom) {
            $student->load('classRoom.grade.educationLevel');
            $grade = $student->classRoom->grade;
            if ($grade) {
                $levelName = $grade->educationLevel ? $grade->educationLevel->name : '';
                $gradeDescription = "no {$grade->name} do {$levelName}";
            }
        }

        // Prepare Placeholders
        $placeholders = [
            '{{name}}' => $student->name,
            '{{cpf}}' => $student->cpf ?? 'N/A',
            '{{registration_number}}' => $student->registration_number ?? 'N/A',
            '{{date}}' => now()->format('d/m/Y'),
            '{{uuid}}' => $uuid,
            '{{school_name}}' => $schoolName,
            '{{logo_img}}' => $logoHtml,
            '{{grade_description}}' => $gradeDescription,
            '{{city}}' => Setting::where('key', 'school_city')->value('value') ?? 'Cidade',
        ];

        // Replace content (iterative replacement)
        $content = $template->content;

        // Global Document Layout Wrapper
        $headerHtml = '<div style="text-align: center; margin-bottom: 40px; font-family: sans-serif;">';
        if ($logoHtml) {
            $headerHtml .= $logoHtml;
        }
        $headerHtml .= '<div style="font-weight: bold; font-size: 16pt; margin-top: 10px; text-transform: uppercase;">' . $schoolName . '</div>';
        $headerHtml .= '<div style="font-size: 10pt; color: #666; margin-top: 5px;">Sistema de Gestão Escolar</div>';
        $headerHtml .= '<div style="font-weight: bold; font-size: 14pt; margin-top: 30px; text-transform: uppercase; text-decoration: underline;">' . $template->title . '</div>';
        $headerHtml .= '</div>';

        // Wrap content in justified container
        $content = $headerHtml . '<div style="text-align: justify; line-height: 1.6; font-family: sans-serif;">' . $content . '</div>';
        foreach ($placeholders as $key => $value) {
            $content = str_replace($key, $value, $content);
        }

        // Generate Verification URL
        $validationUrl = route('documents.validate', ['uuid' => $uuid]);

        // QR Code & Signature HTML
        $city = Setting::where('key', 'school_city')->value('value');
        $dateStr = now()->locale('pt_BR')->translatedFormat('d \d\e F \d\e Y');

        $qrCodeHtml = '<div style="margin-top: 60px; font-family: sans-serif;">';

        // Signature Block
        $qrCodeHtml .= '<div style="text-align: center; margin-bottom: 40px;">';
        $locationDate = $city ? "{$city}, {$dateStr}." : "{$dateStr}.";
        $qrCodeHtml .= '<div style="margin-bottom: 40px;">' . $locationDate . '</div>';
        $qrCodeHtml .= '<div style="width: 300px; border-top: 1px solid #000; margin: 0 auto; padding-top: 5px; font-weight: bold;">Secretaria Acadêmica</div>';
        $qrCodeHtml .= '</div>';

        // QR Code
        $qrCodeHtml .= '<div style="text-align: center; color: #999; font-size: 8pt;">';
        $qrCodeHtml .= '<div style="margin-bottom: 5px;">Documento assinado digitalmente. A autenticidade pode ser verificada pelo QR Code abaixo:</div>';
        $qrCodeHtml .= '<img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' . urlencode($validationUrl) . '" alt="QR Code" style="display: block; margin: 0 auto;" />';
        $qrCodeHtml .= '<div style="margin-top: 5px;">' . $uuid . '</div>';
        $qrCodeHtml .= '</div>';

        $qrCodeHtml .= '</div>';

        // Append QR to content
        if (str_contains($content, '{{qrcode}}')) {
            $content = str_replace('{{qrcode}}', $qrCodeHtml, $content);
        } else {
            $content .= $qrCodeHtml;
        }

        // Save Record
        $issued = IssuedDocument::create([
            'uuid' => $uuid,
            'student_id' => $student->id,
            'document_template_id' => $template->id,
            'content_snapshot' => $content,
        ]);

        return $issued;
    }
}
