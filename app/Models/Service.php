<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'title_ja',
        'slug',
        'subtitle', 'subtitle_ja',
        'hero_description', 'hero_description_ja',
        'hero_image',
        'how_it_works', 'how_it_works_ja',
        'overview', 'overview_ja',
        'cta_label', 'cta_label_ja',
        'cta_url',
        'service_items',
        'why_choose',
        'approach_steps',
        'testimonials',
        'tech_stack',
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
    ];

    public function highlights()
    {
        return $this->hasMany(ServiceHighlight::class)->orderBy('sort_order');
    }

    public function benefits()
    {
        return $this->hasMany(ServiceBenefit::class)->orderBy('sort_order');
    }

    public function pageFaqs()
    {
        return $this->hasMany(ServicePageFaq::class)->orderBy('sort_order');
    }

    public function pageIndustries()
    {
        return $this->hasMany(ServicePageIndustry::class)->orderBy('sort_order');
    }

    /**
     * Resolve effective meta title for a given locale.
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

    public function items(): HasMany
{
    return $this->hasMany(ServiceItem::class)->orderBy('sort_order');
}
}