<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReview;
use App\Http\Requests\ProductReviewRequest;
use App\Http\Requests\StoreProductReviewRequest;
use App\Http\Requests\UpdateProductReviewRequest;

class ProductReviewController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductReviewRequest $request, Product $product)
    {
        $user = auth()->user();

        $input = array_merge($request->validated(), [
            'user_id' => $user->id
        ]);

        $product->reviews()->create($input);

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductReviewRequest $request, ProductReview $productReview)
    {
        $productReview->update($request->validated());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductReview $productReview)
    {
        $productReview->delete();

        return back();
    }
}
