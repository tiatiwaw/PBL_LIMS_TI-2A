<?php

namespace App\Http\Controllers\API\V1\Payment;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TripayCallbackController extends Controller
{
    protected $privateKey = '3EcNo-m2eTv-vAnh0-QArH5-rfImw';

    public function handle(Request $request)
    {
        $callbackSignature = $request->server('HTTP_X_CALLBACK_SIGNATURE');
        $json = $request->getContent();
        $signature = hash_hmac('sha256', $json, $this->privateKey);

        if ($signature !== (string) $callbackSignature) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid signature',
            ]);
        }

        if ('payment_status' !== (string) $request->server('HTTP_X_CALLBACK_EVENT')) {
            return response()->json([
                'success' => false,
                'message' => 'Unrecognized callback event, no action was taken',
            ]);
        }

        $data = json_decode($json);

        if (JSON_ERROR_NONE !== json_last_error()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid data sent by tripay',
            ]);
        }

        $transactionId = $data->merchant_ref;
        $reference = $data->reference;
        $status = strtoupper((string) $data->status);

        if ($data->is_closed_payment === 1) {
            $transaction = Transaction::where('reference', $reference)
                ->where('status', '=', 'UNPAID')
                ->first();

            if (! $transaction) {            
                return response()->json([
                    'success' => false,
                    'message' => 'No transaction found or already paid: ' . $transactionId,
                ]);
            }

            switch ($status) {
                case 'PAID':
                    $transaction->update(['status' => 'PAID']);

                    $this->updateOrderStatusToInProgress($transaction);
                    break;

                case 'EXPIRED':
                    $transaction->update(['status' => 'UNPAID']);
                    break;

                case 'FAILED':
                    $transaction->update(['status' => 'UNPAID']);
                    break;

                default:                
                    return response()->json([
                        'success' => false,
                        'message' => 'Unrecognized payment status',
                    ]);
            }
            return response()->json(['success' => true]);
        }
            
        return response()->json([
            'success' => true,
            'message' => 'Callback received, payment still open',
        ]);
    }

    private function updateOrderStatusToInProgress($transaction)
    {
        try {
            $nAnalysesMethodOrder = $transaction->n_analyses_methods_order;
            
            if (!$nAnalysesMethodOrder) {
                logger()->warning('NAnalysesMethodsOrder not found for transaction: ' . $transaction->id);
                return;
            }
            
            $order = $nAnalysesMethodOrder->order;
            
            if (!$order) {
                logger()->warning('Order not found for n_analyses_methods_order: ' . $nAnalysesMethodOrder->id);
                return;
            }
            
            if ($order->status === 'received') {
                $order->update(['status' => 'in_progress']);
                
                logger()->info('Order status updated to in_progress for order: ' . $order->order_number);
            }
            
        } catch (\Exception $e) {
            logger()->error('Failed to update order status: ' . $e->getMessage());
        }
    }
}