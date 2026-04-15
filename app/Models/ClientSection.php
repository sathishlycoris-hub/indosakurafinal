<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientSection extends Model
{
    protected $fillable = [
        'client_id',
        'section_type',
        'name',
        'sort_order',
        'name_ja',
        'link', 
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}

