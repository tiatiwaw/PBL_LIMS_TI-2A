<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;




class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
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

    public function n_order_samples()
    {
        return $this->hasMany(NOrderSample::class, 'order_id');
    }

    public function n_analyses_methods_orders()
    {
        return $this->hasMany(NAnalysesMethodsOrder::class, 'order_id');
    }

    public function n_parameter_methods()
    {
        return $this->hasMany(NParameterMethod::class, 'order_id');
    }

    public function analysts()
    {
        return $this->belongsToMany(Analyst::class, 'n_analysts', 'order_id', 'analyst_id');
    }

    public function analyses_methods()
    {
        return $this->hasManyThrough(
            AnalysesMethod::class,          // model tujuan
            NAnalysesMethodsOrder::class,   // model pivot / penghubung
            'order_id',                     // foreign key di tabel pivot
            'id',                           // foreign key di tabel target
            'id',                           // local key di tabel orders
            'analyses_method_id'            // foreign key di tabel pivot ke analyses_methods
        );
    }
}
