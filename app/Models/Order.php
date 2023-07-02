<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $with = [
        'items',
        'lalamove',
        'payment'
    ];

    protected $appends = [
        'items_count',
        'total'
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('M d, Y - h:i A');
    }

    // Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id');
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
