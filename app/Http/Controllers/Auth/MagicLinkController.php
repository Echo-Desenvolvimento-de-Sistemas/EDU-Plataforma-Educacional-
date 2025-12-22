<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MagicLinkController extends Controller
{
    /**
     * Handle the magic link login.
     * The 'signed' middleware verifies the signature.
     */
    public function login(Request $request, User $user)
    {
        if (!$request->hasValidSignature()) {
            abort(401, 'Este link de acesso é inválido ou expirou.');
        }

        Auth::login($user);

        return redirect('/agenda');
    }
}
