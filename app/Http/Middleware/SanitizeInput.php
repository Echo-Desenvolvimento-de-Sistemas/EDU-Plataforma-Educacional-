<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SanitizeInput
{
    /**
     * The attributes that should not be sanitized.
     *
     * @var array<int, string>
     */
    protected $except = [
        'password',
        'password_confirmation',
        'current_password',
        'content_snapshot',
        'content', // Preserved for Document Templates/Lessons where rich text might be acceptable (assuming DOMPurify handles output)
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH')) {
            $request->merge($this->sanitizeArray($request->all()));
        }

        return $next($request);
    }

    /**
     * Recursively sanitize an array of inputs.
     *
     * @param  array  $data
     * @return array
     */
    protected function sanitizeArray(array $data)
    {
        $sanitized = [];

        foreach ($data as $key => $value) {
            if (in_array($key, $this->except, true)) {
                $sanitized[$key] = $value;
                continue;
            }

            if (is_array($value)) {
                $sanitized[$key] = $this->sanitizeArray($value);
            } elseif (is_string($value)) {
                $sanitized[$key] = strip_tags($value);
            } else {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }
}
