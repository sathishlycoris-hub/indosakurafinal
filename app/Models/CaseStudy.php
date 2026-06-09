<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ja',
        'subtitle',
        'subtitle_ja',
        'slug',
        'hero_description',
        'hero_description_ja',
        'hero_image',
        'secondary_image',
        'tags',
        'content',
        'content_ja',
        'benefit',
        'benefit_ja',
        'implementation',
        'implementation_ja',
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
        'tags' => 'array',
    ];

    public function getEffectiveMetaTitle(string $lang): string
    {
        if ($lang === 'ja') {
            return $this->meta_title_ja
                ?: $this->meta_title
                ?: $this->title_ja
                ?: $this->title
                ?: '';
        }

        return $this->meta_title ?: $this->title ?: '';
    }

    public function getEffectiveMetaDescription(string $lang): string
    {
        if ($lang === 'ja') {
            return $this->meta_description_ja
                ?: $this->meta_description
                ?: $this->hero_description_ja
                ?: strip_tags($this->hero_description ?? '')
                ?: '';
        }

        return $this->meta_description ?: strip_tags($this->hero_description ?? '') ?: '';
    }
}