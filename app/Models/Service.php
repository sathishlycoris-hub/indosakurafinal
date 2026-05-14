<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    /**
     * Per-service page FAQs → service_page_faqs table.
     * Distinct from any global service_faqs used elsewhere.
     */
    public function pageFaqs()
    {
        return $this->hasMany(ServicePageFaq::class)->orderBy('sort_order');
    }

    /**
     * Per-service page Industries → service_page_industries table.
     * Distinct from any global service_industries used elsewhere.
     */
    public function pageIndustries()
    {
        return $this->hasMany(ServicePageIndustry::class)->orderBy('sort_order');
    }
}