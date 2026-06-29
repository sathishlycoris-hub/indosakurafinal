<?php
// app/Models/ServiceItem.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id', 'slug', 'sort_order',
        'title', 'title_ja',
        'card_description', 'card_description_ja',
        'subtitle', 'subtitle_ja',
        'hero_description', 'hero_description_ja',
        'hero_image',
        'cta_label', 'cta_label_ja', 'cta_url',
        'intro', 'intro_ja',
        'sub_services', 'features', 'benefits', 'process_steps',
        'tech_stack', 'industries', 'why_choose', 'faqs',
        'meta_title', 'meta_title_ja',
        'meta_description', 'meta_description_ja',
        'meta_keywords', 'meta_keywords_ja',
        'og_image',
    ];

    protected $casts = [
        'sub_services'  => 'array',
        'features'      => 'array',
        'benefits'      => 'array',
        'process_steps' => 'array',
        'tech_stack'    => 'array',
        'industries'    => 'array',
        'why_choose'    => 'array',
        'faqs'          => 'array',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function getEffectiveMetaTitle(string $lang = 'en'): string
    {
        $field = $lang === 'ja' ? 'meta_title_ja' : 'meta_title';
        return $this->{$field}
            ?? ($lang === 'ja' ? $this->title_ja : null)
            ?? $this->title
            ?? '';
    }

    public function getEffectiveMetaDescription(string $lang = 'en'): string
    {
        $field = $lang === 'ja' ? 'meta_description_ja' : 'meta_description';
        return $this->{$field} ?? '';
    }
}