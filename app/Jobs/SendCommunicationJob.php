<?php

namespace App\Jobs;

use App\Models\Message;
use App\Models\MessageRecipient;
use App\Models\User;
use App\Services\WhatsAppService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\URL;

class SendCommunicationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $recipients;

    /**
     * Create a new job instance.
     *
     * @param Message $message
     * @param \Illuminate\Database\Eloquent\Collection|array $recipients
     */
    public function __construct(Message $message, $recipients)
    {
        $this->message = $message;
        $this->recipients = $recipients;
    }

    /**
     * Execute the job.
     */
    public function handle(WhatsAppService $whatsappService): void
    {
        foreach ($this->recipients as $recipient) {
            // Ensure recipient is a User model
            if (!($recipient instanceof User)) {
                $recipient = User::find($recipient);
            }

            if (!$recipient || !$recipient->phone) {
                continue;
            }

            // Create tracking record if not exists
            MessageRecipient::firstOrCreate([
                'message_id' => $this->message->id,
                'recipient_id' => $recipient->id,
            ]);

            // Generate Magic Link
            $url = URL::temporarySignedRoute(
                'magic-login.verify',
                now()->addDays(7),
                ['user' => $recipient->id]
            );

            $text = "Olá {$recipient->name}, novo comunicado da Escola: {$url}";

            // Rate Limiting (1 message per 5 seconds globally for this job type usually, but here simple implementation)
            Redis::throttle('whatsapp_sender')
                ->allow(1)
                ->every(5)
                ->then(function () use ($whatsappService, $recipient, $text) {
                    $whatsappService->sendText($recipient->phone, $text);
                }, function () {
                    // Could release back to queue if needed, but throttle handles delay usually if configured right.
                    // For simplicity, we just rely on the job retrying or sleeping if implemented with more complex logic.
                    // Here we just sleep to respect the limit if we were in a loop in a single job, 
                    // but since this job handles multiple recipients, we should probably dispatch individual jobs per recipient 
                    // or sleep here.
                    sleep(5);
                });

            // Should probably sleep anyway to enforce rate limit if throttle doesn't block execution
            sleep(5);
        }
    }
}
