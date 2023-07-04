<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Product;
use App\Models\ProductReview;
use Illuminate\Console\Command;

class InitializeReviews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:reviews';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize Reviews';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $products = Product::get();

        foreach($products as $product){
            User::factory(10)
            ->has(ProductReview::factory()
                            ->state(function () use ($product) {
                                return ['product_id' => $product->id];
                            })
            , 'reviews')
            ->create();
        }

        $this->info('Reviews Initialization Complete');

        return 0;
    }
}
