<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentTemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
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

        DB::table('document_templates')->insert([
            'title' => 'Declaração de Matrícula',
            'content' => $content,
            'type' => 'declaration',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
