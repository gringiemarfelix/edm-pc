<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:M d, Y - h:i:s A',
        'updated_at' => 'datetime:M d, Y - h:i:s A',
    ];

    protected $with = [
        'items'
    ];

    protected $appends = [
        'items_count',
        'total'
    ];

    // Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function lalamove(): HasOne
    {
        return $this->hasOne(Lalamove::class, 'order_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function total(): float
    {
        return $this->items()->sum('total');
    }

    // Attributes

    public function getItemsCountAttribute()
    {
        return $this->items()->count();
    }

    public function getTotalAttribute()
    {
        return $this->items()->sum('total');
    }
}
