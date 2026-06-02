<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDeskIndustry extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'title',
        'title_ja',
        'description',
        'description_ja',
        'sort_order',
    ];
}
