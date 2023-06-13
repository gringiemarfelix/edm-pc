<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => 'string|nullable',
            'page' => 'integer',
            'per_page' => 'integer'
        ]);

        $data = [
            
        ];

        if($request->wantsJson()){
            return response()->json($data);
        }

        return Inertia::render('Products/Index', $data);
    }

    public function show(Request $request)
    {
        $data = [

        ];

        if($request->wantsJson()){
            return response()->json($data);
        }

        return Inertia::render('Products/Show', $data);
    }
}
