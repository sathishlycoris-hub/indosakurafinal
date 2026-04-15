<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceHighlight extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'title',
        'title_ja',
        'value',        // e.g. 99.9%, 50%+
        'description',
        'description_ja',
        'sort_order',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
