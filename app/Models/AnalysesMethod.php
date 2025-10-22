<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalysesMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        "analyses_method"
    ];

    public function orders()
    {
        return $this->hasOne(Order::class,'analyses_method_id');
    }
}
