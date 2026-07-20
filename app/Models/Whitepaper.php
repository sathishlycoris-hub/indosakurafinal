<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Whitepaper extends Model
{
    protected $fillable = [
        'title', 'title_ja',
        'description', 'description_ja',
        'file',
    ];

    public function leads()
    {
        return $this->hasMany(WhitepaperLead::class);
    }
}
