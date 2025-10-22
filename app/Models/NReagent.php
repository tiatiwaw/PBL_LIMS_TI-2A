<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NReagent extends Model
{
    use HasFactory;

    protected $fillable = [
        'n_parameter_method_id',
        'reagent_id'
    ];

    public function n_parameter_methods()
    {
        return $this->belongsTo(NParameterMethod::class);
    }

    public function reagents()
    {
        return $this->belongsTo(Reagent::class);
    }
}
