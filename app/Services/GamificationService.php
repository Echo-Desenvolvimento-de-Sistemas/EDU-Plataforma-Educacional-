<?php

namespace App\Services;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GamificationService
{
    protected $url;
    protected $secret;

    public function __construct()
    {
        $settings = Setting::whereIn('key', ['gamification_url', 'gamification_secret'])
            ->pluck('value', 'key');

        $this->url = $settings['gamification_url'] ?? null;
        $this->secret = $settings['gamification_secret'] ?? null;
    }

    /**
     * Check if integration is configured
     */
    public function isConfigured(): bool
    {
        return !empty($this->url) && !empty($this->secret);
    }

    /**
     * Send post request to gamification API
     */
    public function post(string $endpoint, array $data)
    {
        if (!$this->isConfigured()) {
            return null;
        }

        try {
            $response = Http::timeout(3) // 3 second timeout
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->secret,
                    'Accept' => 'application/json',
                ])->post($this->url . $endpoint, $data);

            if ($response->failed()) {
                Log::error("Gamification API Error: " . $response->body());
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error("Gamification API Exception: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Sync user data
     */
    public function syncUser($user)
    {
        // Example user sync payload
        return $this->post('/api/webhook/sync/user', [
            'external_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ]);
    }

    /**
     * Sync ClassRoom data
     */
    public function syncClassRoom($classRoom)
    {
        return $this->post('/api/webhook/sync/classroom', [
            'external_id' => $classRoom->id,
            'name' => $classRoom->name,
            'grade_id' => $classRoom->grade_id,
            'shift' => $classRoom->shift,
            'academic_year_id' => $classRoom->academic_year_id,
        ]);
    }

    /**
     * Sync Allocation data
     */
    public function syncAllocation($allocation)
    {
        return $this->post('/api/webhook/sync/allocation', [
            'external_id' => $allocation->id,
            'user_id' => $allocation->user_id,
            'class_room_id' => $allocation->class_room_id,
            'subject_id' => $allocation->subject_id,
        ]);
    }

    /**
     * Generate SSO Token
     */
    public function generateToken(User $user): string
    {
        if (!$this->isConfigured()) {
            return '';
        }

        $payload = [
            'sub' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'iat' => time(),
            'exp' => time() + (60 * 5), // 5 minutes expiration
        ];

        // Simple JWT-like implementation with HS256
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode($payload);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * Get SSO Redirect URL
     */
    public function getSsoUrl(User $user): string
    {
        if (!$this->isConfigured()) {
            return '';
        }

        $token = $this->generateToken($user);
        $baseUrl = rtrim($this->url, '/');

        return "{$baseUrl}/auth/sso?token={$token}";
    }

    /**
     * Get User Stats (Points/Level)
     */
    public function getUserStats(User $user)
    {
        if (!$this->isConfigured()) {
            return null;
        }

        try {
            $response = Http::timeout(3) // 3 second timeout
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->secret,
                    'Accept' => 'application/json',
                ])->get($this->url . "/api/user/{$user->id}/stats");

            if ($response->successful()) {
                return $response->json();
            }
        } catch (\Exception $e) {
            // Fail silently for stats
            Log::warning("Gamification stats timeout/error for user {$user->id}: " . $e->getMessage());
        }

        return null;
    }
}
