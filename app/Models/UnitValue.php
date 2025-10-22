<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitValue extends Model
{
    use HasFactory;

    protected $fillable = ['value'];

    public function testParameters()
    {
        return $this->hasMany(TestParameter::class);
    }
}
