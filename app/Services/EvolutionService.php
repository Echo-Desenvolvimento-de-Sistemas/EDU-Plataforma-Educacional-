<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Exception;

class EvolutionService
{
    protected $client;
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.evolution.url', env('EVOLUTION_API_URL'));
        $this->apiKey = config('services.evolution.key', env('EVOLUTION_API_KEY'));

        if (!$this->baseUrl || !$this->apiKey) {
            Log::warning('Evolution API credentials not configured.');
        }

        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'headers' => [
                'apikey' => $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'timeout' => 10,
        ]);
    }

    /**
     * Create a new instance if it doesn't exist
     */
    public function createInstance(string $instanceName)
    {
        try {
            $response = $this->client->post('/instance/create', [
                'json' => [
                    'instanceName' => $instanceName,
                    'qrcode' => true,
                    'integration' => 'WHATSAPP-BAILEYS',
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            // Handle "Instance already exists" (usually 403 or 400)
            if ($e->getCode() === 403 || $e->getCode() === 400) {
                return ['status' => 'exists', 'message' => 'Instance already exists'];
            }

            Log::error("Evolution API Create Error: " . $e->getMessage());
            $responseBody = $e->hasResponse() ? (string) $e->getResponse()->getBody() : '';
            return ['error' => $e->getMessage(), 'details' => $responseBody];
        } catch (Exception $e) {
            Log::error("Error creating instance: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Get connection state
     */
    public function getConnectionState(string $instanceName = 'educacional')
    {
        try {
            $response = $this->client->get("/instance/connectionState/{$instanceName}");
            return json_decode($response->getBody(), true);
        } catch (Exception $e) {
            Log::error("Error fetching connection state: " . $e->getMessage());
            return ['state' => 'close', 'error' => $e->getMessage()];
        }
    }

    /**
     * Connect instance and return QR Code
     */
    public function connectInstance(string $instanceName = 'educacional')
    {
        // 1. Ensure instance exists
        $creation = $this->createInstance($instanceName);

        // If creation failed and it's not simply "exists", return error
        if (isset($creation['error'])) {
            return $creation;
        }

        try {
            // 2. Connect
            $response = $this->client->get("/instance/connect/{$instanceName}");
            return json_decode($response->getBody(), true);
        } catch (Exception $e) {
            Log::error("Error connecting instance: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Logout/Delete instance
     */
    public function logoutInstance(string $instanceName = 'educacional')
    {
        try {
            $this->client->delete("/instance/logout/{$instanceName}");
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
    /**
     * Send a text message to a specific number
     */
    public function sendTextMessage(string $instanceName, string $number, string $text)
    {
        try {
            // Format number: ensure it has country code (e.g. 55)
            // This is a simple formatter, ideally use a library or ensure input is clean
            $number = preg_replace('/\D/', '', $number); // Remove non-digits

            // Assuming Brazil (55) if length is 10 or 11 (DDD + Number)
            if (strlen($number) <= 11) {
                $number = '55' . $number;
            }

            $response = $this->client->post("/message/sendText/{$instanceName}", [
                'json' => [
                    'number' => $number,
                    'text' => $text,
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (Exception $e) {
            Log::error("Error sending WhatsApp message to {$number}: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}
