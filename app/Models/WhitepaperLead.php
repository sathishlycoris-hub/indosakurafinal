<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhitepaperLead extends Model
{
    protected $fillable = [
        'whitepaper_id',
        'name',
        'email',
    ];

    public function whitepaper()
    {
        return $this->belongsTo(Whitepaper::class);
    }
}
