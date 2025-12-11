<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'n_analyses_methods_order_id', 'reference', 'merchant_ref', 'total_price', 'status'];

    function user() {
        return $this->belongsTo(User::class);
    }

    function n_analyses_methods_order() {
        return $this->belongsTo(NAnalysesMethodsOrder::class);
    }

    protected static function booted()
    {
        static::updated(function ($transaction) {
            // Jika status berubah menjadi 'PAID'
            if ($transaction->isDirty('status') && $transaction->status === 'PAID') {
                // Cari order melalui n_analyses_methods_order
                $nAnalysesMethodOrder = $transaction->n_analyses_methods_order;
                if ($nAnalysesMethodOrder) {
                    $order = $nAnalysesMethodOrder->order;
                    if ($order && $order->status === 'received') {
                        $order->update(['status' => 'in_progress']);
                    }
                }
            }
        });
    }
}
