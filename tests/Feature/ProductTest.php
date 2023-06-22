<?php

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;

test('create product', function () {
    Category::truncate();
    Brand::truncate();
    Product::truncate();
    ProductImage::truncate();

    $product = Product::factory()
                        ->has(ProductImage::factory()->count(6), 'images')
                        ->create();

    $this->assertDatabaseCount('brands', 1);
    $this->assertDatabaseCount('categories', 1);
    $this->assertDatabaseCount('products', 1);
    $this->assertDatabaseCount('product_images', 6);
});
