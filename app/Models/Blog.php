<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'language',
        'title',
        'title_ja',
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
    ];

    protected $casts = [
        'published_date' => 'date',
    ];
}
