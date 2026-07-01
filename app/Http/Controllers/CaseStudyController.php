<?php

namespace App\Http\Controllers;

use App\Models\CaseStudyPage;
use App\Models\IndiaDesk;
use App\Models\Seo;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    public function index()
    {
        $caseStudies = IndiaDesk::allCaseStudiesFlattened()->map(fn ($cs) => [
            'slug'                => $cs['slug'] ?? null,
            'title'               => $cs['title'] ?? '',
            'title_ja'            => $cs['title_ja'] ?? null,
            'company_name'        => $cs['company_name'] ?? null,
            'company_name_ja'     => $cs['company_name_ja'] ?? null,
            'ceo_name'            => $cs['ceo_name'] ?? null,
            'ceo_name_ja'         => $cs['ceo_name_ja'] ?? null,
            'logo'                => $cs['logo'] ?? null,
            'hero_image'          => $cs['hero_image'] ?? null,
            'hero_description'    => $cs['hero_description'] ?? null,
            'hero_description_ja' => $cs['hero_description_ja'] ?? null,
            'tags'                => $cs['tags'] ?? null,
            'tags_ja'             => $cs['tags_ja'] ?? null,
            'india_desk_slug'     => $cs['india_desk_slug'] ?? null,
            'india_desk_title'    => $cs['india_desk_title'] ?? null,
        ])->values();

        return Inertia::render('Casestudies/Index', [
            'caseStudies' => $caseStudies,
            'seo'         => Seo::where('page', 'case-studies')->first(),
            'pageData'    => CaseStudyPage::first(),
        ]);
    }

    public function show(string $indiaDeskSlug, string $caseSlug)
    {
        $indiaDesk = IndiaDesk::where('slug', $indiaDeskSlug)->firstOrFail();
        $caseStudy = $indiaDesk->findCaseStudyBySlug($caseSlug);

        abort_unless($caseStudy, 404);

        $lang = app()->getLocale();

        $caseStudy['india_desk_slug']  = $indiaDesk->slug;
        $caseStudy['india_desk_title'] = $indiaDesk->title;
        $caseStudy['india_desk_title_ja'] = $indiaDesk->title_ja;

        $relatedCases = IndiaDesk::allCaseStudiesFlattened($indiaDesk->id, $caseSlug)->take(3)->values();

        return Inertia::render('Casestudies/Show', [
            'caseStudy'    => $caseStudy,
            'relatedCases' => $relatedCases,
            'lang'         => $lang,
            'pageSeo' => [
                'meta_title'       => IndiaDesk::effectiveCaseStudyMetaTitle($caseStudy, $lang),
                'meta_description' => IndiaDesk::effectiveCaseStudyMetaDescription($caseStudy, $lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($caseStudy['meta_keywords_ja'] ?? $caseStudy['meta_keywords'] ?? '')
                    : ($caseStudy['meta_keywords'] ?? ''),
                'og_image' => !empty($caseStudy['og_image'])
                    ? asset('storage/' . $caseStudy['og_image'])
                    : (!empty($caseStudy['hero_image']) ? asset('storage/' . $caseStudy['hero_image']) : null),
            ],
        ]);
    }
}