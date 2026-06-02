<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDeskPageFaq extends Model
{
    use HasFactory;

    protected $table = 'india_desk_page_faqs';

    protected $fillable = [
        'india_desk_id',
        'question',
        'question_ja',
        'answer',
        'answer_ja',
        'sort_order',
    ];

    public function indiaDesk()
    {
        return $this->belongsTo(IndiaDesk::class);
    }
}
