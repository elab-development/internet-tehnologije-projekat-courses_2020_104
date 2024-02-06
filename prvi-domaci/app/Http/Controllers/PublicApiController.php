<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PublicApiController extends Controller
{
    public function index()
    {
        $response = Http::get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        $text = $response->json('text', null);
        return response(['fact' => $text]);
    }
}
