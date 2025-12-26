<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kanban\KanbanBoard;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KanbanBoardController extends Controller
{
    public function index()
    {
        // Fetch boards with their members for display in the management modal
        $boards = KanbanBoard::with([
            'users' => function ($query) {
                $query->select('users.id', 'users.name', 'users.email', 'kanban_board_user.permission');
            }
        ])->withCount(['columns'])->get();

        // Fetch potential users to add (simplify for now: all non-students, or just all users)
        // Let's filter slightly to avoid massive lists if possible, but for now take all staff/teachers
        $potentialUsers = User::whereIn('role', ['admin', 'secretaria', 'professor'])
            ->select('id', 'name', 'role')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Kanban/Index', [
            'boards' => $boards,
            'potentialUsers' => $potentialUsers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $board = KanbanBoard::create([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => auth()->id(),
        ]);

        // Default columns
        $board->columns()->createMany([
            ['name' => 'A Fazer', 'order' => 0, 'color' => '#ef4444'], // Red
            ['name' => 'Em Andamento', 'order' => 1, 'color' => '#f59e0b'], // Amber
            ['name' => 'Concluído', 'order' => 2, 'color' => '#22c55e'], // Green
        ]);

        return redirect()->back()->with('success', 'Quadro criado com sucesso!');
    }

    public function update(Request $request, KanbanBoard $kanbanBoard)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $kanbanBoard->update($request->only('name', 'description'));

        return redirect()->back()->with('success', 'Quadro atualizado com sucesso!');
    }

    public function destroy(KanbanBoard $kanbanBoard)
    {
        $kanbanBoard->delete();
        return redirect()->back()->with('success', 'Quadro excluído.');
    }

    public function storeUser(Request $request, KanbanBoard $kanbanBoard)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission' => 'required|in:view,create_only,edit',
        ]);

        $kanbanBoard->users()->attach($request->user_id, ['permission' => $request->permission]);

        return redirect()->back()->with('success', 'Usuário adicionado ao quadro.');
    }

    public function removeUser(KanbanBoard $kanbanBoard, User $user)
    {
        $kanbanBoard->users()->detach($user->id);
        return redirect()->back()->with('success', 'Usuário removido.');
    }
}
