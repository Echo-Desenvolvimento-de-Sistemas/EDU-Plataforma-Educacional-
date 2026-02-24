<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Setting;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'primary_color' => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'secondary_color' => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'logo' => 'nullable|image|max:2048', // Legacy support
            'logo_light' => 'nullable|image|max:2048', // 2MB Max
            'logo_dark' => 'nullable|image|max:2048', // 2MB Max
            'email_domain_suffix' => 'nullable|string|regex:/^[a-zA-Z0-9.]+$/',
            'school_name' => 'nullable|string|max:255',
            'school_address' => 'nullable|string|max:255',
            'school_phone' => 'nullable|string|max:20',
            'school_email' => 'nullable|email|max:255',
            'school_city' => 'nullable|string|max:100',
            'school_state' => 'nullable|string|max:2',
            'school_cnpj' => 'nullable|string|max:20',
            'school_cep' => 'nullable|string|max:10',
            // Mail Settings
            'mail_mailer' => 'nullable|string|max:20',
            'mail_host' => 'nullable|string|max:255',
            'mail_port' => 'nullable|numeric',
            'mail_username' => 'nullable|string|max:255',
            'mail_password' => 'nullable|string|max:255',
            'mail_encryption' => 'nullable|string|max:10',
            'mail_from_address' => 'nullable|email|max:255',
            'mail_from_name' => 'nullable|string|max:255',
            'gamification_url' => 'nullable|string|max:500',
            'gamification_secret' => 'nullable|string|max:500',
            'default_user_password' => 'nullable|string|min:6|max:255',
        ]);

        $settings = $request->only([
            'primary_color',
            'secondary_color',
            'email_domain_suffix',
            'school_name',
            'school_address',
            'school_phone',
            'school_email',
            'school_city',
            'school_state',
            'school_cnpj',
            'school_cnpj',
            'school_cep',
            // Mail
            'mail_mailer',
            'mail_host',
            'mail_port',
            'mail_username',
            'mail_password',
            'mail_encryption',
            'mail_from_address',
            'mail_from_name',
            'gamification_url',
            'gamification_secret',
            'default_user_password'
        ]);

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('settings', 'public');
            $path = str_replace('\\', '/', $path);
            Setting::updateOrCreate(['key' => 'logo_url'], ['value' => '/storage/' . $path]);
        }

        if ($request->hasFile('logo_light')) {
            $path = $request->file('logo_light')->store('settings', 'public');
            $path = str_replace('\\', '/', $path);
            Setting::updateOrCreate(['key' => 'logo_light_url'], ['value' => '/storage/' . $path]);
        }

        if ($request->hasFile('logo_dark')) {
            $path = $request->file('logo_dark')->store('settings', 'public');
            $path = str_replace('\\', '/', $path);
            Setting::updateOrCreate(['key' => 'logo_dark_url'], ['value' => '/storage/' . $path]);
        }

        return redirect()->back()->with('success', 'Configurações atualizadas com sucesso!');
    }

    /**
     * Connect to WhatsApp via Evolution API
     */
    public function connectWhatsapp(\App\Services\EvolutionService $service)
    {
        $instanceName = 'educacional'; // Default instance name
        $result = $service->connectInstance($instanceName);

        // Check structure of result. Usually: { instance: ..., base64: ... }
        // If already connected, might return different structure

        return response()->json($result);
    }

    /**
     * Check connection status
     */
    public function checkWhatsappStatus(\App\Services\EvolutionService $service)
    {
        $instanceName = 'educacional';
        $result = $service->getConnectionState($instanceName);

        // Expected: { instance: ..., state: "open" | "close" | "connecting" }
        return response()->json($result);
    }

    /**
     * Disconnect
     */
    public function disconnectWhatsapp(\App\Services\EvolutionService $service)
    {
        $instanceName = 'educacional';
        $service->logoutInstance($instanceName);
        return back()->with('success', 'Desconectado com sucesso.');
    }

    public function exportGamification()
    {
        // 1. Coletar Dados
        $users = \App\Models\User::all()->map(function ($user) {
            return [
                'external_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ];
        });

        $classRooms = \App\Models\ClassRoom::all()->map(function ($c) {
            return [
                'external_id' => $c->id,
                'name' => $c->name,
                'grade_id' => $c->grade_id,
                'shift' => $c->shift,
                'academic_year_id' => $c->academic_year_id,
            ];
        });

        $allocations = \App\Models\Allocation::all()->map(function ($a) {
            return [
                'external_id' => $a->id,
                'user_id' => $a->user_id,
                'class_room_id' => $a->class_room_id,
                'subject_id' => $a->subject_id,
            ];
        });

        $students = \App\Models\Student::all()->map(function ($s) {
            return [
                'external_id' => $s->id,
                'name' => $s->name,
                'cpf' => $s->cpf,
                'birth_date' => $s->birth_date,
                'class_room_id' => $s->class_room_id,
                'status' => $s->status,
            ];
        });

        // 2. Montar Estrutura Final
        $exportData = [
            'users' => $users,
            'students' => $students,
            'class_rooms' => $classRooms,
            'allocations' => $allocations,
            'generated_at' => now()->toIso8601String(),
        ];

        // 3. Download do Arquivo
        $fileName = 'migracao_gamificacao_' . date('Y-m-d_H-i') . '.json';

        return response()->streamDownload(function () use ($exportData) {
            echo json_encode($exportData, JSON_PRETTY_PRINT);
        }, $fileName);
    }
}
