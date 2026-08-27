<?php

namespace App\Http\Controllers;

use App\Models\CaseStudyPage;
use App\Models\HomeCaseStudy;
use App\Models\IndiaDesk;
use App\Models\Solution;
use App\Models\SolutionCaseStudy;
use App\Models\Seo;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    public function index()
    {
        $homeCaseStudies = HomeCaseStudy::orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn ($cs) => [
                'slug'                => $cs->slug,
                'title'               => $cs->title,
                'title_ja'            => $cs->title_ja,
                'company_name'        => $cs->company_name,
                'company_name_ja'     => $cs->company_name_ja,
                'ceo_name'            => $cs->ceo_name,
                'ceo_name_ja'         => $cs->ceo_name_ja,
                'logo'                => $cs->logo ? (str_starts_with($cs->logo, 'http') ? $cs->logo : asset('storage/' . $cs->logo)) : null,
                'hero_image'          => $cs->hero_image,
                'hero_description'    => $cs->hero_description,
                'hero_description_ja' => $cs->hero_description_ja,
                'tags'                => $cs->tags,
                'tags_ja'             => $cs->tags_ja,
            ])
            ->values();

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
            'parent_type'         => 'india_desk',
            'india_desk_slug'     => $cs['india_desk_slug'] ?? null,
            'india_desk_title'    => $cs['india_desk_title'] ?? null,
        ])->values();

        // Solution case studies — same card shape, tagged with parent_type
        // 'solution' so the frontend builds /solutions/{slug}/case-studies/{slug}
        // links instead of the India Desk ones.
        $solutionCaseStudies = SolutionCaseStudy::allCaseStudiesFlattened()->map(fn ($cs) => [
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
            'parent_type'         => 'solution',
            'solution_slug'       => $cs['solution_slug'] ?? null,
            'solution_title'      => $cs['solution_title'] ?? null,
        ])->values();

        return Inertia::render('Casestudies/Index', [
            'homeCaseStudies' => $homeCaseStudies,
            'caseStudies'     => $caseStudies,
            'solutionCaseStudies' => $solutionCaseStudies,
            'seo'             => Seo::where('page', 'case-studies')->first(),
            'pageData'        => CaseStudyPage::first(),
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
        $caseStudy['parent_type'] = 'india_desk';

        $relatedCases = IndiaDesk::allCaseStudiesFlattened($indiaDesk->id, $caseSlug)
            ->take(3)
            ->map(fn ($rc) => array_merge($rc, ['parent_type' => 'india_desk']))
            ->values();

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

    /**
     * Detail page for a Solution case study — same Casestudies/Show template
     * as India Desk case studies, just sourced from the solution_case_studies
     * relation instead of an embedded JSON array.
     */
    public function showSolutionCaseStudy(string $solutionSlug, string $caseSlug)
    {
        $solution = Solution::where('slug', $solutionSlug)->firstOrFail();
        $cs = $solution->findCaseStudyBySlug($caseSlug);

        abort_unless($cs, 404);

        $lang = app()->getLocale();

        $caseStudy = [
            'slug'                => $cs->slug,
            'title'               => $cs->title,
            'title_ja'            => $cs->title_ja,
            'subtitle'            => $cs->subtitle,
            'subtitle_ja'         => $cs->subtitle_ja,
            'company_name'        => $cs->company_name,
            'company_name_ja'     => $cs->company_name_ja,
            'ceo_name'            => $cs->ceo_name,
            'ceo_name_ja'         => $cs->ceo_name_ja,
            'logo'                => $cs->logo,
            'tags'                => $cs->tags,
            'tags_ja'             => $cs->tags_ja,
            'hero_description'    => $cs->hero_description,
            'hero_description_ja' => $cs->hero_description_ja,
            'content'             => $cs->content,
            'content_ja'          => $cs->content_ja,
            'benefit'             => $cs->benefit,
            'benefit_ja'          => $cs->benefit_ja,
            'implementation'      => $cs->implementation,
            'implementation_ja'   => $cs->implementation_ja,
            'hero_image'          => $cs->hero_image,
            'secondary_image'     => $cs->secondary_image,
            // Generic parent fields — Casestudies/Show.tsx uses parent_type to
            // decide whether to link back to /india-desks/{slug} or /solutions/{slug}
            'parent_type'         => 'solution',
            'solution_slug'       => $solution->slug,
            'solution_title'      => $solution->title,
            'solution_title_ja'   => $solution->title_ja,
        ];

        $relatedCases = SolutionCaseStudy::allCaseStudiesFlattened($solution->id, $caseSlug)
            ->take(3)
            ->map(fn ($rc) => array_merge($rc, ['parent_type' => 'solution']))
            ->values();

        return Inertia::render('Casestudies/Show', [
            'caseStudy'    => $caseStudy,
            'relatedCases' => $relatedCases,
            'lang'         => $lang,
            'pageSeo' => [
                'meta_title'       => $cs->getEffectiveMetaTitle($lang),
                'meta_description' => $cs->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($cs->meta_keywords_ja ?? $cs->meta_keywords ?? '')
                    : ($cs->meta_keywords ?? ''),
                'og_image' => $cs->og_image
                    ? asset('storage/' . $cs->og_image)
                    : ($cs->hero_image ? asset('storage/' . $cs->hero_image) : null),
            ],
        ]);
    }
}