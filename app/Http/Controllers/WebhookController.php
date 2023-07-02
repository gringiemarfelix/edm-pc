<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymongoRequest;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function paymongo(PaymongoRequest $request)
    {
        info($request->all());

        return response('OK');
    }

    public function lalamove()
    {

        return response('OK');
    }
}
