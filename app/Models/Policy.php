<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    protected $fillable = [
        'title',
        'title_ja',
        'slug',
        'intro',
        'intro_ja',
        'sort_order',

    ];

    public function sections()
    {
        return $this->hasMany(PolicySection::class);
    }
}
