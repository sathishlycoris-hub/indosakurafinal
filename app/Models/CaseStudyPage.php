<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudyPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_title_ja',
        'hero_subtitle',
        'hero_subtitle_ja',
    ];
}