<?php

namespace App\Providers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use Lalamove\Client\V3\Client as LalamoveClient;
use Lalamove\Client\V3\Settings as LalamoveSettings;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(LalamoveClient::class, function (Application $app) {
            return new LalamoveClient(new LalamoveSettings(
                config('lalamove.url'),
                config('lalamove.key'),
                config('lalamove.secret'),
                \Lalamove\Client\V3\Settings::COUNTRY_PHILIPPINES
            ));
        });
    }
}
