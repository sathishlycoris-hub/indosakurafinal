<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'sub_title',
        'sub_title_ja',
        'content',
        'content_ja',
    ];
}
