<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\ClassRoom;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaSettingController extends Controller
{
    public function index()
    {
        // 1. Fetch Broadcast Groups (manually created channels)
        // Groups that are NOT linked to a ClassRoom (or other auto-types later)
        $groups = Channel::where('type', 'BROADCAST')
            ->whereNull('related_type')
            ->with('speakers:id,name,role') // Get users who can speak in this channel
            ->get();

        // 2. Fetch Automatically Managed Classes
        // These are channels linked to ClassRooms
        $classes = Channel::where('related_type', ClassRoom::class)
            ->with(['related', 'speakers'])
            ->get();

        // If classes don't have channels yet, we might want to list all classes and show status
        // But for now, let's assume auto-channels are created or we list existing ones.
        // Better: List ALL ClassRooms and show if they have a channel + assigned professors

        $classRooms = ClassRoom::with(['allocations.user', 'channel.speakers', 'grade'])->get()->map(function ($classRoom) {
            $gradeName = $classRoom->grade ? $classRoom->grade->name : '';
            // If class name is same as grade name, it's likely just "Series".
            // If class name is short (e.g. "A"), it's the letter.
            return [
                'id' => $classRoom->id,
                'name' => $classRoom->name,
                'series' => $gradeName,
                'letter' => ($classRoom->name !== $gradeName) ? $classRoom->name : '',
                'channel' => $classRoom->channel,
                'professors' => $classRoom->allocations->map(fn($a) => $a->user),
            ];
        });

        // 3. Fetch potential speakers (Admin, Secretaria, Professor) using generic query or specific roles
        // Ideally we search via API, but for MVP load simple list
        $staff = User::whereIn('role', ['admin', 'secretaria', 'professor'])->get(['id', 'name', 'role']);

        return Inertia::render('Admin/Agenda/Settings', [
            'groups' => $groups,
            'classes' => $classRooms,
            'staff' => $staff,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Channel::create([
            'name' => $validated['name'],
            'type' => 'BROADCAST',
            'icon' => 'users',
            'is_active' => true,
        ]);

        return back()->with('success', 'Grupo criado com sucesso.');
    }

    public function update(Request $request, Channel $channel)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable', // Can be file
        ]);

        $data = ['name' => $validated['name']];

        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('channels', 'public');
            $data['icon'] = asset('storage/' . $path);
        }

        $channel->update($data);

        return back()->with('success', 'Grupo atualizado.');
    }

    public function destroy(Channel $channel)
    {
        $channel->delete();
        return back()->with('success', 'Grupo removido.');
    }

    // Attach a user (speaker) to a channel
    public function attachUser(Request $request, Channel $channel)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $channel->speakers()->syncWithoutDetaching([$validated['user_id']]);

        return back()->with('success', 'Usuário adicionado ao grupo.');
    }

    // Detach a user
    public function detachUser(Channel $channel, User $user)
    {
        $channel->speakers()->detach($user->id);
        return back()->with('success', 'Usuário removido do grupo.');
    }

    /**
     * Helper to get or create a unique instance name for this school
     */
    protected function getInstanceName()
    {
        // Try to get existing name
        $setting = \App\Models\Setting::where('key', 'whatsapp_instance_name')->first();

        if ($setting) {
            return $setting->value;
        }

        // If not exists, generate new one based on school name
        $schoolName = \App\Models\Setting::where('key', 'school_name')->value('value') ?? 'school';
        $slug = \Illuminate\Support\Str::slug($schoolName); // "Escola Exemplo" -> "escola-exemplo"

        // Add short unique id to prevent collisions if names are same
        $instanceName = substr($slug, 0, 30) . '_' . uniqid();

        \App\Models\Setting::create([
            'key' => 'whatsapp_instance_name',
            'value' => $instanceName
        ]);

        return $instanceName;
    }

    /**
     * Connect to WhatsApp via Evolution API
     */
    public function connectWhatsapp(\App\Services\EvolutionService $service)
    {
        $instanceName = $this->getInstanceName();
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
        $instanceName = $this->getInstanceName();
        $result = $service->getConnectionState($instanceName);

        // Expected: { instance: ..., state: "open" | "close" | "connecting" }
        return response()->json($result);
    }

    /**
     * Disconnect
     */
    public function disconnectWhatsapp(\App\Services\EvolutionService $service)
    {
        $instanceName = $this->getInstanceName();
        $service->logoutInstance($instanceName);
        return back()->with('success', 'Desconectado com sucesso.');
    }
}
