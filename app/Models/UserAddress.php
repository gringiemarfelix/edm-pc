<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAddress extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    // Helpers

    /**
     * Convert to Lalamove Payload
     *
     * @return array
     */
    public function toLalamove(){
        return [
            'coordinates' => [
                'lat' => (string) $this->latitude,
                'lng' => (string) $this->longitude,
            ],
            'address' => $this->address
        ];
    }
}
