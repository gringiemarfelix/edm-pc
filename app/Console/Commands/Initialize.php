<?php

namespace App\Console\Commands;

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

        $this->info('Initialization Success.');

        return 0;
    }
}
