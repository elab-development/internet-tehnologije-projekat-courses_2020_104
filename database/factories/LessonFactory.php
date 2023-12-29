<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'content' => $this->faker->realText,
            'course_id' => Course::factory(),
            'content_type' => 'text'
        ];
    }
}
