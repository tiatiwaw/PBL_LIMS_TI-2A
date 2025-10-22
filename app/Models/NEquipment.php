<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NEquipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'n_parameter_method_id',
        'equipment_id'
    ];

    public function n_parameter_methods()
    {
        return $this->belongsTo(NParameterMethod::class,'n_parameter_method_id');
    }

    public function equipments()
    {
        return $this->belongsTo(Equipment::class,'equipment_id');
    }
}
