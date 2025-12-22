<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Channel;
use App\Models\ClassRoom;

echo "Fixing Channel Names...\n";

$channels = Channel::where('type', 'CLASS')->whereNotNull('related_id')->get();

foreach ($channels as $channel) {
    if ($channel->related_type === 'App\Models\ClassRoom') {
        $cls = ClassRoom::with('grade')->find($channel->related_id);

        if ($cls) {
            $gradeName = $cls->grade ? $cls->grade->name : '';
            $letter = ($cls->name !== $gradeName) ? $cls->name : '';

            $parts = array_filter([$gradeName, $letter]);
            $newName = $parts ? implode(' - ', $parts) : $cls->name;

            if ($newName !== $channel->name) {
                echo "Updating Channel ID {$channel->id}: '{$channel->name}' -> '{$newName}'\n";
                $channel->update(['name' => $newName]);
            } else {
                echo "Channel ID {$channel->id} name is already correct: '{$channel->name}'\n";
            }
        }
    }
}

echo "Done.\n";
