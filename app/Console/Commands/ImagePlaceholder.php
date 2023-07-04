<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\ProductImage;
use Illuminate\Console\Command;

class ImagePlaceholder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'placeholder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Placeholder for Images';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Brand::where('logo', '')->update([
            'logo' => 'img/placeholder.svg'
        ]);

        ProductImage::where('file', '')->update([
            'file' => 'img/placeholder.svg'
        ]);

        $this->info('Placeholder set');

        return 0;
    }
}
