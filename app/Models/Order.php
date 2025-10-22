<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'analyses_method_id',
        'order_number',
        'title',
        'result_value',
        'order_date',
        'estimate_date',
        'report_issued_at',
        'report_file_path',
        'notes',
        'order_type',
        'status'
    ];

    public function clients()
    {
        return $this->belongsTo(Client::class);
    }


    public function n_order_samples()
    {
        return $this->hasMany(NOrderSample::class);
    }

    public function analyses_methods()
    {
        return $this->belongsTo(AnalysesMethod::class);
    }

    public function n_parameter_methods()
    {
        return $this->hasMany(NParameterMethod::class);
    }

    public function n_analysts(){
        return $this->hasMany(NAnalyst::class);
    }

}
