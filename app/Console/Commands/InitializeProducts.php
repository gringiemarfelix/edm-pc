<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Console\Command;

class InitializeProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize Products';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $categories = Category::get();

        foreach($categories as $category){
            Product::factory(5, [
                'category_id' => $category->id
            ])
            ->has(Brand::factory()->state(function () {
                return ['logo' => ''];
            }), 'brand')
            ->has(ProductImage::factory(6)->state(function () {
                return ['file' => ''];
            })
            , 'images')
            ->create();
        }

        $this->info('Products Initialization Complete');

        return 0;
    }
}
