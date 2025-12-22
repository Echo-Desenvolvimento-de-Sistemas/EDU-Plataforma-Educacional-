<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClassDiary;
use App\Models\ClassRoom;
use App\Models\AbsenceJustification;
use App\Models\GradingPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AttendanceController extends Controller
{
    /**
     * Display the attendance management dashboard.
     */
    public function index(Request $request)
    {
        $classRooms = ClassRoom::with('grade')->get()->map(function ($class) {
            return [
                'id' => $class->id,
                'name' => $class->name . ' - ' . $class->grade->name,
            ];
        });

        $subjects = \App\Models\Subject::all(['id', 'name']);

        // Filter Inputs
        $classRoomId = $request->input('class_room_id');
        $subjectId = $request->input('subject_id');
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        $attendanceMatrix = [];
        $students = [];
        $metrics = [];
        $daysInMonth = 0;
        $diariesMap = [];

        if ($classRoomId && $subjectId) {
            $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
            $startDate = "$year-$month-01";
            $endDate = "$year-$month-$daysInMonth";

            // 1. Fetch Students
            $students = \App\Models\Student::where('class_room_id', $classRoomId)
                ->orderBy('name')
                ->get(['id', 'name']);

            // 2. Fetch Diaries for the period
            $diaries = ClassDiary::where('class_room_id', $classRoomId)
                ->where('subject_id', $subjectId)
                ->whereBetween('date', [$startDate, $endDate])
                ->with('attendances')
                ->get();

            // Map diaries by day (int)
            foreach ($diaries as $diary) {
                $day = (int) date('d', strtotime($diary->date));
                $diariesMap[$day] = $diary;
            }

            // 3. Build Matrix & Metrics
            foreach ($students as $student) {
                $studentData = [];
                $totalPresences = 0; // In terms of classes count
                $totalAbsences = 0;
                $totalJustified = 0;

                // Check Justifications for the whole month
                // Optimization: Fetch all justifications for class once preferably, but simple loop here ok for now
                $justifications = AbsenceJustification::where('student_id', $student->id)
                    ->where('status', 'approved')
                    ->where(function ($q) use ($startDate, $endDate) {
                        $q->whereBetween('start_date', [$startDate, $endDate])
                            ->orWhereBetween('end_date', [$startDate, $endDate]);
                    })->get();

                for ($day = 1; $day <= $daysInMonth; $day++) {
                    if (isset($diariesMap[$day])) {
                        $diary = $diariesMap[$day];
                        $attendance = $diary->attendances->where('student_id', $student->id)->first();

                        $status = $attendance ? $attendance->status : 'present'; // Default present if not explicitly absent? Or '?'
                        // Logic: If diary exists but no attendance record -> usually means present if we only store absences? 
                        // But validation implies we store 'present' too. 
                        // If missing, assume Present.

                        // Check justification for this specific date
                        $isJustified = false;
                        $currentDate = sprintf('%04d-%02d-%02d', $year, $month, $day);
                        foreach ($justifications as $j) {
                            $end = $j->end_date ?? $j->start_date;
                            if ($currentDate >= $j->start_date && $currentDate <= $end) {
                                $isJustified = true;
                                break;
                            }
                        }

                        if ($status == 'absent') {
                            if ($isJustified) {
                                $status = 'justified';
                                $totalJustified += $diary->classes_count;
                            } else {
                                $totalAbsences += $diary->classes_count;
                            }
                        } else {
                            $totalPresences += $diary->classes_count;
                        }

                        $studentData[$day] = $status;
                    } else {
                        $studentData[$day] = null; // No class
                    }
                }

                $attendanceMatrix[$student->id] = $studentData;

                // Frequency Calculation
                $totalClasses = $diaries->sum('classes_count');
                $percentage = $totalClasses > 0
                    ? round((($totalClasses - $totalAbsences) / $totalClasses) * 100, 1)
                    : 100;

                $metrics[$student->id] = [
                    'total_absences' => $totalAbsences,
                    'total_justified' => $totalJustified,
                    'total_presences' => $totalPresences, // Approximate
                    'percentage' => $percentage
                ];
            }
        }

        return inertia('Admin/Attendance/Index', [
            'classRooms' => $classRooms,
            'subjects' => $subjects,
            'filters' => [
                'class_room_id' => $classRoomId,
                'subject_id' => $subjectId,
                'month' => $month,
                'year' => $year,
            ],
            'data' => [
                'matrix' => $attendanceMatrix,
                'students' => $students,
                'metrics' => $metrics,
                'daysInMonth' => $daysInMonth,
                'diaries' => $diariesMap // Useful to know which days had classes
            ]
        ]);
    }

    /**
     * Show the form for editing/creating attendance.
     */
    public function edit(Request $request)
    {
        $classRoomId = $request->query('class_room_id');
        $subjectId = $request->query('subject_id');
        $date = $request->query('date');

        if (!$classRoomId || !$subjectId || !$date) {
            return redirect()->route('admin.attendance.index');
        }

        $classRoom = ClassRoom::with('grade')->findOrFail($classRoomId);

        // 1. Fetch Justifications for this Class + Date
        $studentIds = $classRoom->students()->pluck('id');

        $justifications = \App\Models\AbsenceJustification::whereIn('student_id', $studentIds)
            ->where(function ($q) use ($date) {
                $q->whereDate('start_date', '<=', $date)
                    ->whereDate('end_date', '>=', $date);
            })
            ->where('status', 'approved')
            ->get()
            ->keyBy('student_id');

        // 2. Fetch existing attendance if any
        $diary = ClassDiary::where('class_room_id', $classRoomId)
            ->where('subject_id', $subjectId)
            ->where('date', $date)
            ->with(['attendances'])
            ->first();

        $existingAttendances = $diary ? $diary->attendances->keyBy('student_id') : collect([]);

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
                $attendance = $existingAttendances->get($student->id);

                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'photo_url' => $student->user?->profile_photo_url,
                    'status' => $attendance ? $attendance->status : 'present',
                    'observations' => $attendance ? $attendance->observations : null,
                    'is_justified' => !!$justification,
                    'justification_details' => $justification ? $justification->description : null,
                ];
            });

        // Fetch subject name for display
        $subject = \App\Models\Subject::find($subjectId);

        return inertia('Admin/Attendance/Edit', [
            'classRoom' => $classRoom,
            'subject' => $subject,
            'date' => $date,
            'students' => $students,
            'diary' => $diary ? [
                'classes_count' => $diary->classes_count,
                'content' => $diary->content,
            ] : null
        ]);
    }

    /**
     * Batch store attendance for a class.
     * Performance optimized using upsert.
     */
    public function batchStore(Request $request)
    {
        $validated = $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'subject_id' => 'nullable|exists:subjects,id', // Nullable for elementary
            'date' => 'required|date',
            'classes_count' => 'required|integer|min:1',
            'content' => 'nullable|string',
            'students' => 'required|array',
            'students.*.id' => 'required|exists:students,id',
            'students.*.status' => ['required', Rule::in(['present', 'absent', 'late'])],
            'students.*.observations' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($validated) {
            // 1. Create or Update the Diary Entry
            $diary = ClassDiary::updateOrCreate(
                [
                    'class_room_id' => $validated['class_room_id'],
                    'subject_id' => $validated['subject_id'],
                    'date' => $validated['date'],
                ],
                [
                    'user_id' => auth()->id(), // Logged in teacher/admin
                    'classes_count' => $validated['classes_count'],
                    'content' => $validated['content'],
                ]
            );

            // 2. Prepare bulk data for upsert
            $attendanceData = [];

            foreach ($validated['students'] as $student) {
                $attendanceData[] = [
                    'class_diary_id' => $diary->id,
                    'student_id' => $student['id'],
                    'status' => $student['status'],
                    'observations' => $student['observations'] ?? null,
                ];
            }

            // 3. Upsert (Insert or Update on unique key conflict)
            // Unique key: [class_diary_id, student_id]
            Attendance::upsert(
                $attendanceData,
                ['class_diary_id', 'student_id'],
                ['status', 'observations']
            );

            return redirect()->route('admin.attendance.index')
                ->with('success', 'Frequência registrada com sucesso.');
        });
    }

    /**
     * Calculate frequency percentage for a student in a period.
     */
    public function frequencyReport(Request $request)
    {
        $studentId = $request->input('student_id');
        $subjectId = $request->input('subject_id');
        $gradingPeriodId = $request->input('grading_period_id');

        $period = GradingPeriod::findOrFail($gradingPeriodId);

        // 1. Total Classes in the period (for this subject)
        $query = ClassDiary::whereBetween('date', [$period->start_date, $period->end_date]);

        if ($subjectId) {
            $query->where('subject_id', $subjectId);
        }
        // Filter by student's classroom? Usually yes, but here we assume inputs are valid context
        // Ideally we filter by the student's class_room_id history

        // Note: This logic seems to sum ALL diaries in the system if filtering only by subject/date!
        // FIX: We must filter by the student's classroom history or at least the current classroom.
        // Assuming current classroom for simplicity as per existing logic, but adding check.
        $student = \App\Models\Student::find($studentId);
        if ($student) {
            $query->where('class_room_id', $student->class_room_id);
        }

        $totalClassesCount = $query->sum('classes_count');

        if ($totalClassesCount == 0) {
            return response()->json([
                'total_classes' => 0,
                'total_absences' => 0,
                'percentage' => 100,
            ]);
        }

        // 2. Count Absences
        $absencesQuery = Attendance::where('student_id', $studentId)
            ->where('status', 'absent')
            ->whereHas('classDiary', function ($q) use ($period, $subjectId) {
                $q->whereBetween('date', [$period->start_date, $period->end_date]);
                if ($subjectId) {
                    $q->where('subject_id', $subjectId);
                }
            })
            ->with('classDiary'); // Eager load to get classes_count

        $absences = $absencesQuery->get();

        $totalAbsences = 0;
        foreach ($absences as $attendance) {
            $totalAbsences += $attendance->classDiary->classes_count;
        }

        // 3. Handle Justifications
        // Subtract justified absences from totalAbsences OR adjust totalClasses depending on law.
        // Usually: Justified absence = effectively present for calculation OR removed from total.
        // Let's assume: Justified = removed from "absent" count (considered present).

        $justifications = AbsenceJustification::where('student_id', $studentId)
            ->where('status', 'approved')
            ->where(function ($q) use ($period) {
                $q->whereBetween('start_date', [$period->start_date, $period->end_date])
                    ->orWhereBetween('end_date', [$period->start_date, $period->end_date]);
            })
            ->get();

        // Justification logic needs to be precise per day. 
        // Simple approximation: If date of absence is covered by justification, subtract it.

        $justifiedAbsences = 0;
        foreach ($absences as $attendance) {
            $date = $attendance->classDiary->date;
            foreach ($justifications as $just) {
                $end = $just->end_date ?? $just->start_date;
                if ($date >= $just->start_date && $date <= $end) {
                    $justifiedAbsences += $attendance->classDiary->classes_count;
                    break; // Justified once is enough
                }
            }
        }

        $effectiveAbsences = max(0, $totalAbsences - $justifiedAbsences);
        $percentage = (($totalClassesCount - $effectiveAbsences) / $totalClassesCount) * 100;

        return response()->json([
            'total_classes' => $totalClassesCount,
            'total_absences' => $totalAbsences,
            'justified_absences' => $justifiedAbsences,
            'effective_absences' => $effectiveAbsences,
            'percentage' => round($percentage, 1),
        ]);
    }
}
