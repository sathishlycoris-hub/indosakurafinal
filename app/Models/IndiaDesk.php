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

    /**
     * Find one embedded case study by slug.
     */
    public function findCaseStudyBySlug(string $slug): ?array
    {
        foreach ((array) $this->case_studies as $cs) {
            if (($cs['slug'] ?? null) === $slug) {
                return $cs;
            }
        }
        return null;
    }

    /**
     * All case studies across all desks, each annotated with its parent desk info.
     * Pass $excludeDeskId + $excludeSlug to exclude "this" case study (e.g. for related lists).
     */
    public static function allCaseStudiesFlattened(?int $excludeDeskId = null, ?string $excludeSlug = null)
    {
        return static::query()
            ->select('id', 'slug', 'title', 'title_ja', 'case_studies')
            ->get()
            ->flatMap(function ($desk) use ($excludeDeskId, $excludeSlug) {
                return collect((array) $desk->case_studies)
                    ->filter(fn($cs) => !($desk->id === $excludeDeskId && ($cs['slug'] ?? null) === $excludeSlug))
                    ->map(function ($cs) use ($desk) {
                        $cs['india_desk_id']       = $desk->id;
                        $cs['india_desk_slug']     = $desk->slug;
                        $cs['india_desk_title']    = $desk->title;
                        $cs['india_desk_title_ja'] = $desk->title_ja;
                        return $cs;
                    });
            })
            ->values();
    }

   public static function effectiveCaseStudyMetaTitle(array $cs, string $lang = 'en'): string
    {
        $titleField = $lang === 'ja' ? 'title_ja' : 'title';
        $metaField  = $lang === 'ja' ? 'meta_title_ja' : 'meta_title';

        return $cs[$metaField] ?? $cs[$titleField] ?? $cs['title'] ?? '';
    }

    public static function effectiveCaseStudyMetaDescription(array $cs, string $lang = 'en'): string
    {
        $metaField = $lang === 'ja' ? 'meta_description_ja' : 'meta_description';
        $fallback  = $lang === 'ja'
            ? ($cs['hero_description_ja'] ?? $cs['hero_description'] ?? '')
            : ($cs['hero_description'] ?? '');

        return $cs[$metaField] ?? (strip_tags($fallback) ?: '');
    }
}
