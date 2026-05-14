<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceFaq extends Model
{
    use HasFactory;

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
