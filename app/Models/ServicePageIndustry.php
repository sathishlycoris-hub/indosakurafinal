<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePageIndustry extends Model
{
    protected $table = 'service_page_industries';

    protected $fillable = [
        'service_id',
        'title',
        'title_ja',
        'description',
        'description_ja',
        'sort_order',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}