<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Lalamove;
use Illuminate\Http\Request;
use Lalamove\Requests\V3\Order;
use Lalamove\Requests\V3\Contact;
use App\Http\Requests\PaymongoRequest;
use Lalamove\Client\V3\Client as LalamoveClient;

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
        
        $event = json_decode(json_encode($request->all()));

        try {
            $orderRecord = Lalamove::findByOrder($event->data->order->orderId)->first()->order()->first();
    
            if($event->eventType == 'ASSIGNING_DRIVER'){
                $orderRecord->status = 'PREPARING';
            }else if($event->eventType == 'DRIVER_ASSIGNED'){
                $orderRecord->status = 'DELIVERING';
            }else if($event->eventType == 'ORDER_STATUS_CHANGED'){
                $status = $event->data->order->status;
                
                if($status == 'PICKED_UP'){
                    $orderRecord->status = 'DELIVERING';
                }else if($status == 'COMPLETED'){
                    $orderRecord->status = 'COMPLETE';
                }else{
                    info('LALAMOVE WEBHOOK: status [else]', [
                        'status' => $status
                    ]);
                }
            }else{
                info('LALAMOVE WEBHOOK: eventType [else]', [
                    'event' => $event
                ]);
            }
    
            $orderRecord->save();
        } catch (\Throwable $th) {
            info('Something went wrong with Lalamove webhook', [
                'payload' => $event,
                'error' => $th
            ]);
        }

        return response('OK');
    }
}
