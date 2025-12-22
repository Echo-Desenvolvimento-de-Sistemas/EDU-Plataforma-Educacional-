<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$classId = 5;
$class = \App\Models\ClassRoom::find($classId);

if (!$class) {
    echo "Class $classId NOT FOUND\n";
    exit;
}

echo "Class ID: " . $class->id . "\n";
echo "Academic Year ID: " . ($class->academic_year_id ?? 'NULL') . "\n";

if ($class->academic_year_id) {
    $periods = \App\Models\GradingPeriod::where('academic_year_id', $class->academic_year_id)->get();
    echo "Grading Periods Count: " . $periods->count() . "\n";
    foreach ($periods as $p) {
        echo " - " . $p->name . " (ID: " . $p->id . ")\n";
    }
} else {
    echo "No Academic Year assigned to Class.\n";
}
