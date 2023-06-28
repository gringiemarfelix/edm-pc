<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Category $category)
    {
        $request->validate([
            'search' => 'string|nullable',
            'page' => 'integer|nullable',
            'per_page' => 'integer|nullable',
        ]);

        $page = $request->input('page', 1);
        $per_page = $request->input('per_page', 20);

        $products = $category->products()->paginate($per_page);

        $brands = $category->products->pluck('category_id')->toArray();
        $brands = Brand::whereIn('id', $brands)->get();

        return Inertia::render('Products/Search', [
            'query' => $request->query(),
            'page' => $page,
            'categories' => [],
            'brands' => $brands,
            'products' => $products,
            'price_min' => ceil($category->products()->min('price') / 100) * 100,
            'price_max' => ceil($category->products()->max('price') / 100) * 100,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
