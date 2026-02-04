<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSettingsController extends Controller
{
    /**
     * Display the admin settings page.
     */
    public function index()
    {
        $settings = Setting::whereIn('key', ['gamification_url'])
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the admin settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'gamification_url' => 'nullable|string|max:500',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'Configurações atualizadas com sucesso!');
    }
}
