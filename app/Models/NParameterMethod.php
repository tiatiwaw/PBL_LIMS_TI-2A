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

    public function n_equipments(){
        return $this->hasMany(NEquipment::class,'n_parameter_method_id');
    }

    public function n_reagents(){
        return $this->hasMany(NReagent::class,'n_parameter_method_id');
    }
}
