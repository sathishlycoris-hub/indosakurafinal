<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

      protected $fillable = [
        'language',
        'name',
        'name_ja',
        'designation',
        'designation_ja',
        'category',
        'description',
        'description_ja',
        'image',
    ];
}
