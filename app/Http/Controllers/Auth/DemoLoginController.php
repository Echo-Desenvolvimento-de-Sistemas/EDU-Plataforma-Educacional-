<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\DemoSandboxService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class DemoLoginController extends Controller
{
    protected $sandboxService;

    public function __construct(DemoSandboxService $sandboxService)
    {
        $this->sandboxService = $sandboxService;
    }

    public function login(string $persona)
    {
        $emails = [
            'admin' => 'admin@admin.com',
            'secretaria' => 'secretaria@example.com',
            'professor' => 'professor@example.com',
            'aluno' => 'aluno@example.com',
        ];

        if (!isset($emails[$persona])) {
            return redirect()->back()->with('error', 'Perfil inválido.');
        }

        // 1. Setup Sandbox
        $sandboxPath = $this->sandboxService->setupSandbox();
        
        // 2. Switch connection BEFORE logging in to find the user in the sandbox
        $this->sandboxService->switchConnection($sandboxPath);

        $user = User::where('email', $emails[$persona])->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Usuário demo não encontrado.');
        }

        // 3. Store demo info in session
        Session::put('demo_sandbox_path', $sandboxPath);
        Session::put('is_demo', true);
        Session::put('demo_persona', $persona);

        Auth::login($user);

        // 4. Cleanup old sandboxes
        $this->sandboxService->cleanup();

        return redirect()->route('dashboard');
    }

    public function logout()
    {
        $path = Session::get('demo_sandbox_path');
        
        Session::forget(['demo_sandbox_path', 'is_demo', 'demo_persona']);
        Auth::logout();

        if ($path && file_exists($path)) {
            @unlink($path);
        }

        return redirect()->route('home');
    }
}
