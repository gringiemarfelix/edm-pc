<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wishlist = auth()->user()->wishlist()->get();

        return Inertia::render('Wishlist/Index', [
            'items' => $wishlist
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Product $product)
    {
        $user = auth()->user();

        $item = $user->wishlist()->where('product_id', $product->id)->first();

        if(!$item){
            $item = $user->wishlist()->create([
                'product_id' => $product->id
            ]);
        }

        return back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeAll()
    {
        $user = auth()->user();

        $cart = $user->cart()->get()->pluck('product_id')->toArray();
        $wishlist = $user->wishlist()->get()->pluck('product_id')->toArray();

        $toAdd = array_diff($wishlist, $cart);

        foreach($toAdd as $product_id){
            $user->cart()->create([
                'product_id' => $product_id
            ]);
        }

        $count = count($toAdd);

        return back()->with('message', "Added {$count} items to the cart.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $user = auth()->user();

        $item = $user->wishlist()->where('product_id', $product->id)->first();

        if($item){
            $item->delete();
        }

        return back();
    }
}
