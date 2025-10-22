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

    function n_parameter_method()
    {
        return $this->belongsTo(NParameterMethod::class);
    }

    function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
