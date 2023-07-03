<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Relationships

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'brand_id');
    }

    // Attributes

    public function getLogoAttribute($logo)
    {
        return asset("storage/{$logo}");
    }
}
