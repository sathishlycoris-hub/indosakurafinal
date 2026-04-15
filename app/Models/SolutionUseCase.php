<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionUseCase extends Model
{
    use HasFactory;

     protected $fillable = [
        'solution_id',
        'title',
        'title_ja',
        'subtitle',
        'subtitle_ja',
        'description',
        'description_ja',
        'image',
        'sort_order',
    ];
}
