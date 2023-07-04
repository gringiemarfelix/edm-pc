<?php

namespace App\Providers;

use App\Services\OptimizeImage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;
use Lalamove\Client\V3\Client as LalamoveClient;
use Lalamove\Client\V3\Settings as LalamoveSettings;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('OptimizeImage', function () {
            return new OptimizeImage;
        });
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
