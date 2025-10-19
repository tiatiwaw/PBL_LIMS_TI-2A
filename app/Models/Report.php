<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "order_id",
        "issued_by_id",
        "report_number",
        "issued_at",
        "file_path",
        "status",
        "created_at",
        "updated_at"
    ];

    public function order ()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
