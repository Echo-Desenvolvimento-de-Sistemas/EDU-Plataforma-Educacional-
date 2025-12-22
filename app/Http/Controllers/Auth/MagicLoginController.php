<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MagicLoginController extends Controller
{
    public function verify(Request $request, $userId)
    {
        if (!$request->hasValidSignature()) {
            abort(401, 'This link is invalid or has expired.');
        }

        $user = User::findOrFail($userId);

        Auth::login($user);

        return redirect()->intended('/agenda/inbox');
    }
}
