<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\GamificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GamificationTestController extends Controller
{
    protected $gamificationService;

    public function __construct(GamificationService $gamificationService)
    {
        $this->gamificationService = $gamificationService;
    }

    public function index()
    {
        return Inertia::render('Admin/Gamification/Test', [
            'isConfigured' => $this->gamificationService->isConfigured(),
        ]);
    }

    public function export(Request $request)
    {
        // 1. Coletar Dados
        $users = User::all()->map(function ($user) {
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
                'user_id' => $a->user_id, // This matches external_id of user
                'class_room_id' => $a->class_room_id, // This matches external_id of class
                'subject_id' => $a->subject_id,
            ];
        });

        // 2. Montar Estrutura Final
        $exportData = [
            'users' => $users,
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
