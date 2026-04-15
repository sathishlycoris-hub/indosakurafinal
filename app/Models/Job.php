<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'department',
        'location',
        'employment_type',
        'experience',
        'salary',
        'short_description',
        'about_role',
        'language',
        'status',
        'title_ja',
        'department_ja',
        'location_ja',
        'employment_type_ja',
        'experience_ja',
        'salary_ja',
        'short_description_ja',
        'about_role_ja',   
    ];

    public function sections()
    {
        return $this->hasMany(JobSection::class)->orderBy('sort_order');
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
