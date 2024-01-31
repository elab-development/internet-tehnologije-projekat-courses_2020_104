<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Course::factory(20)->create();

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 1
        ]);
        DB::table('course_user')->insert([
            'course_id' => 2,
            'user_id' => 1
        ]);
        DB::table('course_user')->insert([
            'course_id' => 3,
            'user_id' => 1
        ]);
        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 2
        ]);
        DB::table('course_label')->insert([
            'course_id' => 1,
            'label_id' => 1
        ]);
        DB::table('course_label')->insert([
            'course_id' => 2,
            'label_id' => 1
        ]);
        DB::table('course_label')->insert([
            'course_id' => 3,
            'label_id' => 1
        ]);
        DB::table('course_label')->insert([
            'course_id' => 1,
            'label_id' => 2
        ]);
    }
}
