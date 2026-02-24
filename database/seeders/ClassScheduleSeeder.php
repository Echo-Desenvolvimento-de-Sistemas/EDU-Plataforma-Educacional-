<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ClassRoom;
use App\Models\Subject;
use App\Models\Allocation;
use App\Models\ClassSchedule;

class ClassScheduleSeeder extends Seeder
{
    public function run()
    {
        $professor = User::where('email', 'professor@example.com')->first();
        if (!$professor) {
            $this->command->error('Professor not found. Please run AllocationSeeder first.');
            return;
        }

        // Clean up old ones to avoid duplicates if running multiple times
        ClassSchedule::truncate();

        $classes = ClassRoom::with('allocations')->get();
        $subjects = Subject::all();

        if ($classes->isEmpty() || $subjects->isEmpty()) {
            $this->command->error('Classes or Subjects not found.');
            return;
        }

        $daysOfWeek = [1, 2, 3, 4, 5]; // Segunda a Sexta

        // Morning Shift Times (Matutino)
        $morningTimes = [
            ['07:30:00', '08:20:00'],
            ['08:20:00', '09:10:00'],
            ['09:10:00', '10:00:00'],
            // Interval: 10:00 - 10:20
            ['10:20:00', '11:10:00'],
            ['11:10:00', '12:00:00'],
        ];

        // Afternoon Shift Times (Vespertino)
        $afternoonTimes = [
            ['13:00:00', '13:50:00'],
            ['13:50:00', '14:40:00'],
            ['14:40:00', '15:30:00'],
            // Interval: 15:30 - 15:50
            ['15:50:00', '16:40:00'],
            ['16:40:00', '17:30:00'],
        ];

        foreach ($classes as $class) {
            $isMorning = $class->shift === 'matutino';
            $times = $isMorning ? $morningTimes : $afternoonTimes;

            // Get allocations for this class (so we know who teaches what)
            $classAllocations = Allocation::where('class_room_id', $class->id)->get();
            $allocatedSubjectIds = $classAllocations->pluck('subject_id')->toArray();

            // Which subjects will be taught in this class?
            // Prioritize allocated ones, then fill with random ones
            $poolOfSubjects = $allocatedSubjectIds;

            // Add some other subjects to the pool
            $otherSubjects = $subjects->whereNotIn('id', $allocatedSubjectIds)->take(3)->pluck('id')->toArray();
            $poolOfSubjects = array_merge($poolOfSubjects, $otherSubjects);
            if (empty($poolOfSubjects)) {
                $poolOfSubjects = $subjects->pluck('id')->toArray();
            }

            foreach ($daysOfWeek as $day) {
                // Ensure the professor gets at least 1 class per day if they have an allocation here
                $hasScheduledProfessorToday = false;

                foreach ($times as $index => $timeSlot) {
                    $subjectIdToSchedule = null;

                    if (!$hasScheduledProfessorToday && !empty($allocatedSubjectIds)) {
                        $subjectIdToSchedule = $allocatedSubjectIds[array_rand($allocatedSubjectIds)];
                        $hasScheduledProfessorToday = true;
                    } else {
                        $subjectIdToSchedule = $poolOfSubjects[array_rand($poolOfSubjects)];
                    }

                    ClassSchedule::create([
                        'class_room_id' => $class->id,
                        'subject_id' => $subjectIdToSchedule,
                        'day_of_week' => $day,
                        'start_time' => $timeSlot[0],
                        'end_time' => $timeSlot[1],
                    ]);
                }
            }
        }

        $this->command->info('Class Schedules seeded successfully for all classes!');
    }
}
