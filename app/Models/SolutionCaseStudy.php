<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionCaseStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'solution_id',
        'slug',
        'title',
        'title_ja',
        'subtitle',
        'subtitle_ja',
        'company_name',
        'company_name_ja',
        'ceo_name',
        'ceo_name_ja',
        // legacy fields — kept for backward compatibility with existing rows
        'client',
        'client_ja',
        'summary',
        'summary_ja',
        'result',
        'result_ja',
        'image',
        // rich media
        'logo',
        'hero_image',
        'secondary_image',
        'tags',
        'tags_ja',
        'hero_description',
        'hero_description_ja',
        // "Subject" box on the show page
        'benefit',
        'benefit_ja',
        // "Implementation Effect" box on the show page
        'implementation',
        'implementation_ja',
        // Long-form body at bottom of show page
        'content',
        'content_ja',
        // SEO
        'meta_title',
        'meta_title_ja',
        'meta_description',
        'meta_description_ja',
        'meta_keywords',
        'meta_keywords_ja',
        'og_image',
        'sort_order',
    ];

    public function solution()
    {
        return $this->belongsTo(Solution::class);
    }

    /**
     * Resolve the effective meta title for a given locale.
     * Falls back to the case study title when not explicitly set.
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
        $fallback = $lang === 'ja'
            ? ($this->hero_description_ja ?? $this->hero_description ?? '')
            : ($this->hero_description ?? '');

        return $this->{$field} ?? (strip_tags($fallback) ?: '');
    }

    /**
     * All Solution case studies across all solutions, each annotated with its
     * parent solution's slug/title — same purpose as
     * IndiaDesk::allCaseStudiesFlattened(), used to feed the aggregate
     * case-studies index page.
     */
    public static function allCaseStudiesFlattened(?int $excludeSolutionId = null, ?string $excludeSlug = null)
    {
        return static::query()
            ->with('solution:id,slug,title,title_ja')
            ->orderBy('sort_order')
            ->get()
            ->filter(fn ($cs) => !($cs->solution_id === $excludeSolutionId && $cs->slug === $excludeSlug))
            ->map(function (SolutionCaseStudy $cs) {
                return [
                    'slug'                => $cs->slug,
                    'title'               => $cs->title,
                    'title_ja'            => $cs->title_ja,
                    'subtitle'            => $cs->subtitle,
                    'subtitle_ja'         => $cs->subtitle_ja,
                    'company_name'        => $cs->company_name,
                    'company_name_ja'     => $cs->company_name_ja,
                    'ceo_name'            => $cs->ceo_name,
                    'ceo_name_ja'         => $cs->ceo_name_ja,
                    'logo'                => $cs->logo,
                    'hero_image'          => $cs->hero_image,
                    'secondary_image'     => $cs->secondary_image,
                    'tags'                => $cs->tags,
                    'tags_ja'             => $cs->tags_ja,
                    'hero_description'    => $cs->hero_description,
                    'hero_description_ja' => $cs->hero_description_ja,
                    'benefit'             => $cs->benefit,
                    'benefit_ja'          => $cs->benefit_ja,
                    'implementation'      => $cs->implementation,
                    'implementation_ja'   => $cs->implementation_ja,
                    'content'             => $cs->content,
                    'content_ja'          => $cs->content_ja,
                    'meta_title'          => $cs->meta_title,
                    'meta_title_ja'       => $cs->meta_title_ja,
                    'meta_description'    => $cs->meta_description,
                    'meta_description_ja' => $cs->meta_description_ja,
                    'meta_keywords'       => $cs->meta_keywords,
                    'meta_keywords_ja'    => $cs->meta_keywords_ja,
                    'og_image'            => $cs->og_image,
                    'solution_id'         => $cs->solution_id,
                    'solution_slug'       => $cs->solution?->slug,
                    'solution_title'      => $cs->solution?->title,
                    'solution_title_ja'   => $cs->solution?->title_ja,
                ];
            })
            ->values();
    }
}
