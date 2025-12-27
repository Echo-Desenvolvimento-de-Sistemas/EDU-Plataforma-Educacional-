<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
                $settings = \App\Models\Setting::all()->pluck('value', 'key');

                if ($settings->has('mail_host')) {
                    config([
                        'mail.default' => $settings->get('mail_mailer', 'smtp'),
                        'mail.mailers.smtp.host' => $settings->get('mail_host'),
                        'mail.mailers.smtp.port' => $settings->get('mail_port'),
                        'mail.mailers.smtp.username' => $settings->get('mail_username'),
                        'mail.mailers.smtp.password' => $settings->get('mail_password'),
                        'mail.mailers.smtp.encryption' => $settings->get('mail_encryption'),
                        'mail.from.address' => $settings->get('mail_from_address'),
                        'mail.from.name' => $settings->get('mail_from_name'),
                    ]);
                }

                // Override application name globally if set
                if ($settings->has('school_name')) {
                    config(['app.name' => $settings->get('school_name')]);
                }

                // Share settings with mail views
                \Illuminate\Support\Facades\View::composer(['vendor.mail.html.header', 'vendor.mail.html.message'], function ($view) {
                    // Fetch settings fresh inside the composer to avoid caching issues during boot if they change
                    try {
                        $settings = \App\Models\Setting::all()->pluck('value', 'key');

                        $logo = $settings['logo_url'] ?? null;
                        // Ensure logo is an absolute URL
                        if ($logo && !str_starts_with($logo, 'http')) {
                            $logo = asset($logo);
                        }

                        $schoolName = $settings['school_name'] ?? config('app.name');
                        $view->with('logoUrl', $logo)->with('schoolName', $schoolName);
                    } catch (\Exception $e) {
                        // Fail silently in view composer if DB issue
                    }
                });
            }
        } catch (\Exception $e) {
            // Database connection failed or table not found.
            // This is expected during initial deployment (migrations not run yet).
            // We fail silently to allow 'php artisan migrate' to run.
        }
    }
}
