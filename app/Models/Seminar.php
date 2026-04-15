<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seminar extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'title_ja',
        'description',
        'description_ja',
        'location',
        'location_ja',
        'participation_fee',
        'participation_fee_ja',
        'organizer',
        'organizer_ja',
        'sponsorship',
        'sponsorship_ja',
        'cooperation',
        'cooperation_ja',
        'date',
        'time',
        'status',
        'tags',
        'image',
    ];

    protected $casts = [
        'tags' => 'array',
        'date' => 'date',
    ];
}
