<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Solution;
use App\Models\Newsevent;
use App\Models\Seo;
use App\Models\HomeCaseStudy;

use App\Models\HomepageSetting;

class HomeController extends Controller
{
    public function index()
    {

        $homepage = HomepageSetting::firstOrCreate([]);

        $caseStudies = HomeCaseStudy::orderBy('sort_order')
            ->orderByDesc('id')
            ->take(4)
            ->get([
                'slug',
                'title', 'title_ja',
                'hero_image',
                'hero_description', 'hero_description_ja',
                'tags', 'tags_ja',
            ]);

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
