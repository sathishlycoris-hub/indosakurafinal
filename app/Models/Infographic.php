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
    ];

    protected $casts = [
        'published_date'      => 'date',
        'table_of_contents'    => 'array',
        'table_of_contents_ja' => 'array',
    ];
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
