<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = [
        'brand',
        'image'
    ];

    protected $appends = [
        'rating',
        'rating_count'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function image(): HasOne
    {
        return $this->hasOne(ProductImage::class)->oldest();
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    // Attributes

    public function getRatingAttribute()
    {
        return $this->reviews()->avg('rating');
    }

    public function getRatingCountAttribute()
    {
        return $this->reviews()->count();
    }
}
