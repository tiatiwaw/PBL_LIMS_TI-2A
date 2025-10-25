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
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function samples()
    {
        return $this->belongsToMany(Sample::class, 'n_order_samples', 'order_id', 'sample_id');
    }


    public function analyses_methods()
    {
        return $this->belongsTo(AnalysesMethod::class, 'analyses_method_id');
    }


    public function n_parameter_methods()
    {
        return $this->hasMany(NParameterMethod::class, 'order_id');
    }

    public function analysts()
    {
        return $this->belongsToMany(Analyst::class, 'n_analysts', 'order_id', 'analyst_id');
    }
}
