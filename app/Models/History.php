<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;
    protected $fillable = [
        'year',
        'year_ja',
        'month',
        'month_ja',
        'description',
        'description_ja',
    ];
}
