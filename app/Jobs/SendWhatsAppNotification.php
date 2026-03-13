<?php

namespace App\Jobs;

use App\Models\Message;
use App\Models\User;
use App\Models\Setting;
use App\Services\EvolutionService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class SendWhatsAppNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $messageId;
    protected $recipientIds;

    /**
     * Retry configuration for anti-blocking.
     */
    public $tries = 3;
    public $backoff = [10, 30, 60];
    public $timeout = 600; // 10 minutes max for large batches

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($messageId, array $recipientIds)
    {
        $this->messageId = $messageId;
        $this->recipientIds = $recipientIds;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(EvolutionService $evolutionService)
    {
        $message = Message::find($this->messageId);
        if (!$message) {
            return;
        }

        // Get instance name
        $instanceName = Setting::where('key', 'whatsapp_instance_name')->value('value');
        if (!$instanceName) {
            // Cannot send if no instance is configured
            return;
        }

        // Get configurable delay between sends (default: 3 seconds)
        $sendInterval = (int) (Setting::where('key', 'whatsapp_send_interval')->value('value') ?: 3);
        $sendInterval = max(1, min($sendInterval, 30)); // Clamp between 1-30 seconds

        // If more than 50 recipients, split into sub-batches
        if (count($this->recipientIds) > 50) {
            $batches = array_chunk($this->recipientIds, 50);
            foreach ($batches as $index => $batch) {
                // Dispatch each sub-batch with increasing delay
                self::dispatch($this->messageId, $batch)
                    ->delay(now()->addSeconds($index * 50 * $sendInterval));
            }
            return;
        }

        $users = User::whereIn('id', $this->recipientIds)->get();
        $sentCount = 0;

        foreach ($users as $user) {
            // Resolve Phone Number
            $phone = null;

            if ($user->role === 'responsavel') {
                $phone = $user->guardian->phone ?? $user->guardian->phone_home ?? null;
            } elseif ($user->role === 'aluno') {
                // Try student address phone
                $phone = $user->student->address->phone_contact ?? null;
            } else {
                // Fallback for professors/admins (add phone to User model if needed later)
                $phone = $user->phone ?? $user->celular ?? null;
            }

            if (!$phone) {
                // Log warning or continue
                continue;
            }

            // Generate Magic Link
            // Valid for 7 days
            $url = URL::signedRoute('magic-login.verify', ['user' => $user->id], now()->addDays(7));

            // Compose Text
            $appName = config('app.name', 'Colégio Edu'); // Fallback
            $channelName = $message->channel->name ?? 'Secretaria';
            $messageTitle = $message->title ?? 'Novo Comunicado';
            $bodySummary = Str::limit(strip_tags($message->body), 100);

            $text = "🏫 *{$appName}*\n\n";
            $text .= "Olá, {$user->name}! 👋\n\n";
            $text .= "Você recebeu um novo comunicado da *{$channelName}*.\n\n";
            $text .= "📄 Assunto: {$messageTitle}\n\n";
            $text .= "\"{$bodySummary}...\"\n\n";
            $text .= "👇 Toque no link para ler completo e responder:\n{$url}";

            // Send
            $evolutionService->sendTextMessage($instanceName, $phone, $text);
            $sentCount++;

            // Anti-blocking delay between sends
            if ($sentCount < count($users)) {
                sleep($sendInterval);
            }
        }

        Log::info("WhatsApp batch completed: {$sentCount} messages sent for message #{$this->messageId}");
    }
}
