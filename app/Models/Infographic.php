<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infographic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ja',
        'slug',
        'short_description',  
        'short_description_ja',
        'content',
        'content_ja',
        'table_of_contents',
        'table_of_contents_ja',
        'category',
        'category_ja',
        'author',
        'author_ja',
        'image',
        'infographic_image',
        'published_date',
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
        'published_date'       => 'date',
        'table_of_contents'    => 'array',
        'table_of_contents_ja' => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

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
                ?: $this->short_description_ja
                ?: $this->short_description
                ?: '';
        }

        return $this->meta_description ?: $this->short_description ?: '';
    }
}