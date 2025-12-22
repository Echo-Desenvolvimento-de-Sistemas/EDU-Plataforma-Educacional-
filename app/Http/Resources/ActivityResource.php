<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
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
            'class_room_id' => $this->class_room_id,
            'questions' => $this->questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'statement' => $question->statement,
                    'type' => $question->type,
                    'difficulty' => $question->difficulty,
                    'points' => $question->pivot->points,
                    'explanation' => $question->explanation,
                    'options' => $question->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'label' => $option->label,
                            'is_correct' => $option->is_correct,
                        ];
                    }),
                ];
            }),
        ];
    }
}
