<?php

namespace App\Models;

use Illuminate\Database\Eloquent\HasFactory;
use illuminate\Database\Eloquent\Pivot;

class NOrderSample extends Pivot
{
    use HasFactory;

    protected $table = 'NOrderSamples';

    protected $fillable = [
        'order_id',
        'sample_id',
    ];

    public $timestamp = true;
}
