<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\UserAddressController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::name('products.')->controller(ProductController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/products/search', 'search')->name('search');
    Route::get('/products/{product}', 'show')->name('show');
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
        return Inertia::render('Admin/Index');
    })->name('index');

    Route::resources([
        'promotions' => PromotionController::class,
        'categories' => CategoryController::class,
        'brands' => BrandController::class,
        'products' => ProductController::class,
    ]);
    
    Route::name('orders.')->prefix('orders')->controller(OrderController::class)->group(function () {
        Route::get('', 'index')->name('index');
        Route::put('{order}', 'update')->name('update');
    });
    Route::name('refunds.')->prefix('refunds')->controller(OrderController::class)->group(function () {
        Route::get('', 'index')->name('index');
    });
});

require __DIR__.'/auth.php';
