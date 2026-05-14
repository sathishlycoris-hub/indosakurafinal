<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePageFaq extends Model
{
    protected $table = 'service_page_faqs';

    protected $fillable = [
        'service_id',
        'question',
        'question_ja',
        'answer',
        'answer_ja',
        'sort_order',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}