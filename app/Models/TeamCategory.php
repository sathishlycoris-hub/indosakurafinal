<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamCategory extends Model
{
    protected $fillable = [
        'name',
        'name_ja',
        'sort_order',
    ];
}