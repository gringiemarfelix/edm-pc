<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Requests\PaymongoRequest;
use Lalamove\Client\V3\Client as LalamoveClient;
use Lalamove\Requests\V3\Quotation;
use Lalamove\Requests\V3\Order;
use Lalamove\Requests\V3\Contact;

class WebhookController extends Controller
{
    private $lalamove;

    public function __construct(LalamoveClient $lalamove) {
        $this->lalamove = $lalamove;
    }

    public function paymongo(PaymongoRequest $request)
    {
        $paymentPayload = json_decode(json_encode($request->input('data.attributes.data')));

        try {
            $payment = Payment::find($paymentPayload->id);
            $payment->status = $paymentPayload->attributes->status;
            $payment->save();
    
            // Update Order Status
            $order = $payment->order;
            $order->status = 'PLACED';
            $order->save();
    
            $user = $order->user;
    
            $quotationResponse = $this->lalamove->quotations()->get($order->lalamove->quotation);
    
            // Build Order
            $sender = new Contact('EDM PC', '+639123456789', $quotationResponse->stops[0]->stopId);
            $receiver = new Contact($user->name, "+63{$user->phone}", $quotationResponse->stops[1]->stopId);
            $lalamoveOrder = new Order($quotationResponse->quotationId, $sender, [$receiver]);
    
            $orderResponse = $this->lalamove->orders()->create($lalamoveOrder);

            // Save Order ID to Database
            $lalamoveRecord = $order->lalamove;
            $lalamoveRecord->order = $orderResponse->orderId;
            $lalamoveRecord->share_link = $orderResponse->shareLink;
            $lalamoveRecord->save();
        } catch (\Throwable $th) {
            info('Something went wrong with Paymongo Webhook', [
                'payload' => json_encode($request->all(), JSON_PRETTY_PRINT)
            ]);
        }

        return response('OK');
    }

    public function lalamove(Request $request)
    {
        info(json_encode($request->all(), JSON_PRETTY_PRINT));

        return response('OK');
    }
}
