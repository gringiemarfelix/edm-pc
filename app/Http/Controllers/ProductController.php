<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $wishlist = [];

        $request->validate([
            'search' => 'string|nullable',
            'page' => 'integer',
            'per_page' => 'integer'
        ]);

        if($user){
            $wishlist = $user->wishlist()->get()->pluck('product_id')->toArray();
        }

        $products = Product::get();

        $products->transform(function ($product) use ($wishlist) {
            $product->wishlisted = in_array($product->id, $wishlist);

            return $product;
        });

        $data = [
            'payments' => $this->getPaymentMethods(),
            'products' => $products
        ];

        return Inertia::render('Products/Index', $data);
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
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $user = auth()->user();
        $wishlist = [];

        if($user){
            $wishlist = $user->wishlist()->get()->pluck('product_id')->toArray();
        }

        $product->wishlisted = in_array($product->id, $wishlist);

        $product->load([
            'category',
            'brand',
            'images'
        ]);

        return Inertia::render('Products/Show', [
            'product' => $product,
            'similar' => Product::get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    private function getPaymentMethods()
    {
        $payments = [
            [
                'name' => 'Cards',
                'items' => [
                    asset('img/payments/visa.svg'),
                    asset('img/payments/mastercard.svg'),
                ]
            ],
            [
                'name' => 'E-Wallets',
                'items' => [
                    asset('img/payments/gcash.png'),
                    asset('img/payments/grab-pay.png'),
                    asset('img/payments/maya.png'),
                ]
            ],
            [
                'name' => 'Online Banking',
                'items' => [
                    asset('img/payments/bpi.png'),
                    asset('img/payments/unionbank.png'),
                ]
            ],
            [
                'name' => 'Buy Now, Pay Later',
                'items' => [
                    asset('img/payments/billease.svg')
                ]
            ],
            [
                'name' => 'Over-the-Counter',
                'items' => [
                    asset('img/payments/coins-ph.png'),
                    asset('img/payments/7-eleven.png'),
                    asset('img/payments/m-lhuillier.png'),
                    asset('img/payments/cebuana-lhuillier.png'),
                ]
            ],
        ];

        return $payments;
    }
}
