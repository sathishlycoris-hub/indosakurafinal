<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndiaDeskFaq extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'india_desk_id',
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
