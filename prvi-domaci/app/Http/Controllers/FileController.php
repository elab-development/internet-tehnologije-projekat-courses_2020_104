<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function uploadFile(Request $request)
    {
        $user = $request->user();
        error_log($user->type);
        if ($user->type != 'admin' && $user->type != 'teacher') {
            return response()->json(["message" => "Missing permissions"], 403);
        }


        $fileName = $request->file('file')->store('local');
        return response()->json(['fileName' => $fileName]);
    }

    public function getFile(Request $request, $lessonId)
    {
        $lesson = Lesson::find($lessonId);
        $course = $lesson->course;
        if (!$course->validateRead($request->user())) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response(Storage::disk('local')->get($lesson->content));
    }
}
