<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Greeting extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'title_ja',
        'description',
        'description_ja',
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
     * Falls back to a stripped version of description when empty.
     */
    public function getEffectiveMetaDescription(string $lang): string
    {
        if ($lang === 'ja') {
            return $this->meta_description_ja
                ?: $this->meta_description
                ?: strip_tags($this->description_ja ?? '')
                ?: strip_tags($this->description ?? '')
                ?: '';
        }
 
        return $this->meta_description
            ?: strip_tags($this->description ?? '')
            ?: '';
    }
}
