<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDesk extends Model
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

}
