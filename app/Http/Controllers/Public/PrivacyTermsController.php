<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PrivacyTermsController extends Controller
{
    public function index()
    {
        $settings = \App\Models\Setting::where('key', 'like', 'school_%')
            ->orWhereIn('key', ['logo_url', 'logo_light_url', 'logo_dark_url'])
            ->pluck('value', 'key');

        return Inertia::render('Public/PrivacyTerms', [
            'settings' => $settings,
        ]);
    }
}
