<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Sample extends Model
{
    use HasFactory;

    protected $table = 'samples';

    protected $fillable = [
        'sample_category_id',
        'name',
        'form',
        'preservation_method',
        'sample_volume',
        'condition',
        'status',
        'storage_condition',
    ];

    function sample_categories()
    {
        return $this->belongsTo(SampleCategory::class, 'sample_category_id');
    }

    function orders()
    {
        return $this->belongsToMany(Order::class, 'n_order_samples', 'sample_id', 'order_id');
    }

    public function n_parameter_methods()
    {
        return $this->hasMany(NParameterMethod::class, 'sample_id');
    }
}
