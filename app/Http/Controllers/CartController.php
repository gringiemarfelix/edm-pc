<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = auth()->user()->cart;

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
    public function store(StoreCartRequest $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
