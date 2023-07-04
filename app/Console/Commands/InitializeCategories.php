<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;

class InitializeCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize Categories';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $categories = [
            [
                'name' => 'CPU',
                'slug' => 'cpu'
            ],
            [
                'name' => 'Motherboard',
                'slug' => 'motherboard'
            ],
            [
                'name' => 'GPU',
                'slug' => 'gpu'
            ],
            [
                'name' => 'RAM',
                'slug' => 'ram'
            ],
            [
                'name' => 'Storage',
                'slug' => 'storage'
            ],
            [
                'name' => 'Display',
                'slug' => 'display'
            ],
            [
                'name' => 'Case',
                'slug' => 'case'
            ],
            [
                'name' => 'Fans',
                'slug' => 'fans'
            ],
            [
                'name' => 'Laptops',
                'slug' => 'laptop'
            ],
            [
                'name' => 'Desktops',
                'slug' => 'desktop'
            ],
        ];

        foreach($categories as $category){
            Category::firstOrCreate($category);
        }
    }
}
