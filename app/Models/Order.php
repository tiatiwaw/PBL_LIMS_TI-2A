<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'order_date',
        'estimated_date',
        'notes',
        'order_type',
        'status',
    ];

    function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    function sample()
    {
        return $this->hasMany(Sample::class, 'order_id');
    }
}
