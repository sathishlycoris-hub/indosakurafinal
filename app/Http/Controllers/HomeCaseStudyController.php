<?php

namespace App\Http\Controllers;

use App\Models\HomeCaseStudy;
use Inertia\Inertia;

class HomeCaseStudyController extends Controller
{
    public function show(string $slug)
    {
        $caseStudy = HomeCaseStudy::where('slug', $slug)->firstOrFail();

        $lang = app()->getLocale();

        $relatedCases = HomeCaseStudy::where('id', '!=', $caseStudy->id)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->take(3)
            ->get(['id', 'slug', 'title', 'title_ja', 'hero_image']);

        return Inertia::render('HomeCaseStudies/Show', [
            'caseStudy'    => $caseStudy,
            'relatedCases' => $relatedCases,
            'lang'         => $lang,
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
