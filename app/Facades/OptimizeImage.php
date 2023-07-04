<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static string optimize(string $path, string $size = null, int $quality = 50)
 */
class OptimizeImage extends Facade {
    protected static function getFacadeAccessor() { 
        return 'OptimizeImage'; 
    }
}