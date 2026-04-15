<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
     protected $fillable = [
        'product_service',
        'classification',
        'requests',
        'expected_date',
        'company_name',
        'customer_position',
        'department',
        'post',
        'name_en',
        'name_ja',
        'address_type',
        'zip_code',
        'prefecture',
        'address',
        'telephone',
        'email',
        'language',
    ];

    /**
     * Casts
     */
    protected $casts = [
        'classification' => 'array',
    ];
}
