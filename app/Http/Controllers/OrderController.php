<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with('user')->withCount('items')->latest()->get()
        ]);
    }

    public function show(Order $order)
    {
        Gate::authorize('view', $order);
        
        return response()->json($order);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => [
                'required',
                'string',
                Rule::in([
                    'PENDING_PAYMENT',
                    'PLACED',
                    'PREPARING',
                    'DELIVERING',
                    'COMPLETE',
                    'FAILED',
                    'CANCELLED',
                ])
            ]
        ]);

        $order->update([
            'status' => $request->status
        ]);

        return back();
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
