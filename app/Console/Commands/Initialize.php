<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class Initialize extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize everything.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Artisan::call('init:admin');
        Artisan::call('init:categories');
        Artisan::call('init:products');
        Artisan::call('init:reviews');

        $this->cleanupCategories();

        $this->info('Initialization Success.');

        return 0;
    }

    private function cleanupCategories()
    {
        $categories = [
            'CPU',
            'Motherboard',
            'GPU',
            'RAM',
            'Storage',
            'Display',
            'Case',
            'Fans',
            'Laptops',
            'Desktops',
        ];

        Category::whereNotIn('name', $categories)->delete();
    }
}
