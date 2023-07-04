<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Refund;
use App\Http\Requests\UpdateRefundRequest;

class RefundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Refunds/Index', [
            'refunds' => Refund::with('user')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        abort(403);
    }

    /**
     * Display the specified resource.
     */
    public function show(Refund $refund)
    {
        abort(403);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Refund $refund)
    {
        abort(403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRefundRequest $request, Refund $refund)
    {
        $refund->update($request->validated());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Refund $refund)
    {
        abort(403);
    }
}
