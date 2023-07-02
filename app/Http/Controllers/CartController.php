<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lalamove\Client\V3\Client as LalamoveClient;
use Lalamove\Requests\V3\Item;
use Lalamove\Requests\V3\Quotation;
use Lalamove\Requests\V3\Order;
use Lalamove\Requests\V3\Contact;
use Lalamove\Responses\V3\OrderResponse;
use Lalamove\Responses\V3\QuotationResponse;
use Luigel\Paymongo\Facades\Paymongo;

class CartController extends Controller
{
    private $lalamove;

    public function __construct(LalamoveClient $lalamove) {
        $this->lalamove = $lalamove;
    }

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
            'ships_from' => config('branches.main.address'),
            'default_address' => $user->addresses->where('main', 1)->first() ?? $user->addresses->sortByDesc('id')->first()
        ]);
    }

    public function checkout(CheckoutRequest $request)
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
            $user = auth()->user();
            $cartItems = $user->cart()->get();
            
            $order = $user->orders()->create();

            if($request->delivery === 'lalamove'){
                $quotationResponse = $this->createLalamoveQuotation($request);
                $order->lalamove()->create([
                    'quotation' => $quotationResponse->quotationId
                ]);

                $order->delivery = 'lalamove';
                $order->delivery_fee = floatval($quotationResponse->priceBreakdown->total);
                $order->save();
            }

            foreach($cartItems as $cartItem){
                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                    'total' => $cartItem->quantity * $cartItem->product->price,
                ]);
                $cartItem->delete();
            }

            if($request->pay == 'links'){
                $payment = Paymongo::link()->create([
                    'amount' => intval($order->total * 100),
                    'description' => "Payment for {$order->id}",
                    'remarks' => "Payment for {$order->id}"
                ]);
            }else{
                $items = [];
                foreach($order->items as $item){
                    $items[] = [
                        'amount' => intval($item->price * 100),
                        'currency' => 'PHP',
                        'description' => $item->product->brand->name,
                        'name' => $item->product->name,
                        'images' => $item->product->images->pluck('file')->toArray(),
                        'quantity' => $item->quantity
                    ];
                }
                $payment = Paymongo::checkout()->create([
                    'cancel_url' => route('products.index'),
                    'billing' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                    ],
                    'description' => "Payment for {$order->id}",
                    'line_items' => $items,
                    'payment_method_types' => [
                        'atome',
                        'billease',
                        'card',
                        'dob',
                        'dob_ubp',
                        'gcash',
                        'grab_pay', 
                        'paymaya'
                    ],
                    'success_url' => route('cart.checkout.success'),
                    'statement_descriptor' => config('app.name'),
                ]);
            }

            $paymentRecord = $user->payments()->create([
                'id' => $payment->id,
                'type' => $payment->type,
                'url' => $payment->checkout_url
            ]);
            $paymentRecord = $user->payments()->find($payment->id);

            $order->payment_id = $paymentRecord->id;
            $order->save();

            return Inertia::location($paymentRecord->url);

            $response->with('message', 'Checkout success');
        }

        return $response;
    }

    private function createLalamoveQuotation(CheckoutRequest $request): QuotationResponse
    {
        $user = auth()->user();
        $address = $user->addresses()->where('id', $request->address_id)->first()->toLalamove();

        // Build Items
        $item = new Item($user->cart, 'MORE_THAN_3KG', ['OFFICE_ITEM'], ['FRAGILE', 'KEEP_UPRIGHT']);

        // Build Stops
        $stops = [
            config('branches.main'),
            $address,
        ];

        // Build Quotation
        $quotation = new Quotation;

        if($request->lalamove == 'motorcycle'){
            $quotation->serviceType = Quotation::SERVICE_TYPE_MOTORCYCLE;
        }else{
            $quotation->serviceType = Quotation::SERVICE_TYPE_SEDAN;
        }

        $quotation->language = 'en_PH';
        $quotation->setScheduleAt(now()->addMinute());
        $quotation->setItem($item);
        $quotation->addStop($stops);

        return $this->lalamove->quotations()->create($quotation);
    }

    private function createLalamoveOrder(CheckoutRequest $request, QuotationResponse $quotationResponse): OrderResponse
    {
        $user = auth()->user();

        // Build Order
        $sender = new Contact('EDM PC', '+639123456789', $quotationResponse->stops[0]->stopId);
        $receiver = new Contact($user->name, "+63{$user->phone}", $quotationResponse->stops[1]->stopId);
        $order = new Order($quotationResponse->quotationId, $sender, [$receiver]);

        return $this->lalamove->orders()->create($order);
    }

    private function createStandardOrder(CheckoutRequest $request)
    {
        
    }

    public function lalamove(Request $request)
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

        $motorcycle = $this->lalamove->quotations()->create($quotation);
        $car = $this->lalamove->quotations()->create($car);

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

    public function success()
    {
        return Inertia::render('Cart/Success');
    }
}
