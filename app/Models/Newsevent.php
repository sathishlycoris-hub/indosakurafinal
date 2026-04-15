<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsevent extends Model
{
    use HasFactory;

    protected $table = 'newsevents';

    protected $fillable = [
    'date', 'eventtype', 'eventtype_ja',
    'short', 'short_ja',
    'description', 'description_ja',
    'image', 'pdf',
];
}
