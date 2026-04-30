<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            Mail::to('cesarimoto441@gmail.com')->send(new ContactMail($validated));
            
            return back()->with('success', 'Mensagem enviada com sucesso!');
        } catch (\Exception $e) {
            Log::error('Erro ao enviar e-mail de contato: ' . $e->getMessage());
            return back()->with('error', 'Houve um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        }
    }
}
