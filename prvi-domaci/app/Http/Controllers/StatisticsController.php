<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function labelsStatistics(Request $request)
    {
        $user = $request->user();
        if ($user->type != 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $res = DB::table('courses', 'c')
            ->leftJoin('course_user', 'course_user.course_id', '=', 'c.id')
            ->join('course_label', 'course_label.course_id', '=', 'c.id')
            ->join('labels', 'labels.id', '=', 'course_label.label_id')
            ->select('labels.id', 'labels.name', DB::raw('COUNT(course_user.user_id) as users'))
            ->groupBy('labels.id', 'labels.name')
            ->orderBy('users', 'desc')
            ->get();
        return response()->json($res);
    }
    public function coursesStatistics(Request $request)
    {
        $user = $request->user();
        if ($user->type != 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $res = DB::table('courses', 'c')
            ->leftJoin('course_user', 'course_user.course_id', '=', 'c.id')
            ->select('c.id', 'c.name', DB::raw('COUNT(course_user.user_id) as users'))
            ->groupBy('c.id', 'c.name')
            ->orderBy('users', 'desc')
            ->get();
        return response()->json($res);
    }
}
