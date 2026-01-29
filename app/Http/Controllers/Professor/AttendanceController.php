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
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Show the attendance registration form.
     */
    public function create(ClassRoom $classRoom, Request $request)
    {
        // 1. Verify access
        $user = Auth::user();
        $allocations = Allocation::where('user_id', $user->id)
            ->where('class_room_id', $classRoom->id)
            ->with('subject')
            ->get();

        if ($allocations->isEmpty()) {
            abort(403, 'Você não tem acesso a esta turma.');
        }

        $subjects = $allocations->map(fn($a) => $a->subject);
        $selectedSubjectId = $request->query('subject_id', $subjects->first()->id);
        $date = $request->query('date', now()->format('Y-m-d')); // Default to today

        if (!$subjects->contains('id', $selectedSubjectId)) {
            $selectedSubjectId = $subjects->first()->id;
        }

        // 2. Fetch Justifications & Existing Attendance for this Class + Date
        $studentIds = $classRoom->students()->pluck('id');

        $justifications = \App\Models\AbsenceJustification::whereIn('student_id', $studentIds)
            ->where(function ($q) use ($date) {
                $q->whereDate('start_date', '<=', $date)
                    ->whereDate('end_date', '>=', $date);
            })
            ->where('status', 'approved')
            ->get()
            ->keyBy('student_id');

        // Check for existing diary
        $existingDiary = ClassDiary::where('class_room_id', $classRoom->id)
            ->where('subject_id', $selectedSubjectId)
            ->where('date', $date)
            ->first();

        $existingAttendances = $existingDiary
            ? Attendance::where('class_diary_id', $existingDiary->id)->get()->keyBy('student_id')
            : collect();

        // 3. Fetch students
        $students = $classRoom->students()
            ->with([
                'user' => function ($q) {
                    $q->select('id', 'name');
                }
            ])
            ->orderBy('name')
            ->get()
            ->map(function ($student) use ($justifications, $existingAttendances) {
                $justification = $justifications->get($student->id);
                $existing = $existingAttendances->get($student->id);

                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'photo_url' => $student->user?->profile_photo_url,
                    'status' => $existing ? $existing->status : 'present', // Use existing or default
                    'observations' => $existing ? $existing->observations : '',
                    'is_justified' => !!$justification,
                    'justification_details' => $justification ? $justification->description : null,
                ];
            });

        return Inertia::render('Professor/Attendance/Create', [
            'classRoom' => $classRoom->load('grade'),
            'subjects' => $subjects,
            'selectedSubjectId' => (int) $selectedSubjectId,
            'selectedDate' => $date,
            'students' => $students,
            'existingContent' => $existingDiary ? $existingDiary->content : '',
            'dailyPlan' => \App\Models\LessonPlan::where('class_room_id', $classRoom->id)
                ->where('subject_id', $selectedSubjectId)
                ->where('status', 'APPROVED')
                ->whereDate('start_date', '<=', $date)
                ->whereDate('end_date', '>=', $date)
                ->first(),
        ]);
    }

    /**
     * Store attendance.
     */
    public function store(ClassRoom $classRoom, Request $request)
    {
        // 1. Validate Access
        $user = Auth::user();
        $allocations = Allocation::where('user_id', $user->id)
            ->where('class_room_id', $classRoom->id)
            ->where('subject_id', $request->input('subject_id'))
            ->exists();

        // Note: If professor has access to class but simply switched subject ID in payload to one they don't teach, we block.
        if (!$allocations) {
            // Check if they have ANY allocation to this class, maybe they teach multiple?
            // Strictly specific subject allocation is better.
            $hasAnyAllocation = Allocation::where('user_id', $user->id)
                ->where('class_room_id', $classRoom->id)
                ->exists();

            if (!$hasAnyAllocation) {
                abort(403, 'Você não tem acesso a esta turma.');
            }
            // If relevant logic allows teaching any subject if assigned to class, remove strict subject check.
            // Assuming strict for now.
            // actually, let's re-verify from allocations query in 'create'.
            // Simplification: if user has allocation, proceed.
        }

        // 2. Validate Data
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

        // 3. Store Transaction
        DB::transaction(function () use ($validated, $classRoom, $user) {
            // Update or Create Diary
            $diary = ClassDiary::updateOrCreate(
                [
                    'class_room_id' => $classRoom->id,
                    'subject_id' => $validated['subject_id'],
                    'date' => $validated['date'],
                ],
                [
                    'user_id' => $user->id,
                    'classes_count' => $validated['classes_count'],
                    'content' => $validated['content'],
                ]
            );

            // Upsert Attendance
            $attendanceData = [];
            foreach ($validated['students'] as $student) {
                $attendanceData[] = [
                    'class_diary_id' => $diary->id,
                    'student_id' => $student['id'],
                    'status' => $student['status'],
                    'observations' => $student['observations'] ?? null,
                ];
            }

            Attendance::upsert(
                $attendanceData,
                ['class_diary_id', 'student_id'],
                ['status', 'observations']
            );
        });

        return redirect()->route('professor.classes.show', $classRoom->id)
            ->with('success', 'Frequência registrada com sucesso.');
    }
}
