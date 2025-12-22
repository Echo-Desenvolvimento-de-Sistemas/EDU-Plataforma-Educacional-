<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'deadline' => $this->deadline,
            'settings' => $this->settings,
            'questions' => $this->questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'statement' => $question->statement,
                    'type' => $question->type,
                    'difficulty' => $question->difficulty,
                    'points' => $question->pivot->points, // From pivot
                    'options' => $question->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'label' => $option->label,
                            // CRITICAL: NO is_correct HERE
                        ];
                    }),
                ];
            }),
        ];
    }
}
