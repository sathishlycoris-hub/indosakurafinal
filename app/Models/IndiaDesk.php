<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDesk extends Model
{
    use HasFactory;

    protected $fillable = [
        'india_desk_page_id',
        'title',
        'title_ja',
        'slug',
        'subtitle',
        'subtitle_ja',
        'hero_description',
        'hero_description_ja',
        'hero_image',
        'supporting_growth',
        'supporting_growth_ja',
        'about',
        'about_ja',
        'about_indosakura',
        'about_indosakura_ja',
        'overview',
        'overview_ja',
        'cta_label',
        'cta_label_ja',
        'cta_url',
        'service_items',
        'why_choose',
        'approach_steps',
        'testimonials',
        'tech_stack',
        'case_studies',
        // SEO
        'meta_title',
        'meta_title_ja',
        'meta_description',
        'meta_description_ja',
        'meta_keywords',
        'meta_keywords_ja',
        'og_image',
    ];

    protected $casts = [
        'service_items'  => 'array',
        'why_choose'     => 'array',
        'approach_steps' => 'array',
        'testimonials'   => 'array',
        'tech_stack'     => 'array',
        'case_studies'   => 'array',
    ];

    public function parentPage()
    {
        return $this->belongsTo(IndiaDeskPage::class, 'india_desk_page_id');
    }

    public function highlights()
    {
        return $this->hasMany(IndiaDeskHighlight::class)->orderBy('sort_order');
    }

    public function benefits()
    {
        return $this->hasMany(IndiaDeskBenefit::class)->orderBy('sort_order');
    }

    public function pageFaqs()
    {
        return $this->hasMany(IndiaDeskPageFaq::class)->orderBy('sort_order');
    }

    public function pageIndustries()
    {
        return $this->hasMany(IndiaDeskPageIndustry::class)->orderBy('sort_order');
    }

    /**
     * Resolve effective meta title for a given locale.
     * Falls back to the desk title when not explicitly set.
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
     * Resolve effective meta description for a given locale.
     */
    public function getEffectiveMetaDescription(string $lang = 'en'): string
    {
        $field = $lang === 'ja' ? 'meta_description_ja' : 'meta_description';
        return $this->{$field} ?? '';
    }
}