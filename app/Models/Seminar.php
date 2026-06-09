<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seminar extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ja',
        'description',
        'description_ja',
        'location',
        'location_ja',
        'participation_fee',
        'participation_fee_ja',
        'organizer',
        'organizer_ja',
        'sponsorship',
        'sponsorship_ja',
        'cooperation',
        'cooperation_ja',
        'date',
        'time',
        'status',
        'tags',
        'image',
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
        'date' => 'date',
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
                ?: $this->description_ja
                ?: $this->description
                ?: '';
        }

        return $this->meta_description ?: $this->description ?: '';
    }
}