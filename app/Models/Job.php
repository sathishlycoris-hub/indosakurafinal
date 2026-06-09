<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'department',
        'location',
        'employment_type',
        'experience',
        'salary',
        'short_description',
        'about_role',
        'language',
        'status',
        'sort_order',
        'title_ja',
        'department_ja',
        'location_ja',
        'employment_type_ja',
        'experience_ja',
        'salary_ja',
        'short_description_ja',
        'about_role_ja',
        // SEO
        'meta_title',
        'meta_title_ja',
        'meta_description',
        'meta_description_ja',
        'meta_keywords',
        'meta_keywords_ja',
        'og_image',
    ];

    public function sections()
    {
        return $this->hasMany(JobSection::class)->orderBy('sort_order');
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Resolve effective meta title for a given locale.
     * Falls back to the job title when the dedicated meta title is empty.
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