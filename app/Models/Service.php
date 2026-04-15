<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ja',
        'slug',
        'subtitle',
        'subtitle_ja',
        'hero_description',
        'hero_description_ja',
        'hero_image',
        'how_it_works',
        'how_it_works_ja',
    ];

    public function highlights()
    {
        return $this->hasMany(ServiceHighlight::class)->orderBy('sort_order');
    }

    public function benefits()
    {
        return $this->hasMany(ServiceBenefit::class)->orderBy('sort_order');
    }

    // public function industries()
    // {
    //     return $this->hasMany(ServiceIndustry::class)->orderBy('sort_order');
    // }
}
