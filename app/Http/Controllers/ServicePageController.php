<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Faq;
use Inertia\Inertia;
use App\Models\ServiceIndustry;
use App\Models\Seo;

class ServicePageController extends Controller
{
    public function index()
    {
        return Inertia::render('Services', [
            'lang' => app()->getLocale(),
            'seo' => Seo::where('page', 'services')->first(),
            'services' => Service::select(
                'id',
                'title',
                'title_ja',
                'slug',
                'subtitle',
                'subtitle_ja',
                'hero_image'
            )
                ->orderBy('id')
                ->get(),

            'faqs' => Faq::select(
                'id',
                'question',
                'question_ja',
                'answer',
                'answer_ja'
            )
                ->orderBy('id')
                ->get(),

            'industries' => ServiceIndustry::select(
                'id',
                'title',
                'title_ja',
                'description',
                'description_ja'
            )->orderBy('sort_order')->get(),

            'serviceNav' => Service::select('title', 'title_ja', 'slug')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)
            ->with(['highlights', 'benefits'])
            ->firstOrFail();

        return Inertia::render('Services/Show', [
            'service' => $service,

            'serviceNav' => Service::select('title', 'slug')
                ->orderBy('id')
                ->get(),
        ]);
    }
}
