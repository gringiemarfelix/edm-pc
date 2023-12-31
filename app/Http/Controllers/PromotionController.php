<?php

namespace App\Http\Controllers;

use App\Facades\OptimizeImage;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Promotion;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Promotions/Index', [
            'promotions' => Promotion::get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Promotions/Create', [
            'products' => Product::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromotionRequest $request)
    {
        $image = $request->file('image')->store('promotions', 'public');

        Promotion::create([
            'product_id' => $request->product_id,
            'title' => $request->title,
            'description' => $request->description,
            'image' => $image,
        ]);

        OptimizeImage::optimize($image);

        return redirect()->route('admin.promotions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        return response('NULL', 403);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        return Inertia::render('Admin/Promotions/Edit', [
            'promotion' => $promotion,
            'products' => Product::latest()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromotionRequest $request, Promotion $promotion)
    {
        $new = [
            'product_id' => $request->product_id,
            'title' => $request->title,
            'description' => $request->description,
        ];

        if($request->file('image')){
            $image = $request->file('image')->store('promotions', 'public');
            $new['image'] = $image;

            OptimizeImage::optimize($image);
        }

        $promotion->update($new);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        $promotion->delete();

        return back();
    }
}
