<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $stats = null;
        if ($request->user()) {
            try {
                // Dependency injection inside middleware method isn't standard, so we resolve manually or use facade if available.
                // Better approach: resolve service from container
                $gamificationService = app(\App\Services\GamificationService::class);
                if ($gamificationService->isConfigured()) {
                    // Cache for 5 minutes to avoid hitting caching service/external API on every request
                    $stats = \Illuminate\Support\Facades\Cache::remember(
                        'user_gamification_stats_' . $request->user()->id,
                        300,
                        fn() => $gamificationService->getUserStats($request->user())
                    );
                }
            } catch (\Exception $e) {
                // Fail silently
            }
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
                'gamification' => $stats,
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'settings' => \App\Models\Setting::all()->pluck('value', 'key'),
        ];
    }
}
