<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->type != 'admin' && $user->type != 'teacher') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $userType = $request->query('type', null);
        $userQuery = User::query();
        if ($userType != null) {
            $userQuery = $userQuery->where('type', $userType);
        }
        return response()->json(UserResource::collection($userQuery->get()));
    }
}
