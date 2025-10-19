<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'analyses_method_id',
        'sample_id',
        'analyst_id',
        'order_number',
        'title',
        'result_value',
        'order_date',
        'estimate_date',
        'report_issued_at',
        'report_file_path',
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
