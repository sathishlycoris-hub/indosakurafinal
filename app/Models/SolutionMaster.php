<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionMaster extends Model
{
    use HasFactory;
     protected $fillable = [
        'solution_id',
        'key_title',
        'key_content',
        'case_title',
        'case_content',
        'industry_title',
        'industry_content',
    ];

      public function solution()
    {
        return $this->belongsTo(Solution::class);
    }
}
