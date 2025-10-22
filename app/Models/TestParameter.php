<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestParameter extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_value_id',
        'reference_id',
        'name',
        'category',
        'detection_limit',
        'quality_standard'
    ];

    public function unitValue()
    {
        return $this->belongsTo(UnitValue::class);
    }

    public function referenceStandard()
    {
        return $this->belongsTo(ReferenceStandard::class, 'reference_id');
    }

    public function parameterMethods()
    {
        return $this->hasMany(NParameterMethod::class, 'test_parameter_id');
    }
}
