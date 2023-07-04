<?php

namespace App\Services;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class OptimizeImage
{
    public function optimize(string $image, string $size = null) {
        $file = Storage::get($image);
        $intervention = Image::make($file);

        if($size == 'logo'){
            $intervention->resize(64, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }else if($size == 'sm'){
            $intervention->resize(400, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }else if ($size == 'md'){
            $intervention->resize(768, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }else if ($size == 'lg'){
            $intervention->resize(1024, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        $intervention->save(storage_path("app/public/$image"), 50);
    }
}