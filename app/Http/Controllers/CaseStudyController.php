<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use App\Models\Seo;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CaseStudyController extends Controller
{
    public function index()
    {
        return Inertia::render('Casestudies/Index', [
            'caseStudies' => CaseStudy::select(
                'id',
                'subtitle',
                'subtitle_ja',
                'slug',
                'hero_image',
                'tags'
            )->latest()->get(),
            'seo' => Seo::where('page', 'case-studies')->first(),
        ]);
    }

    public function show($slug)
    {
        $caseStudy = CaseStudy::where('slug', $slug)->firstOrFail();

        $relatedCases = CaseStudy::where('id', '!=', $caseStudy->id)
            ->latest()
            ->take(3)
            ->get(['title', 'title_ja', 'slug', 'hero_image']);

        return Inertia::render('Casestudies/Show', [
            'caseStudy'    => $caseStudy,
            'relatedCases' => $relatedCases,
        ]);
    }
}