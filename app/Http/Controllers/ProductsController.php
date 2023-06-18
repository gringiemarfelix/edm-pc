<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => 'string|nullable',
            'page' => 'integer',
            'per_page' => 'integer'
        ]);

        $data = [
            'payments' => $this->getPaymentMethods()
        ];

        if($request->wantsJson()){
            return response()->json($data);
        }

        return Inertia::render('Products/Index', $data);
    }

    public function show(Request $request)
    {
        $data = [

        ];

        if($request->wantsJson()){
            return response()->json($data);
        }

        return Inertia::render('Products/Show', $data);
    }

    private function getPaymentMethods()
    {
        $payments = [
            [
                'name' => 'Cards',
                'items' => [
                    asset('img/payments/visa.svg'),
                    asset('img/payments/mastercard.svg'),
                ]
            ],
            [
                'name' => 'E-Wallets',
                'items' => [
                    asset('img/payments/gcash.png'),
                    asset('img/payments/grab-pay.png'),
                    asset('img/payments/maya.png'),
                ]
            ],
            [
                'name' => 'Online Banking',
                'items' => [
                    asset('img/payments/bpi.png'),
                    asset('img/payments/unionbank.png'),
                ]
            ],
            [
                'name' => 'Buy Now, Pay Later',
                'items' => [
                    asset('img/payments/billease.svg')
                ]
            ],
            [
                'name' => 'Over-the-Counter',
                'items' => [
                    asset('img/payments/coins-ph.png'),
                    asset('img/payments/7-eleven.png'),
                    asset('img/payments/m-lhuillier.png'),
                    asset('img/payments/cebuana-lhuillier.png'),
                ]
            ],
        ];

        return $payments;
    }
}
