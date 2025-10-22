<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NTrainingAnalyst extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'n_training_analysts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'analyst_id',
        'training_id',
    ];

    public function analyst()
    {
        return $this->belongsTo(Analyst::class);
    }

    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}