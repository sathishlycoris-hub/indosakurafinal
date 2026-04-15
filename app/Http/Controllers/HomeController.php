<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Solution;
use App\Models\Newsevent;
use App\Models\Seo;
use App\Models\CaseStudy;

use App\Models\HomepageSetting;

class HomeController extends Controller
{
    public function index()
    {

        $homepage = HomepageSetting::firstOrCreate([]);

        return Inertia::render('Index', [

            // ── homepage CMS content ──
            'homepage' => $homepage,
            'seo' => Seo::where('page', 'home')->first(),

            'updates' => Newsevent::orderBy('date', 'desc')
                ->take(6)
                ->get(['id', 'date', 'eventtype', 'short', 'short_ja']),

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

            'caseStudies' => CaseStudy::select(
                'subtitle',
                'subtitle_ja',
                'slug',
                'hero_image',
                'tags'
            )
                ->latest()
                ->take(4)
                ->get(),
        ]);
    }
}
