<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\DemoSandboxService;
use Symfony\Component\HttpFoundation\Response;

class EnsureSandboxConnection
{
    protected $sandboxService;

    public function __construct(DemoSandboxService $sandboxService)
    {
        $this->sandboxService = $sandboxService;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (session()->has('demo_sandbox_path')) {
            $path = session()->get('demo_sandbox_path');
            
            if (file_exists($path)) {
                $this->sandboxService->switchConnection($path);
            } else {
                // Sandbox file lost (e.g. deleted by cleanup), force logout
                session()->forget(['demo_sandbox_path', 'is_demo', 'demo_persona']);
                auth()->logout();
                return redirect()->route('demo.access')->with('error', 'Sua sessão de demonstração expirou.');
            }
        }

        return $next($request);
    }
}
