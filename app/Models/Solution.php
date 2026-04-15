<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;

     protected $fillable = [
        'title',
        'title_ja',
        'slug',
        'subtitle',
        'subtitle_ja',
        'hero_description',
        'hero_description_ja',
        'hero_image',
        'link',
    ];

    public function features()
    {
        return $this->hasMany(SolutionFeature::class)->orderBy('sort_order');
    }

    public function useCases()
    {
        return $this->hasMany(SolutionUseCase::class)->orderBy('sort_order');
    }

    public function caseStudies()
    {
        return $this->hasMany(SolutionCaseStudy::class)->orderBy('sort_order');
    }

     public function industries()
    {
        return $this->hasMany(SolutionIndustry::class)->orderBy('sort_order');
    }
}
