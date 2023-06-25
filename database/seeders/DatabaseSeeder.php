<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $products = [];

        for ($i = 0; $i < 4; $i++) { 
            $products[] = Product::factory()
                                ->has(ProductImage::factory(6, [
                                        'file' => ""
                                    ])
                                , 'images')
                                ->create();
        }
    }
}
