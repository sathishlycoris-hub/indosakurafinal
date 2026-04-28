<?php

namespace App\Http\Controllers;

use App\Models\CorporateInfo;
use Inertia\Inertia;
use App\Models\Seo;

class CorporateInfoPageController extends Controller
{
    public function index()
    {
        return Inertia::render('CorporateInfo', [
           'items' => CorporateInfo::select(
        'id',
        'title',
        'title_ja',
        'path',
        'image' // ✅ MUST include
       
    )
    ->orderBy('sort_order')
    ->get(),
     'seo' => Seo::where('page', 'corporate-info')->first(),
        ]);
    }
}