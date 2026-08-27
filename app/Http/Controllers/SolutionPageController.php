<?php

namespace App\Http\Controllers;

use App\Models\Solution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Seo;
use App\Models\SolutionPage;

class SolutionPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Solutions', [
            'seo'      => Seo::where('page', 'solutions')->first(),
            'pageData' => SolutionPage::first(), // ← add this

            'solutions' => Solution::select(
                'id',
                'title',
                'title_ja',
                'slug',
                'hero_description',
                'hero_description_ja',
                'link'
            )->orderBy('id')->get(),

            'solutionNav' => Solution::select('title', 'title_ja', 'slug')
                ->orderBy('id')->get(),
        ]);
    }

    public function show(string $slug)
    {
        $solution = Solution::where('slug', $slug)
            ->with([
                'features:id,solution_id,title,title_ja,description,description_ja',
                'useCases:id,solution_id,title,title_ja,subtitle,subtitle_ja,description,description_ja',
                'industries:id,solution_id,title,title_ja,description,description_ja',
                'caseStudies:id,solution_id,slug,title,title_ja,subtitle,subtitle_ja,company_name,company_name_ja,ceo_name,ceo_name_ja,logo,hero_image,secondary_image,tags,tags_ja,hero_description,hero_description_ja,benefit,benefit_ja,implementation,implementation_ja,content,content_ja,sort_order',
                'faqs:id,solution_id,question,question_ja,answer,answer_ja',
            ])
            ->firstOrFail();

        $lang = app()->getLocale();

        return Inertia::render('Solutions/Show', [
            'solution' => $solution,

            // Resolved SEO data (ready to use in <Head> without extra logic in React)
            'pageSeo' => [
                'meta_title'       => $solution->getEffectiveMetaTitle($lang),
                'meta_description' => $solution->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($solution->meta_keywords_ja ?? $solution->meta_keywords ?? '')
                    : ($solution->meta_keywords ?? ''),
                'og_image'         => $solution->og_image
                    ? asset('storage/' . $solution->og_image)
                    : ($solution->hero_image ? asset('storage/' . $solution->hero_image) : null),
            ],

            'solutionNav' => Solution::select('title', 'title_ja', 'slug')
                ->orderBy('id')
                ->get(),
        ]);
    }
}
