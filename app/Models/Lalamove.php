<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Lalamove extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Scopes
    public function scopeFindByOrder(Builder $query, string $order): void
    {
        $query->where('order', $order);
    }

    // Relationships

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
