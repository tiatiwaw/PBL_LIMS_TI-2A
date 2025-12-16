<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NAnalysesMethodsOrder extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'order_id',
        'analyses_method_id',
        'description',
        'price'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function analyses_method()
    {
        return $this->belongsTo(AnalysesMethod::class, 'analyses_method_id');
    }

    public function getTitleAttribute()
    {
        if ($this->order) {
            return $this->order->title;
        }
        
        return $this->description ?? 'Pembayaran Layanan';
    }
}