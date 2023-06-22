<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Console\Command;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:make {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make user an admin.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::find($this->argument('id'));

        if(!$user){
            $this->error('User not found');
            return Command::FAILURE;
        }

        $admin = Role::firstOrCreate([
            'name' => 'Admin'
        ]);

        $user->roles()->attach($admin);

        $pivotCreated = RoleUser::where('user_id', $user->id)->where('role_id', $admin->id)->count();

        if($pivotCreated){
            $this->info("Made {$user->id} - {$user->name} an admin");
        }else{
            $this->error('Failed to make admin.');
        }

        return Command::SUCCESS;
    }
}
