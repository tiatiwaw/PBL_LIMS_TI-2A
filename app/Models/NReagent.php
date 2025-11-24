<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NOrderSample extends Model
{
    use HasFactory;

    protected $fillable = [
        'n_parameter_method_id',
        'reagent_id',
        'reagent_used',
    ];

    public function n_paramether_method()
    {
        return $this->belongsTo(Order::class, 'n_parameter_method_id');
    }
    public function reagent()
    {
        return $this->belongsTo(Sample::class, 'reagent_id');
    }
}
