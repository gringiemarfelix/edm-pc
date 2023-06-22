<?php

use App\Models\Role;
use App\Models\User;

test('role', function () {
    User::factory()
    ->has(Role::factory())
    ->create();

    $this->assertDatabaseHas('role_user', [
        'user_id' => 1,
        'role_id' => 1
    ]);
});

test('attach role', function () {
    $user = User::factory()->create();
    $role = Role::factory()->create();

    $user->roles()->attach($role);

    $this->assertDatabaseHas('role_user', [
        'user_id' => 1,
        'role_id' => 1
    ]);
});
