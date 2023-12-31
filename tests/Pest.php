<?php

use App\Models\Product;
use App\Models\Role;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "uses()" function to bind a different classes or traits.
|
*/

uses(TestCase::class, RefreshDatabase::class)->beforeEach(function () {
    $adminRole = Role::factory()->create([
        'name' => 'Admin'
    ]);
    $customerRole = Role::factory()->create([
        'name' => 'Customer'
    ]);

    $this->admin = User::factory()->create([
        'name' => 'Admin',
        'email' => 'admin@edmpc.com'
    ]);
    
    $this->user = User::factory()->create([
        'name' => 'Customer'
    ]);

    $this->user2 = User::factory()->create([
        'name' => 'Customer 2'
    ]);

    $this->user->roles()->attach($customerRole);
    $this->user2->roles()->attach($customerRole);
    $this->admin->roles()->attach($adminRole);

    $this->product = Product::factory()->create([
        'name' => 'Product'
    ]);
})->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function something()
{
    // ..
}
