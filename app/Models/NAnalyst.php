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

    public function orders()
    {
        return $this->belongsTo(Order::class,'order_id');
    }

    public function analysts()
    {
        return $this->belongsTo(Analyst::class,'analyst_id');
    }

}
