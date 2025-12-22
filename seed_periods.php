<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$academicYearId = 2; // Identified from previous debug

$periods = [
    ['name' => '1º Bimestre', 'start_date' => '2025-02-01', 'end_date' => '2025-04-30'],
    ['name' => '2º Bimestre', 'start_date' => '2025-05-01', 'end_date' => '2025-07-15'],
    ['name' => '3º Bimestre', 'start_date' => '2025-08-01', 'end_date' => '2025-09-30'],
    ['name' => '4º Bimestre', 'start_date' => '2025-10-01', 'end_date' => '2025-12-15'],
];

foreach ($periods as $p) {
    \App\Models\GradingPeriod::create(array_merge($p, ['academic_year_id' => $academicYearId]));
    echo "Created: " . $p['name'] . "\n";
}

echo "Done.\n";
