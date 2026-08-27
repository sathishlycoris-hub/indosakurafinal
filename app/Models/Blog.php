<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id', // ★ NEW — optional parent Service this blog is attached to
        'language',
        'title',
        'title_ja',
        'slug',
        'short_description',
        'short_description_ja',
        'content',
        'content_ja',
        'category',
        'author',
        'category_ja',
        'author_ja',
        'published_date',
        'image',
        'status',
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
        'published_date' => 'date',
    ];

    // ★ NEW
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function pageFaqs()
    {
        return $this->hasMany(BlogPageFaq::class)->orderBy('sort_order');
    }

    /**
     * Resolve effective meta title for a given locale.
     * Falls back to the blog title when the dedicated meta title is empty.
     */
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

    /**
     * Resolve effective meta description for a given locale.
     * Falls back to short_description when empty.
     */
    public function getEffectiveMetaDescription(string $lang): string
    {
        if ($lang === 'ja') {
            return $this->meta_description_ja
                ?: $this->meta_description
                ?: $this->short_description_ja
                ?: $this->short_description
                ?: '';
        }

        return $this->meta_description ?: $this->short_description ?: '';
    }
}