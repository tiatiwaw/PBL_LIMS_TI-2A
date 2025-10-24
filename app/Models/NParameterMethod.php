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

    public function orders() {
        return $this->belongsTo(Order::class,'order_id');
    }

    public function test_parameters(){
        return $this->belongsTo(TestParameter::class,'test_parameter_id');
    }

    public function test_methods(){
        return $this->belongsTo(TestMethod::class,'test_method_id');
    }

    public function equipments() {
        return $this->belongsToMany(Equipment::class, 'n_equipments', 'n_paramether_method_id', 'equipment_id');
    }
    public function reagents() {
        return $this->belongsToMany(Reagent::class, 'n_reagents', 'n_paramether_method_id', 'reagent_id');
    }
}
