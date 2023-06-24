<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = auth()->user()->cart()->get();

        return Inertia::render('Cart/Index', [
            'items' => $cart
        ]);
    }

    public function checkout()
    {
        Gate::authorize('cart-has-items');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Product $product)
    {
        $validator = Validator::make([], []);

        $user = auth()->user();
        $message = "Added to cart successfully";
        $error = false;

        if($product->stock == 0){
            $error = "{$product->name} is out of stock.";
            $validator->getMessageBag()->add('product_id', $error);
        }

        $cart = $user->cart()->where('product_id', $product->id)->first();

        if(!$cart){
            $cart = $user->cart()->create([
                'product_id' => $product->id
            ]);
        }else{
            if($cart->quantity < $product->stock){
                $cart->increment('quantity', 1);
            }else{
                $error = "Added maximum quantity of {$product->name}.";
                $validator->getMessageBag()->add('product_id', $error);
            }
        }

        $response = back();

        if($error){
            $response->withErrors($validator);
        }else{
            $response->with('message', $message);
        }
        
        return $response;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        if($request->action == 'increment' && ($cart->quantity + 1) <= $cart->product->stock){
            $cart->increment('quantity', 1);
        }else if($request->action == 'decrement' && ($cart->quantity - 1) != 0){
            $cart->decrement('quantity', 1);
        }else{
            abort(422, 'Something is wrong with your request');
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return back();
    }
}
