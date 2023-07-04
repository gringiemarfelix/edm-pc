<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class InitializeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $adminRole = Role::firstOrCreate([
            'name' => 'Admin'
        ]);

        $password = 'EDM_@dmin!';

        $admin = User::firstOrCreate([
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@edmpc.com',
            'password' => Hash::make($password)
        ]);
        $admin->id = 0;
        $admin->save();

        $admin->roles()->attach($adminRole);

        $this->info($admin->name);

        return Command::SUCCESS;
    }
}
