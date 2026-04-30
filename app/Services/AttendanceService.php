<?php

namespace App\Services;

use App\Models\Allocation;
use App\Models\Attendance;
use App\Models\ClassDiary;
use App\Models\ClassRoom;
use App\Models\AbsenceJustification;
use App\Models\LessonPlan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class AttendanceService extends BaseService
{
    /**
     * Get all data needed to render the attendance form.
     */
    public function getAttendanceData(ClassRoom $classRoom, string $date, int $subjectId, int $userId): array
    {
        // 1. Fetch Justifications for the class students
        $studentIds = $classRoom->students()->pluck('id');

        $justifications = AbsenceJustification::whereIn('student_id', $studentIds)
            ->where(function ($q) use ($date) {
                $q->whereDate('start_date', '<=', $date)
                    ->whereDate('end_date', '>=', $date);
            })
            ->where('status', 'approved')
            ->get()
            ->keyBy('student_id');

        // 2. Check for existing diary
        $existingDiary = ClassDiary::where('class_room_id', $classRoom->id)
            ->where('subject_id', $subjectId)
            ->where('date', $date)
            ->first();

        $existingAttendances = $existingDiary
            ? Attendance::where('class_diary_id', $existingDiary->id)->get()->keyBy('student_id')
            : collect();

        // 3. Prepare students list
        $students = $classRoom->students()
            ->with(['user' => fn($q) => $q->select('id', 'name')])
            ->orderBy('name')
            ->get()
            ->map(function ($student) use ($justifications, $existingAttendances) {
                $justification = $justifications->get($student->id);
                $existing = $existingAttendances->get($student->id);

                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'photo_url' => $student->user?->profile_photo_url,
                    'status' => $existing ? $existing->status : 'present',
                    'observations' => $existing ? $existing->observations : '',
                    'is_justified' => !!$justification,
                    'justification_details' => $justification ? $justification->description : null,
                ];
            });

        // 4. Fetch related Lesson Plan
        $dailyPlan = LessonPlan::where('class_room_id', $classRoom->id)
            ->where('subject_id', $subjectId)
            ->where('status', 'APPROVED')
            ->whereDate('start_date', '<=', $date)
            ->whereDate('end_date', '>=', $date)
            ->first();

        return [
            'students' => $students,
            'existingDiary' => $existingDiary,
            'dailyPlan' => $dailyPlan,
        ];
    }

    /**
     * Store or update attendance records.
     */
    public function storeAttendance(ClassRoom $classRoom, array $data, int $userId): void
    {
        DB::transaction(function () use ($data, $classRoom, $userId) {
            // Update or Create Diary
            $diary = ClassDiary::updateOrCreate(
                [
                    'class_room_id' => $classRoom->id,
                    'subject_id' => $data['subject_id'],
                    'date' => $data['date'],
                ],
                [
                    'user_id' => $userId,
                    'classes_count' => $data['classes_count'],
                    'content' => $data['content'],
                ]
            );

            // Prepare for Upsert
            $attendanceData = array_map(function ($student) use ($diary) {
                return [
                    'class_diary_id' => $diary->id,
                    'student_id' => $student['id'],
                    'status' => $student['status'],
                    'observations' => $student['observations'] ?? null,
                ];
            }, $data['students']);

            Attendance::upsert(
                $attendanceData,
                ['class_diary_id', 'student_id'],
                ['status', 'observations']
            );
        });
    }
}
