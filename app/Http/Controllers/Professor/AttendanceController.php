<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Allocation;
use App\Models\Attendance;
use App\Models\ClassDiary;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Services\AttendanceService;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    protected $service;

    public function __construct(AttendanceService $service)
    {
        $this->service = $service;
    }

    /**
     * Show the attendance registration form.
     */
    public function create(ClassRoom $classRoom, Request $request)
    {
        $user = Auth::user();
        $allocations = Allocation::where('user_id', $user->id)
            ->where('class_room_id', $classRoom->id)
            ->with('subject')
            ->get();

        if ($allocations->isEmpty()) {
            abort(403, 'Você não tem acesso a esta turma.');
        }

        $subjects = $allocations->map(fn($a) => $a->subject);
        $selectedSubjectId = (int) $request->query('subject_id', $subjects->first()->id);
        $date = $request->query('date', now()->format('Y-m-d'));

        $data = $this->service->getAttendanceData($classRoom, $date, $selectedSubjectId, $user->id);

        return Inertia::render('Professor/Attendance/Create', [
            'classRoom' => $classRoom->load('grade'),
            'subjects' => $subjects,
            'selectedSubjectId' => $selectedSubjectId,
            'selectedDate' => $date,
            'students' => $data['students'],
            'existingContent' => $data['existingDiary'] ? $data['existingDiary']->content : '',
            'dailyPlan' => $data['dailyPlan'],
        ]);
    }


    /**
     * Store attendance.
     */
    public function store(ClassRoom $classRoom, Request $request)
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'date' => 'required|date',
            'classes_count' => 'required|integer|min:1',
            'content' => 'nullable|string',
            'students' => 'required|array',
            'students.*.id' => 'required|exists:students,id',
            'students.*.status' => ['required', Rule::in(['present', 'absent', 'late', 'justified'])],
            'students.*.observations' => 'nullable|string',
        ]);

        $this->service->storeAttendance($classRoom, $validated, Auth::id());

        return redirect()->route('professor.classes.show', $classRoom->id)
            ->with('success', 'Frequência registrada com sucesso.');
    }

}
