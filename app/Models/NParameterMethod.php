<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NParameterMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'test_parameter_id',
        'test_method_id',
        'result'
    ];

    function order() {
        return $this->belongsTo(Order::class);
    }

    function test_parameter(){
        return $this->belongsTo(TestParameter::class);
    }

    function test_method(){
        return $this->belongsTo(TestMethod::class);
    }

    function n_equipment(){
        return $this->hasMany(NEquipment::class);
    }

    function n_reagent(){
        return $this->hasMany(NReagent::class);
    }
}
