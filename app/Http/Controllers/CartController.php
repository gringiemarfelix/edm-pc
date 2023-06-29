<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lalamove\Client\V3\Client as Lalamove;
use Lalamove\Requests\V3\Item;
use Lalamove\Requests\V3\Quotation;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $cart = $user->cart()->get();
        $user->load('addresses');
        $subtotal = 0.00;

        $cart->map(function ($item) use (&$subtotal) {
            $subtotal += $item->product->price * $item->quantity;
        });

        return Inertia::render('Cart/Index', [
            'items' => $cart,
            'subtotal' => $subtotal,
            'ships_from' => config('branches.main.address')
        ]);
    }

    public function checkout()
    {
        $validator = Validator::make([], []);
        $errors = false;

        if(!Gate::allows('cart-has-items')){
            $errors = true;
            $validator->getMessageBag()->add('cart', 'Cart does not have items.');
        }

        if(!Gate::allows('user-has-phone')){
            $errors = true;
            $validator->getMessageBag()->add('phone', 'Please set a phone number before checking out.');
        }

        if(!Gate::allows('user-has-address')){
            $errors = true;
            $validator->getMessageBag()->add('address', 'Please set an address before checking out.');
        }

        $response = back();

        if($errors){
            $response->withErrors($validator);
        }else{
            $response->with('message', 'Checkout success');
        }

        return back();
    }

    public function lalamove(Request $request, Lalamove $lalamove)
    {
        $request->validate([
            'address_id' => 'required|exists:user_addresses,id'
        ]);

        $user = auth()->user();

        $address = $user->addresses()->where('id', $request->address_id)->first()->toLalamove();

        $item = new Item(1, 'MORE_THAN_3KG', ['OFFICE_ITEM'], ['FRAGILE', 'KEEP_UPRIGHT', 'FRAGILE']);
        $stops = [
            config('branches.main'),
            $address,
        ];

        $quotation = new Quotation;
        $quotation->serviceType = Quotation::SERVICE_TYPE_MOTORCYCLE;
        $quotation->language = 'en_PH';
        $quotation->setScheduleAt(now()->addMinute());
        $quotation->setItem($item);
        $quotation->addStop($stops);

        $car = clone $quotation;
        $car->serviceType = Quotation::SERVICE_TYPE_SEDAN;

        $motorcycle = $lalamove->quotations()->create($quotation);
        $car = $lalamove->quotations()->create($car);

        return response()->json([
            'motorcycle' => $motorcycle,
            'car' => $car
        ]);
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
