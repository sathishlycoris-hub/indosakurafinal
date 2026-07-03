<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Solution;
use App\Models\Newsevent;
use App\Models\Seo;
use App\Models\IndiaDesk;

use App\Models\HomepageSetting;

class HomeController extends Controller
{
    public function index()
    {

        $homepage = HomepageSetting::firstOrCreate([]);

        $caseStudies = IndiaDesk::allCaseStudiesFlattened()
            ->sortByDesc(fn ($cs) => $cs['india_desk_id'] ?? 0) // no created_at on the JSON items — newest desk first as a reasonable proxy
            ->take(4)
            ->map(fn ($cs) => [
                'slug'                => $cs['slug'] ?? null,
                'title'               => $cs['title'] ?? '',
                'title_ja'            => $cs['title_ja'] ?? null,
                'hero_image'          => $cs['hero_image'] ?? null,
                'hero_description'    => $cs['hero_description'] ?? null,
                'hero_description_ja' => $cs['hero_description_ja'] ?? null,
                'tags'                => $cs['tags'] ?? null,
                'tags_ja'             => $cs['tags_ja'] ?? null,
                'india_desk_slug'     => $cs['india_desk_slug'] ?? null,
            ])
            ->values();

        return Inertia::render('Index', [

            // ── homepage CMS content ──
            'homepage' => $homepage,
            'seo' => Seo::where('page', 'home')->first(),

            'updates' => Newsevent::orderBy('date', 'desc')
                ->take(6)
                ->get(['id', 'date', 'eventtype', 'eventtype_ja', 'short', 'short_ja']),

            'services' => Service::select(
                'id',
                'title',
                'slug',
                'hero_description',
                'title_ja',
                'hero_description_ja'
            )->orderBy('id')->get(),

            'solutions' => Solution::select(
                'id',
                'title',
                'slug',
                'hero_description',
                'title_ja',
                'hero_description_ja'
            )->orderBy('id')->get(),

            'caseStudies' => $caseStudies,
        ]);
    }
}