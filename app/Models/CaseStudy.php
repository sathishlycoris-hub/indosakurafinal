<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'title_ja',
        'subtitle',
        'subtitle_ja',
        'slug',
        'hero_description',
        'hero_description_ja',
        'hero_image',
        'secondary_image',
        'tags',
        'content',
        'content_ja',
        'benefit',
        'benefit_ja',
        'implementation',
        'implementation_ja',
        
        // 'sections'
    ];

    protected $casts = [
        // 'sections' => 'array',
        'tags' => 'array'
    ];
}
