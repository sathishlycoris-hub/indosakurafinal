<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'solution_id',
        'type',
        'title',
        'title_jap',
        'content',
        'content_jap',
    ];


     public function solution()
    {
        return $this->belongsTo(Solution::class);
    }
}


