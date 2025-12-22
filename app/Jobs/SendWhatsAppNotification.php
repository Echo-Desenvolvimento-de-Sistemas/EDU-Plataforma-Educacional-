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
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class SendWhatsAppNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $messageId;
    protected $recipientIds;

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

        $users = User::whereIn('id', $this->recipientIds)->get();

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
        }
    }
}
