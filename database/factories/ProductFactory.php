<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(2, true);

        return [
            'category_id' => Category::factory()->create()->id,
            'brand_id' => Brand::factory()->create()->id,
            'name' => $name,
            'slug' => Str::slug($name),
            'overview' => fake()->sentences(15, true),
            'description' => fake()->sentences(30, true),
            'price' => fake()->randomFloat(2, 200, 20000),
            'stock' => fake()->randomNumber(2, true),
            'sold' => fake()->randomNumber(2, true)
        ];
    }
}
