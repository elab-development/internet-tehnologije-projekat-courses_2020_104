<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Label;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            LabelSeeder::class,
            CourseSeeder::class,
            LessonSeeder::class
        ]);
    }
}
