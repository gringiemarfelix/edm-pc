<?php

use App\Http\Controllers\BrandController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistController;

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

Route::name('cart.')->prefix('cart')->middleware('auth')->controller(CartController::class)->group(function () {
    Route::get('', 'index')->name('index');
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

Route::name('profile.')->prefix('profile')->middleware('auth')->group(function () {
    Route::get('', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('', [ProfileController::class, 'update'])->name('update');
    Route::delete('', [ProfileController::class, 'destroy'])->name('destroy');
});

require __DIR__.'/auth.php';
