<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $active = null;
        switch($request->route()->getName()){
            case 'profile.index':
                $active = 'profile';
                break;
            case 'profile.edit':
                $active = 'edit';
                break;
            case 'profile.security':
                $active = 'security';
                break;
            case 'profile.address':
                $active = 'address';
                break;
            case 'profile.orders':
                $active = 'orders';
                break;
            case 'profile.refunds':
                $active = 'refunds';
                break;
            default:
                $active = null;
        }

        $user = auth()->user();
        $user->load([
            'addresses' => function ($query) {
                $query->orderBy('main', 'desc');
            },
            'orders' => function ($query) {
                $query->orderBy('id', 'desc');
            },
            'refunds' => function ($query) {
                $query->latest();
            },
        ]);

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'confirmed_password' => $request->session()->get('auth.password_confirmed_at'),
            'active' => $active
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
