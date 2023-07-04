<?php

namespace App\Http\Controllers;

use App\Facades\OptimizeImage;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;
use App\Models\Promotion;

class ProductController extends Controller
{
    public function home(Request $request)
    {
        $user = auth()->user();
        $wishlist = [];

        if($user){
            $wishlist = $user->wishlist()->get()->pluck('product_id')->toArray();
        }

        $products = Product::get();

        $products->transform(function ($product) use ($wishlist) {
            $product->wishlisted = in_array($product->id, $wishlist);

            return $product;
        });

        return Inertia::render('Products/Index', [
            'promotions' => Promotion::latest()->get(),
            'payments' => $this->getPaymentMethods(),
            'new_products' => $products->sortBy('sold')->take(12)->values(),
            'top_rated' => $products->sortByDesc('rating')->take(12)->values(),
            'top_selling' => $products->sortByDesc('sold')->take(12)->values()
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'search' => 'string|nullable',
            'page' => 'integer|nullable',
            'per_page' => 'integer|nullable',
        ]);

        $page = $request->input('page', 1);
        $per_page = $request->input('per_page', 20);

        $categories = Category::where('name', 'LIKE', "%{$request->search}%")->get();
        $brands = Brand::where('name', 'LIKE', "%{$request->search}%")->get();

        $products = Product::where('name', 'LIKE', "%{$request->search}%");

        if($request->filled('price')){
            $products->where('price', '<=', $request->price);
        }

        if($request->filled('categories')){
            $products->whereIn('category_id', $request->categories);
        }
        
        if($request->filled('brands')){
            $products->whereIn('brand_id', $request->brands);
        }

        if($request->filled('sort')){
            if($request->sort == 'high'){
                $products->orderBy('price', 'desc');
            }else if($request->sort == 'low'){
                $products->orderBy('price', 'asc');
            }else{
                $products->orderBy('name', 'asc');
            }
        }

        $products = $products->paginate($per_page)->withQueryString();

        return Inertia::render('Products/Search', [
            'query' => $request->query(),
            'page' => $page,
            'categories' => $categories,
            'brands' => $brands,
            'products' => $products,
            'price_min' => ceil(Product::where('name', 'LIKE', "%{$request->search}%")->min('price') / 100) * 100,
            'price_max' => ceil(Product::where('name', 'LIKE', "%{$request->search}%")->max('price') / 100) * 100,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with('category')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::get(),
            'brands' => Brand::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $input = $request->safe()->except(['images']);
        if(!$request->slug){
            $input = array_merge($request->safe()->except(['images']), [
                'slug' => Str::slug($request->name)
            ]);
        }
        $product = Product::create($input);

        if(!is_null($request->file('images')) && count($request->file('images'))){
            foreach($request->file('images') as $image){
                $file = $image->store('products/images', 'public');
                
                $product->images()->create([
                    'file' => $file
                ]);

                OptimizeImage::optimize($file, 'sm');
            }
        }

        return redirect()->route('admin.products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Product $product)
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
            'images',
            'reviews' => function ($query) use ($request) {
                if($request->filled('filter')){
                    switch($request->filter){
                        case 'date':
                            $query->orderBy('created_at', 'DESC');
                            break;
                        case '5':
                            $query->where('rating', '5');
                            break;
                        case '4':
                            $query->where('rating', '4');
                            break;
                        case '3':
                            $query->where('rating', '3');
                            break;
                        case '2':
                            $query->where('rating', '2');
                            break;
                        case '1':
                            $query->where('rating', '1');
                            break;
                        default:
                            $query->orderBy('created_at', 'DESC');
                        }
                }else{
                    $query->orderBy('created_at', 'DESC');
                }
            }
        ]);

        if($request->wantsJson()){
            return response()->json($product);
        }

        return Inertia::render('Products/Show', [
            'product' => $product,
            'similar' => Product::where('name', 'LIKE', "%{$product->name}%")->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'categories' => Category::get(),
            'brands' => Brand::get(),
            'product' => $product->load('images')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $input = $request->safe()->except(['images']);
        if(!$request->slug){
            $input = array_merge($request->safe()->except(['images']), [
                'slug' => Str::slug($request->name)
            ]);
        }
        $product->update($input);

        if(!is_null($request->file('images')) && count($request->file('images'))){
            foreach($request->file('images') as $image){
                $file = $image->store('products/images', 'public');
                
                $product->images()->create([
                    'file' => $file
                ]);

                OptimizeImage::optimize($file, 'sm');
            }
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return back();
    }

    /**
     * Delete ProductImage
     */
    public function destroyImage(Product $product, ProductImage $productImage)
    {
        $productImage->delete();

        return back();
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
