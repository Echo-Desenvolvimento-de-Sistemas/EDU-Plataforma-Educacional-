<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $content = <<<HTML
<div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 40px; text-align: justify; color: #000;">
    <div style="text-align: center; margin-bottom: 40px;">
        {{logo_img}}
        <h1 style="text-transform: uppercase; font-size: 24px; margin-bottom: 5px;">{{school_name}}</h1>
        <p style="font-size: 14px; color: #555;">Sistema de Gestão Escolar</p>
    </div>

    <h2 style="text-align: center; text-transform: uppercase; margin-bottom: 40px; text-decoration: underline;">Declaração de Matrícula</h2>

    <p style="margin-bottom: 20px;">
        Declaramos para os devidos fins que, <strong>{{name}}</strong>,
        inscrito(a) no CPF sob o nº <strong>{{cpf}}</strong> e matrícula <strong>{{registration_number}}</strong>,
        está regularmente matriculado(a) <strong>{{grade_description}}</strong> nesta instituição de ensino para o ano letivo vigente.
    </p>

    <p style="margin-bottom: 20px;">
        Esta declaração tem validade de 30 dias a partir da data de emissão.
    </p>

    <div style="margin-top: 60px; text-align: center;">
        <p>São Paulo, {{date}}.</p>
        <br><br>
        <p style="border-top: 1px solid #000; width: 50%; margin: 0 auto; padding-top: 5px;">Secretaria Acadêmica</p>
    </div>

    <div style="margin-top: 50px; text-align: center;">
        <p style="font-size: 10px; color: #999; margin-bottom: 10px;">Documento assinado digitalmente. A autenticidade pode ser verificada através do QR Code abaixo:</p>
        <div style="text-align: center;">
            {{qrcode}}
        </div>
    </div>
</div>
HTML;

        DB::table('document_templates')
            ->where('title', 'Declaração de Matrícula')
            ->update(['content' => $content]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No strict reverse needed for content update
    }
};
