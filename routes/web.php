<?php

use Inertia\Inertia;
use App\Models\{
    User,
    Brand,
    Order,
    Product,
};
use App\Http\Controllers\{
    CartController,
    BrandController,
    OrderController,
    ProductController,
    ProfileController,
    WebhookController,
    CategoryController,
    WishlistController,
    PromotionController,
    UserAddressController,
    ProductReviewController,
    RefundController,
};
use App\Http\Requests\HelpRequest;
use Illuminate\Support\Facades\Route;

Route::name('products.')->controller(ProductController::class)->group(function () {
    Route::get('/', 'home')->name('index');
    Route::get('/products/search', 'search')->name('search');
    Route::get('/products/{product:slug}', 'show')->name('show');
});

Route::name('products.reviews.')->prefix('products/reviews')->controller(ProductReviewController::class)->group(function () {
    Route::post('{product}', 'store')->name('store');
    Route::put('{productReview}', 'update')->name('update');
    Route::delete('{productReview}', 'destroy')->name('destroy');
});

Route::name('brands.')->controller(BrandController::class)->group(function () {
    Route::get('/brands/{brand:slug}', 'show')->name('show');
});

Route::name('categories.')->controller(CategoryController::class)->group(function () {
    Route::get('/categories/{category:slug}', 'show')->name('show');
});

Route::name('cart.')->prefix('cart')->middleware('auth')->controller(CartController::class)->group(function () {
    // Checkout
    Route::post('checkout', 'checkout')->name('checkout');
    Route::get('checkout/success', 'success')->name('checkout.success');

    // Lalamove
    Route::get('lalamove', 'lalamove')->name('lalamove');

    Route::get('', 'index')->name('index');
    Route::get('success', 'success')->name('success');
    Route::post('{product}', 'store')->name('store');
    Route::put('{cart}', 'update')->name('update');
    Route::delete('{cart}', 'destroy')->name('destroy');
});

Route::name('wishlist.')->prefix('wishlist')->middleware('auth')->controller(WishlistController::class)->group(function () {
    Route::get('', 'index')->name('index');
    Route::post('', 'storeAll')->name('storeAll');
    Route::post('{product}', 'store')->name('store');
    Route::delete('{product}', 'destroy')->name('destroy');
});

Route::name('profile.')->prefix('profile')->middleware('auth')->controller(ProfileController::class)->group(function () {
    Route::get('', 'edit')->name('index');
    Route::get('edit', 'edit')->name('edit');
    Route::get('security', 'edit')->name('security');
    Route::get('address', 'edit')->name('address');
    Route::get('orders', 'edit')->name('orders');
    Route::get('refunds', 'edit')->name('refunds');
    Route::patch('', 'update')->name('update');
    Route::delete('', 'destroy')->name('destroy');
});

Route::name('orders.')->prefix('orders')->controller(OrderController::class)->group(function () {
    Route::get('pending', 'pendingCount')->name('pending_count');
    
    Route::get('{order}', 'show')->name('show');
    Route::get('{order}/items', 'items')->name('items');
});

Route::name('address.')->prefix('profile/address/edit')->middleware('auth')->controller(UserAddressController::class)->group(function () {
    Route::post('', 'store')->name('store');
    Route::get('', 'index')->name('index');
    Route::patch('{address}', 'update')->name('update');
    Route::delete('{address}', 'destroy')->name('destroy');
});

Route::name('webhooks.')->prefix('webhooks')->controller(WebhookController::class)->group(function () {
    Route::post('paymongo', 'paymongo')->name('paymongo');
    Route::post('lalamove', 'lalamove')->name('lalamove');
});

Route::name('admin.')->prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('', function () {
        return Inertia::render('Admin/Index', [
            'users' => User::count(),
            'orders' => Order::count(),
            'products' => Product::count(),
            'brands' => Brand::count()
        ]);
    })->name('index');

    Route::post('promotions/{promotion}', [PromotionController::class, 'update'])->name('promotions.update');
    Route::post('brands/{brand}', [BrandController::class, 'update'])->name('brands.update');
    Route::post('products/{product}', [ProductController::class, 'update'])->name('products.update');

    Route::delete('products/{product}/images/{productImage}', [ProductController::class, 'destroyImage'])->name('products.images.destroy');

    Route::resources([
        'promotions' => PromotionController::class,
        'categories' => CategoryController::class,
        'brands' => BrandController::class,
        'products' => ProductController::class,
        'refunds' => RefundController::class,
    ]);
    
    Route::name('orders.')->prefix('orders')->controller(OrderController::class)->group(function () {
        Route::get('', 'index')->name('index');
        Route::put('{order}', 'update')->name('update');
    });

    Route::name('refunds.')->prefix('refunds')->controller(RefundController::class)->group(function () {
        Route::get('', 'index')->name('index');
        Route::put('{refund}', 'update')->name('update');
    });
});

Route::get('help', fn () => Inertia::render('Help'))->name('help');
Route::post('help', fn (HelpRequest $request) => back())->name('help');

Route::get('present', fn () => Inertia::render('Present'))->name('present');

require __DIR__.'/auth.php';
