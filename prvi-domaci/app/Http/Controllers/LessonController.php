<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Course $course)
    {
        $user = $request->user();
        if ($user->type != 'admin' && $user->type != 'teacher') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($user->type === 'teacher' && $course->teacher_id != $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        Lesson::create([
            "course_id" => $course->id,
            'title' => $request->title,
            'content' => $request->content,
            'content_type' => $request->contentType,
        ]);
        return response()->json(new CourseResource($course));
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course, Lesson $lesson)
    {
        $user = $request->user();
        if ($user->type != 'admin' && $user->type != 'teacher') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($user->type === 'teacher' && $course->teacher_id != $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $lesson->update([
            'title' => $request->title,
            'content' => $request->content,
            'content_type' => $request->contentType,
        ]);
        return response()->json(new CourseResource($course));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Course $course, Lesson $lesson)
    {
        $user = $request->user();
        if ($user->type != 'admin' && $user->type != 'teacher') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($user->type === 'teacher' && $course->teacher_id != $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $lesson->delete();
        return response()->noContent();
    }
}
