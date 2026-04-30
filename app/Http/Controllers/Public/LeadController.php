<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'nullable|string|max:20',
            'institution' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'persona' => 'required|string|in:admin,secretaria,professor,aluno',
        ]);

        Lead::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'institution' => $validated['institution'],
            'role' => $validated['role'],
            'requested_persona' => $validated['persona'],
        ]);

        if (request()->expectsJson()) {
            return response()->json(['success' => true]);
        }

        // Fallback for non-AJAX requests
        return redirect()->route('demo.login', ['persona' => $validated['persona']]);
    }
}
