<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function show(Order $order)
    {
        Gate::authorize('view', $order);
        
        return response()->json($order);
    }

    public function items(Order $order)
    {
        Gate::authorize('view', $order);

        $user = auth()->user();

        $order->load([
            'items.product.reviews' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }
        ]);
        
        return response()->json($order->items);
    }

    public function pendingCount()
    {
        return Order::whereIn('status', [
            'PLACED',
            'PREPARING',
            'DELIVERING',
        ])->count();
    }
}
