<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'solution_id',
        'title',
        'title_ja',
        'subtitle',
        'description',
        'description_ja',
        'image',
        'sort_order',
    ];
}
