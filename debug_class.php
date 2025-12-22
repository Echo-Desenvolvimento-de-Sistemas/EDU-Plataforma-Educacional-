<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$c = App\Models\ClassRoom::with('grade')->first();
if ($c) {
    echo "ID: " . $c->id . "\n";
    echo "Name: " . $c->name . "\n";
    echo "Grade Name: " . ($c->grade ? $c->grade->name : 'NULL') . "\n";
    echo "Shift: " . $c->shift . "\n";
} else {
    echo "No classes found.\n";
}
