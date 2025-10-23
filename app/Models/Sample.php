<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sample extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'samples';

    protected $fillable = [
        'sample_category_id',
        'name',
        'form',
        'preservation_method',
        'sample_volume',
        'condition',
        'temperature',
    ];

    function sample_category()
    {
        return $this->belongsTo(SampleCategory::class, 'sample_category_id');
    }

    function orders()
    {
        return $this->belongsToMany(Order::class, 'n_order_samples', 'sample_id', 'order_id')
            ->whithTimestamps();
    }
}
