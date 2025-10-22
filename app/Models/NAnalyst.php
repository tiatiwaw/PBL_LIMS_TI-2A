<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NAnalyst extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'analyst_id'
    ];

    function order()
    {
        return $this->belongsTo(Order::class);
    }

    function analyst()
    {
        return $this->belongsTo(Analyst::class);
    }

}
