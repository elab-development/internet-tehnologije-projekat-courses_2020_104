<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PublicApiController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('labels', [LabelController::class, 'index']);
Route::get('courses', [CourseController::class, 'index']);

Route::get('fact', [PublicApiController::class, 'facts']);
Route::get('books', [PublicApiController::class, 'books']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::get('users', [UserController::class, 'index']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('upload', [FileController::class, 'uploadFile']);
    Route::get('lessons/{id}/file', [FileController::class, 'getFile']);
    Route::apiResource('courses', CourseController::class)->only(['show', 'store', 'update', 'destroy']);
    Route::apiResource('courses.lessons', LessonController::class)->only(['store', 'update', 'destroy']);
    Route::put('courses/{id}/students', [CourseController::class, 'updateStudents']);
    Route::get('course-statistics', [StatisticsController::class, 'coursesStatistics']);
    Route::get('label-statistics', [StatisticsController::class, 'labelsStatistics']);
});
