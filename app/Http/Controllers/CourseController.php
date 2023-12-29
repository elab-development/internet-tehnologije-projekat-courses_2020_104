<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->type != 'admin' && $user->type != 'teacher') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $course = Course::create($request->all());
        return response()->json(new CourseResource($course));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Course $course)
    {
        $user = $request->user;
        if ($user->type == 'student') {
            foreach ($course->users as $courseUser) {
                if ($courseUser->id == $user->id) {
                    return response()->json(new CourseResource($course));
                }
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        if (!$this->validateCourseAccess($request, $course)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return response()->json(new CourseResource($course));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)
    {
        if (!$this->validateCourseAccess($request, $course)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $course->update($request->all());
        return response()->json(new CourseResource($course));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Course $course)
    {
        if (!$this->validateCourseAccess($request, $course)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $course->delete();
        return response()->noContent();
    }

    private function validateCourseAccess(Request $request, Course $course)
    {
        $user = $request->user();
        return $user->type == 'admin' || ($user->type == 'teacher' && $course->teacher_id == $user->id);
    }
}
