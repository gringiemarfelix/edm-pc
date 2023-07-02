<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function show(Order $order)
    {
        return response()->json($order);
    }

    public function items(Order $order)
    {
        return response()->json($order->items);
    }
}
