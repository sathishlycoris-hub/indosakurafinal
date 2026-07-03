<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolutionFaq extends Model
{
    protected $fillable = [
        'solution_id',
        'question',
        'question_ja',
        'answer',
        'answer_ja',
        'sort_order',
    ];
}