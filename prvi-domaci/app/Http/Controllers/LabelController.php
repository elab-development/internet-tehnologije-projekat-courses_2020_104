<?php

namespace App\Http\Controllers;

use App\Http\Resources\LabelResource;
use App\Models\Label;

class LabelController extends Controller
{
    public function index()
    {
        return response()->json(LabelResource::collection(Label::all()));
    }
}
