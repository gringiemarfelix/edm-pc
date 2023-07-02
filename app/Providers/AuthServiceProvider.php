<?php

namespace App\Providers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Order;
use App\Models\Wishlist;
use App\Models\UserAddress;
use App\Policies\CartPolicy;
use App\Policies\OrderPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\WishlistPolicy;
use App\Policies\UserAddressPolicy;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

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
        UserAddress::class => UserAddressPolicy::class,
        Payment::class => PaymentPolicy::class,
        Order::class => OrderPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('cart-has-items', function (User $user) {
            return $user->cart()->count() > 0
                    ? Response::allow() 
                    : Response::deny();
        });
        Gate::define('user-has-phone', function (User $user) {
            return $user->phone != null
                    ? Response::allow() 
                    : Response::deny();
        });
        Gate::define('user-has-address', function (User $user) {
            return $user->addresses()->count() > 0
                    ? Response::allow() 
                    : Response::deny();
        });

        $this->registerPolicies();
    }
}
