<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class FirstAccessController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/FirstAccess', [
            'user' => Auth::user()
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'phone' => 'required|string|min:10|max:15', // Adjust regex if needed for Brazil
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Format phone (remove non-digits)
        $phone = preg_replace('/\D/', '', $validated['phone']);
        // If length <= 11 (e.g. 41999999999), ensure country code? 
        // EvolutionService assumes 55 if length <= 11, so we can save as is or add 55 here.
        // Let's save clean digits.

        $user->forceFill([
            'phone' => $phone,
            'password' => Hash::make($validated['password']),
            'first_access' => false,
        ])->save();

        // Sync phone to related entity if valid
        if ($user->role === 'responsavel' && $user->guardian) {
            $user->guardian->update(['phone' => $phone]);
        } elseif ($user->role === 'aluno' && $user->student && $user->student->address) {
            $user->student->address->update(['phone_contact' => $phone]);
        }

        return redirect()->intended('/dashboard')->with('success', 'Cadastro atualizado com sucesso!');
    }
}
