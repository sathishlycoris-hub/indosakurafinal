<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceIndustries extends Model
{
    use HasFactory;
    protected $table = 'serviced_industries';
 
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
