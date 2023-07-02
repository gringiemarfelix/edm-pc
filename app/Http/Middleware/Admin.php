<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Role;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminRole = Role::where('name', 'Admin')->first();

        $isAdmin = $request->user()->roles()->where('role_id', $adminRole->id)->exists();

        if(!$isAdmin){
            return redirect(route('products.index'));
        }

        return $next($request);
    }
}
