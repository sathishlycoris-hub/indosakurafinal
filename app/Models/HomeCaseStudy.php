<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeCaseStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'title_ja',
        'slug',
        'subtitle', 'subtitle_ja',
        'company_name', 'company_name_ja',
        'ceo_name', 'ceo_name_ja',
        'logo',
        'hero_image',
        'secondary_image',
        'tags', 'tags_ja',
        'hero_description', 'hero_description_ja',
        'benefit', 'benefit_ja',
        'implementation', 'implementation_ja',
        'content', 'content_ja',
        'meta_title', 'meta_title_ja',
        'meta_description', 'meta_description_ja',
        'meta_keywords', 'meta_keywords_ja',
        'og_image',
        'sort_order',
    ];

    public function getEffectiveMetaTitle(string $lang = 'en'): string
    {
        $titleField = $lang === 'ja' ? 'title_ja' : 'title';
        $metaField  = $lang === 'ja' ? 'meta_title_ja' : 'meta_title';

        return $this->{$metaField} ?: ($this->{$titleField} ?: $this->title) ?: '';
    }

    public function getEffectiveMetaDescription(string $lang = 'en'): string
    {
        $metaField = $lang === 'ja' ? 'meta_description_ja' : 'meta_description';
        $fallback  = $lang === 'ja'
            ? ($this->hero_description_ja ?: $this->hero_description)
            : $this->hero_description;

        return $this->{$metaField} ?: (strip_tags($fallback ?? '') ?: '');
    }
}
