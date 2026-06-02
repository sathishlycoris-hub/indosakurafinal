<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDeskPageIndustry extends Model
{
    use HasFactory;

    protected $table = 'india_desk_page_industries';

    protected $fillable = [
        'india_desk_id',
        'title',
        'title_ja',
        'description',
        'description_ja',
        'sort_order',
    ];

    public function indiaDesk()
    {
        return $this->belongsTo(IndiaDesk::class);
    }
}
