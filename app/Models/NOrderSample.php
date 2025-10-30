<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NOrderSample extends Model
{
    use HasFactory;

    protected $table = 'n_order_samples';
    protected $fillable = ['order_id', 'sample_id'];
}
