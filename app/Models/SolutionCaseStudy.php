<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionCaseStudy extends Model
{
    use HasFactory;

     protected $fillable = [
        'solution_id',
        'title',
        'title_ja',
        'client',
        'client_ja',
        'summary',
        'summary_ja',
        'result',
        'result_ja',
        'image',
        'sort_order',
    ];
}
