<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PublicApiController extends Controller
{
    public function facts()
    {
        $response = Http::get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        $text = $response->json('text', null);
        return response(['fact' => $text]);
    }

    public function books(Request $request)
    {
        $search = $request->query('search', '');
        $page = intval($request->query('page', 1));
        $response = Http::get('https://gutendex.com/books?page=' . $page . "&search=" . $search);
        return response()->json([
            'total' => $response->json('count', 0),
            'hasNext' => $response->json('next', null) != null,
            'hasPrevious' => $response->json('previous', null) != null,
            'data' => $response->json('results', [])
        ]);
    }
}
