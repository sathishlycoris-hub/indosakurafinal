<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDeskPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_title_ja',
        'hero_subtitle',
        'hero_subtitle_ja',
        'hero_description',
        'hero_description_ja',
        'hero_image',
        'highlights',
        'supporting_growth',
        'supporting_growth_ja',
        'about',
        'about_ja',
        'about_indosakura',
        'about_indosakura_ja',
        'cta_label',
        'cta_label_ja',
        'cta_url',
    ];

    protected $casts = [
        'highlights'       => 'array',
    ];

    /**
     * Get the multiple sub-desks, specific services, or case study records attached to this landing setup.
     */
    public function childDesks()
    {
        return $this->hasMany(IndiaDesk::class, 'india_desk_page_id');
    }
}
