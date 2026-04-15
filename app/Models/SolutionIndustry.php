<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionIndustry extends Model
{
    use HasFactory;

    protected $fillable = [
    'solution_id',
    'title',
    'title_ja',
    'description',
    'description_ja',
    'sort_order',
    'icon',
    ];
}
				