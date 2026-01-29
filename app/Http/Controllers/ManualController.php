<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ManualController extends Controller
{
    public function index()
    {
        $role = auth()->user()->role;

        // Pass the role to the frontend so we can show specific manual sections
        return Inertia::render('Manual/Index', [
            'role' => $role
        ]);
    }
}
