<?php

namespace App\Http\Controllers;

use App\Services\GamificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GamificationAuthController extends Controller
{
    public function redirect(Request $request, GamificationService $service)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        if (!$service->isConfigured()) {
            // Return to dashboard with error or just redirect back
            return redirect()->back()->with('error', 'Integração de gameficação não configurada.');
        }

        $ssoUrl = $service->getSsoUrl($user);

        if (empty($ssoUrl)) {
            return redirect()->back()->with('error', 'Erro ao gerar URL de autenticação.');
        }

        return redirect()->away($ssoUrl);
    }
}
