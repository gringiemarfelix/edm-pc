<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use App\Http\Requests\StoreUserAddressRequest;
use App\Http\Requests\UpdateUserAddressRequest;

class UserAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserAddressRequest $request)
    {
        $user = auth()->user();

        $user->addresses()->create($request->validated());

        return back()->with('message','Address added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAddress $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserAddress $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserAddress $address)
    {
        $user = auth()->user();

        $user->addresses()
        ->where('id', '!=', $address->id)
        ->update([
            'main' => 0
        ]);

        $address->update([
            'main' => 1
        ]);

        return back()->with('message', 'Address updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAddress $address)
    {
        $user = auth()->user();

        if($address->main){
            $oldest = $user->addresses()->oldest()->first();
            if($oldest){
                $oldest->main = 1;
                $oldest->save();
            }
        }

        $address->delete();

        return back();
    }
}
