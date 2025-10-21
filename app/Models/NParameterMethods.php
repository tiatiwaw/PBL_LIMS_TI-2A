<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NParameterMethods extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'test_parameter_id',
        'test_method_id',
        'n_equipment_id',
        'n_analyst_id',
        'n_reagent_id',
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
        return $this->belongsTo(NEquipment::class);
    }

    function n_analyst(){
        return $this->belongsTo(NAnalyst::class);
    }

    function n_reagent(){
        return $this->hasMany(NReagent::class);
    }
}
