<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Philosophy extends Model
{
    use HasFactory;

     protected $fillable = [
        'title',
        'title_ja',
        'content',
        'content_ja',
        'image',
        'description',
        'description_ja',
    ];
}
