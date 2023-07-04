<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = collect();

        if($request->filled('search')){
            $categories = Category::withCount('products')->where('name', 'LIKE', "%{$request->search}%")->get();
        }else{
            $categories = Category::withCount('products')->get();
        }

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $input = $request->validated();
        if(!$request->slug){
            $input = array_merge($request->validated(), [
                'slug' => Str::slug($request->name)
            ]);
        }

        Category::create($input);

        return redirect()->route('admin.categories.index');
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

        $brands = $category->products->pluck('brand_id')->toArray();
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
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $input = $request->validated();
        if(!$request->slug){
            $input = array_merge($request->validated(), [
                'slug' => Str::slug($request->name)
            ]);
        }

        $category->update($input);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return back();
    }
}
