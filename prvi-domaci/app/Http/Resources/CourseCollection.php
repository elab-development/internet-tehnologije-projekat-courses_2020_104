<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CourseCollection extends ResourceCollection
{
    public $collects = CourseItemResource::class;
    public function toArray($request)
    {
        return [
            "data" => $this->collection,
            'page' => $this->currentPage(),
            "total" => $this->total()
        ];
    }
}
