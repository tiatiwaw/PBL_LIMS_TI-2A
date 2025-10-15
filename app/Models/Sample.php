<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sample extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'sample_category_id',
        'name',
        'form',
        'preservation_method',
        'sample_volume',
        'condition',
        'temperature',
    ];

    function order()
    {
        return $this->belongsTo(Order::class);
    }

    function sample_category()
    {
        return $this->belongsTo(Sample_Category::class);
    }
}
