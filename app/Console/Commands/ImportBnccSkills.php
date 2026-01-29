<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Models\BnccSkill;

class ImportBnccSkills extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-bncc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import BNCC skills from JSON files in database/data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting BNCC Import...');

        $this->importInfantil();
        $this->importFundamental();
        $this->importMedio();

        $this->info('BNCC Import Completed!');
    }

    private function importInfantil()
    {
        $path = database_path('data/infantil.json');
        if (!File::exists($path)) {
            $this->error("File not found: $path");
            return;
        }

        $data = json_decode(File::get($path), true);
        $count = 0;

        $this->info('Importing Infantil...');

        // Root -> educacao_infantil -> campos_experiencia
        if (isset($data['educacao_infantil']['campos_experiencia'])) {
            foreach ($data['educacao_infantil']['campos_experiencia'] as $campo) {
                $componentName = $campo['nome_campo'] ?? 'Campos de Experiência';

                if (isset($campo['faixas_etarias'])) {
                    foreach ($campo['faixas_etarias'] as $faixa) {
                        $gradeName = $faixa['nome_faixa'] ?? 'Infantil';

                        if (isset($faixa['objetivos'])) {
                            foreach ($faixa['objetivos'] as $objetivo) {
                                $code = $objetivo['codigo'] ?? null;
                                $description = $objetivo['descricao'] ?? null;

                                if ($code && $description) {
                                    BnccSkill::updateOrCreate(
                                        ['code' => $code],
                                        [
                                            'description' => $description,
                                            'component' => $componentName,
                                            'grade_year' => $gradeName,
                                        ]
                                    );
                                    $count++;
                                }
                            }
                        }
                    }
                }
            }
        }

        $this->info("Imported $count skills for Infantil.");
    }

    private function importFundamental()
    {
        $path = database_path('data/fundamental.json');
        if (!File::exists($path)) {
            $this->error("File not found: $path");
            return;
        }

        $data = json_decode(File::get($path), true);
        $count = 0;
        $this->info('Importing Fundamental...');

        foreach ($data as $disciplineKey => $disciplineData) {
            $componentName = $disciplineData['nome_disciplina'] ?? $disciplineKey;

            if (isset($disciplineData['ano'])) {
                foreach ($disciplineData['ano'] as $anoData) {
                    $gradeName = isset($anoData['nome_ano']) ? implode(', ', (array) $anoData['nome_ano']) : 'Fundamental';

                    if (isset($anoData['unidades_tematicas'])) {
                        foreach ($anoData['unidades_tematicas'] as $unidade) {
                            if (isset($unidade['objeto_conhecimento'])) {
                                foreach ($unidade['objeto_conhecimento'] as $objeto) {
                                    if (isset($objeto['habilidades'])) {
                                        foreach ($objeto['habilidades'] as $habilidade) {
                                            $fullText = $habilidade['nome_habilidade'] ?? '';

                                            // Parse Code: (EF01LP01) Description...
                                            // Some descriptions might not have the code inside parenthesis at the start, but inspecting the file showed they do.
                                            // Pattern: (Code) Description
                                            if (preg_match('/^\((EF\w+)\)\s*(.*)$/s', $fullText, $matches)) {
                                                $code = $matches[1];
                                                $description = trim($matches[2]);

                                                BnccSkill::updateOrCreate(
                                                    ['code' => $code],
                                                    [
                                                        'description' => $description,
                                                        'component' => $componentName,
                                                        'grade_year' => $gradeName,
                                                    ]
                                                );
                                                $count++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $this->info("Imported $count skills for Fundamental.");
    }

    private function importMedio()
    {
        $path = database_path('data/medio.json');
        if (!File::exists($path)) {
            $this->error("File not found: $path");
            return;
        }

        $data = json_decode(File::get($path), true);
        $count = 0;
        $this->info('Importing Médio...');

        foreach ($data as $areaKey => $areaData) {
            $componentName = $areaData['nome_disciplina'] ?? $areaKey;

            if (isset($areaData['ano'])) {
                foreach ($areaData['ano'] as $anoData) {
                    // Usually "1º, 2º, 3º" or "Ensino Médio"
                    $gradeName = isset($anoData['nome_ano']) ? implode(', ', (array) $anoData['nome_ano']) : 'Ensino Médio';

                    if (isset($anoData['codigo_habilidade'])) {
                        foreach ($anoData['codigo_habilidade'] as $habilidade) {
                            $code = $habilidade['nome_codigo'] ?? null;
                            $description = $habilidade['nome_habilidade'] ?? null;

                            if ($code && $description) {
                                BnccSkill::updateOrCreate(
                                    ['code' => $code],
                                    [
                                        'description' => $description,
                                        'component' => $componentName,
                                        'grade_year' => $gradeName,
                                    ]
                                );
                                $count++;
                            }
                        }
                    }
                }
            }
        }

        $this->info("Imported $count skills for Médio.");
    }
}
