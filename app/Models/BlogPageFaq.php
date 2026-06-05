<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPageFaq extends Model
{
    use HasFactory;

    protected $table = 'blog_page_faqs';

    protected $fillable = [
        'blog_id',
        'question',
        'question_ja',
        'answer',
        'answer_ja',
        'sort_order',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
