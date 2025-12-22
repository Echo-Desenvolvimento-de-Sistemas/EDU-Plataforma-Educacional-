<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;
use Inertia\Inertia;
use App\Http\Resources\ExamResource;
use Illuminate\Support\Facades\DB;
use App\Models\StudentAttempt;
use App\Models\AttemptAnswer;

class PlayerController extends Controller
{
    public function start(Activity $activity)
    {
        $user = auth()->user();
        $student = $user->student;

        if (!$student) {
            abort(403, 'User is not a student');
        }

        // Check availability (deadline, class)
        if ($activity->class_room_id !== $student->class_room_id) {
            abort(403, 'Activity not assigned to your class');
        }

        if ($activity->deadline && now()->gt($activity->deadline)) {
            abort(403, 'Activity deadline passed');
        }

        // Check if already attempted? (Optional, maybe allow retries later)

        return Inertia::render('Student/Player/Index', [
            'exam' => new ExamResource($activity->load([
                'questions.options',
                'questions' => function ($q) use ($activity) {
                    // Determine order based on settings or pivot
                    // For now just use pivot order
                    $q->orderBy('activity_questions.order');
                }
            ])),
        ]);
    }

    public function submit(Request $request, Activity $activity)
    {
        $user = auth()->user();
        $student = $user->student;

        if (!$student)
            abort(403);

        // Basic validation
        $request->validate([
            'answers' => 'required|array', // [question_id => selected_option_id]
        ]);

        $answers = $request->input('answers');
        $totalScore = 0;
        $maxScore = 0;

        DB::beginTransaction();
        try {
            $attempt = StudentAttempt::create([
                'student_id' => $student->id,
                'activity_id' => $activity->id,
                'started_at' => now(), // Ideally passed from front or just now
                'finished_at' => now(),
                'score' => 0, // Update later
            ]);

            // Load questions with options to check correctness
            $questions = $activity->questions()->with('options')->get();

            foreach ($questions as $question) {
                $points = $question->pivot->points;
                $selectedOptionId = $answers[$question->id] ?? null;
                $isCorrect = false;

                if ($selectedOptionId) {
                    $selectedOption = $question->options->where('id', $selectedOptionId)->first();
                    if ($selectedOption && $selectedOption->is_correct) {
                        $isCorrect = true;
                        $totalScore += $points;
                    }
                }

                AttemptAnswer::create([
                    'student_attempt_id' => $attempt->id,
                    'question_id' => $question->id,
                    'selected_option_id' => $selectedOptionId,
                    'is_correct' => $isCorrect,
                ]);
            }

            $attempt->update(['score' => $totalScore]);

            DB::commit();

            return response()->json([
                'score' => (float) $totalScore,
                'max_score' => (float) $questions->sum('pivot.points'),
                'redirect' => route('aluno.dashboard'),
                'questions' => $questions->map(function ($q) use ($answers) {
                    $selectedOptionId = $answers[$q->id] ?? null;
                    $isCorrect = false;
                    $correctOption = $q->options->where('is_correct', true)->first();

                    if ($selectedOptionId) {
                        $selectedOption = $q->options->where('id', $selectedOptionId)->first();
                        if ($selectedOption && $selectedOption->is_correct) {
                            $isCorrect = true;
                        }
                    }
                    return [
                        'id' => $q->id,
                        'statement' => $q->statement,
                        'points' => $q->pivot->points,
                        'user_answer_id' => $selectedOptionId,
                        'correct_option_id' => $correctOption ? $correctOption->id : null,
                        'is_correct' => $isCorrect,
                        'options' => $q->options->map(function ($o) {
                            return [
                                'id' => $o->id,
                                'label' => $o->label,
                                'is_correct' => $o->is_correct // exposing correctly for review
                            ];
                        })
                    ];
                })
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
