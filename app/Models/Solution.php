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
        // SEO
        'meta_title',
        'meta_title_ja',
        'meta_description',
        'meta_description_ja',
        'meta_keywords',
        'meta_keywords_ja',
        'og_image',
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

    /**
     * Resolve the effective meta title for a given locale.
     * Falls back to solution title when not set.
     */
    public function getEffectiveMetaTitle(string $lang = 'en'): string
    {
        $field = $lang === 'ja' ? 'meta_title_ja' : 'meta_title';
        return $this->{$field}
            ?? ($lang === 'ja' ? $this->title_ja : null)
            ?? $this->title
            ?? '';
    }

    /**
     * Resolve the effective meta description for a given locale.
     */
    public function getEffectiveMetaDescription(string $lang = 'en'): string
    {
        $field = $lang === 'ja' ? 'meta_description_ja' : 'meta_description';
        return $this->{$field} ?? '';
    }
}