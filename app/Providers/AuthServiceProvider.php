<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Policies\CartPolicy;
use App\Models\Cart;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\Wishlist;
use App\Policies\UserAddressPolicy;
use App\Policies\WishlistPolicy;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Cart::class => CartPolicy::class,
        Wishlist::class => WishlistPolicy::class,
        UserAddress::class => UserAddressPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('cart-has-items', function (User $user) {
            return $user->cart->count() > 1
                    ? Response::allow() 
                    : Response::deny();
        });
    }
}
