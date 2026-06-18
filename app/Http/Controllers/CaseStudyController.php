<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use App\Models\Seo;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CaseStudyPage;

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
            'pageData' => CaseStudyPage::first(), // ← add
        ]);
    }

    public function show($slug)
    {
        $caseStudy = CaseStudy::where('slug', $slug)->firstOrFail();

        $relatedCases = CaseStudy::where('id', '!=', $caseStudy->id)
            ->latest()
            ->take(3)
            ->get(['title', 'title_ja', 'slug', 'hero_image']);

        $lang = app()->getLocale();

        return Inertia::render('Casestudies/Show', [
            'caseStudy'    => $caseStudy,
            'relatedCases' => $relatedCases,
            'pageSeo' => [
                'meta_title'       => $caseStudy->getEffectiveMetaTitle($lang),
                'meta_description' => $caseStudy->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($caseStudy->meta_keywords_ja ?? $caseStudy->meta_keywords ?? '')
                    : ($caseStudy->meta_keywords ?? ''),
                'og_image' => $caseStudy->og_image
                    ? asset('storage/' . $caseStudy->og_image)
                    : ($caseStudy->hero_image ? asset('storage/' . $caseStudy->hero_image) : null),
            ],
        ]);
    }
}
