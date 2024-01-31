<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // /courses?name=et&teacherId=2
    public function index(Request $request)
    {
        $labels = $request->query('labels', null);
        $teacherId = $request->query('teacherId', null);
        $studentId = $request->query('studentId', null);
        $name = $request->query('name', '');
        $page = $request->query('page', 0);
        $size = $request->query('size', 20);
        $courseIds = [];
        if ($labels != null) {
            $coursLabels = DB::table('course_label')->select('course_id')->where('label_id', 'in', $labels)->get();
            if (sizeof($coursLabels) == 0) {
                return response()->json([
                    "data" => [],
                    "page" => 0,
                    "total" => 0
                ]);
            }
            foreach ($coursLabels as $c) {
                $courseIds[] = $c['course_id'];
            }
        }
        if ($studentId != null) {
            $courseUsers = DB::table('course_user')->select('course_id')->where('user_id', $studentId)->get();
            if (sizeof($courseUsers) == 0) {
                return response()->json([
                    "data" => [],
                    "page" => 0,
                    "total" => 0
                ]);
            }
            foreach ($courseUsers as $c) {
                $courseIds[] = $c['course_id'];
            }
        }
        $query = Course::query();
        if ($studentId != null || $labels != null) {
            $query = $query->where('id', 'in', $courseIds);
        }
        if ($teacherId != null) {
            $query = $query->where('teacher_id', $teacherId);
        }
        if ($name != '') {
            $query = $query->where('name', 'like', $name . '%');
        }
        return response()->json(new CourseCollection($query->paginate($size, ['*'], 'page', $page)));
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
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $course = Course::create([
            "name" => $request->name,
            "description" => $request->description,
            "teacher_id" => $user->type == 'teacher' ? $user->id : $request->teacherId
        ]);
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
        $user = $request->user();
        if (!$course->validateRead($user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
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
        if (!$course->validateForEdit($request->user())) {
            return response()->json(['message' => 'Unauthorized'], 403);
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
        if (!$course->validateForEdit($request->user())) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $course->delete();
        return response()->noContent();
    }
}
