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
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #000;">
    <p style="margin-bottom: 20px;">
        Declaramos para os devidos fins que, <strong>{{name}}</strong>, 
        inscrito(a) no CPF sob o nº <strong>{{cpf}}</strong> e matrícula <strong>{{registration_number}}</strong>, 
        está regularmente matriculado(a) {{grade_description}} nesta instituição de ensino para o ano letivo vigente.
    </p>

    <p style="margin-bottom: 20px;">
        Esta declaração tem validade de 30 dias a partir da data de emissão.
    </p>
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
        // No reverse operation needed for content correction
    }
};
