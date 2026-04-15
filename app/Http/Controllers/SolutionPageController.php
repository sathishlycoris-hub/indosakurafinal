<?php

namespace App\Http\Controllers;

use App\Models\Solution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Seo;

class SolutionPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Solutions', [
            'seo' => Seo::where('page', 'solutions')->first(),

            'solutions' => Solution::select(
                'id',
                'title',
                'title_ja',
                'slug',
                'hero_description',
                'hero_description_ja',
                'link'
            )
                ->orderBy('id') 
                ->get(),

            'solutionNav' => Solution::select(
                'title',
                'title_ja',
                'slug'
            )
                ->orderBy('id')
                ->get(),
        ]);
    }

   public function show(string $slug)
{
    $solution = Solution::where('slug', $slug)
        ->with([
            'features:id,solution_id,title,title_ja,description,description_ja',
            'useCases:id,solution_id,title,title_ja,subtitle,subtitle_ja,description,description_ja',
            'industries:id,solution_id,title,title_ja,description,description_ja',
            'caseStudies:id,solution_id,title,title_ja,summary,summary_ja,result,result_ja',
        ])
        ->firstOrFail();

    return Inertia::render('Solutions/Show', [
        'solution' => $solution,

        'solutionNav' => Solution::select(
                'title',
                'title_ja',
                'slug'
            )
            ->orderBy('id')
            ->get(),
    ]);
}
}
