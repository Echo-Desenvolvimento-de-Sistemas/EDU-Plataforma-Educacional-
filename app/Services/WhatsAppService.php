<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.evolution_api.url');
        $this->apiKey = config('services.evolution_api.key');
    }

    public function sendText($phone, $message)
    {
        if (!$this->baseUrl || !$this->apiKey) {
            Log::warning('Evolution API configuration missing.');
            return false;
        }

        try {
            // Format phone number (implementation depends on API requirements, usually strictly numeric with country code)
            $phone = preg_replace('/\D/', '', $phone);

            $response = Http::withHeaders([
                'apikey' => $this->apiKey,
            ])->post("{$this->baseUrl}/message/sendText/default", [
                        'number' => $phone,
                        'options' => [
                            'delay' => 1200,
                            'presence' => 'composing',
                            'linkPreview' => true,
                        ],
                        'textMessage' => [
                            'text' => $message,
                        ],
                    ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Evolution API Error: ' . $response->body());
            return false;

        } catch (\Exception $e) {
            Log::error('WhatsApp Service Exception: ' . $e->getMessage());
            return false;
        }
    }
}
