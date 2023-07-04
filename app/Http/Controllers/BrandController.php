<?php

namespace App\Http\Controllers;

use App\Facades\OptimizeImage;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $brands = collect();

        if($request->filled('search')){
            $brands = Brand::withCount('products')->where('name', 'LIKE', "%{$request->search}%")->get();
        }else{
            $brands = Brand::withCount('products')->get();
        }

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Brands/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $logo = $request->file('logo')->store('brands', 'public');
        OptimizeImage::optimize($logo, 'logo');

        $input = array_merge($request->validated(), [
            'logo' => $logo
        ]);
        
        if(!$request->slug){
            $input = array_merge($input, [
                'slug' => Str::slug($request->name)
            ]);
        }

        Brand::create($input);

        return redirect()->route('admin.brands.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Brand $brand)
    {
        $request->validate([
            'search' => 'string|nullable',
            'page' => 'integer|nullable',
            'per_page' => 'integer|nullable',
        ]);

        $page = $request->input('page', 1);
        $per_page = $request->input('per_page', 20);

        $products = $brand->products()->paginate($per_page);

        $categories = $brand->products->pluck('category_id')->toArray();
        $categories = Category::whereIn('id', $categories)->get();

        return Inertia::render('Products/Search', [
            'query' => $request->query(),
            'page' => $page,
            'categories' => $categories,
            'brands' => [],
            'products' => $products,
            'price_min' => ceil($brand->products()->min('price') / 100) * 100,
            'price_max' => ceil($brand->products()->max('price') / 100) * 100,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $input = $request->validated();

        if($request->file('logo')){
            $logo = $request->file('logo')->store('brands', 'public');
    
            $input = array_merge($request->validated(), [
                'logo' => $logo
            ]);

            OptimizeImage::optimize($logo, 'logo');
        }
        
        if(!$request->slug){
            $input = array_merge($input, [
                'slug' => Str::slug($request->name)
            ]);
        }

        $brand->update($input);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();

        return back();
    }
}
