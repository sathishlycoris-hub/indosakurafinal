<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Faq;
use App\Models\IndiaDesk;
use App\Models\IndiaDeskFaq;
use App\Models\IndiaDeskIndustry;
use Inertia\Inertia;
use App\Models\ServiceIndustry;   // global industries panel — untouched
use App\Models\Seo;

class IndiaDeskPageController extends Controller
{
    /* ─── India Desk listing page ─── */
    public function index()
    {
        return Inertia::render('IndiaDesks', [
            'lang' => app()->getLocale(),
            'seo'  => Seo::where('page', 'india-desks')->first(),

            'indiaDesks' => IndiaDesk::select(
                'id',
                'title',
                'title_ja',
                'slug',
                'subtitle',
                'subtitle_ja',
                'hero_image',
                'overview',
                'overview_ja',
                'about',
                'about_ja',
                'about_indosakura',
                'about_indosakura_ja',
                'supporting_growth',
                'supporting_growth_ja'
            )
                ->orderBy('id')->get(),

            'faqs' => IndiaDeskFaq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
                ->orderBy('id')->get(),

            // Global industries (IndiaDeskIndustry panel) used on the /india-desks listing page
            'industries' => IndiaDeskIndustry::select('id', 'title', 'title_ja', 'description', 'description_ja')
                ->orderBy('sort_order')->get(),

            'indiaDeskNav' => IndiaDesk::select('title', 'title_ja', 'slug')->orderBy('id')->get(),
        ]);
    }

    /* ─── India Desk detail page ─── */
    public function show(string $slug)
    {
        $indiaDesk = IndiaDesk::where('slug', $slug)
            ->with([
                'highlights',
                'benefits',
                'pageFaqs',        // india_desk_page_faqs
                'pageIndustries',  // india_desk_page_industries
            ])
            ->firstOrFail();

        /*
         * FAQ resolution:
         *   Per-service page FAQs (service_page_faqs) take priority.
         *   Falls back to the global Faq table when none are set.
         */
        $faqs = $indiaDesk->pageFaqs->isNotEmpty()
            ? $indiaDesk->pageFaqs
            : Faq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
            ->orderBy('id')
            ->get();

        /*
         * Industry resolution:
         *   Per-service page industries (service_page_industries) take priority.
         *   Falls back to the global ServiceIndustry table when none are set.
         */
        $industries = $indiaDesk->pageIndustries->isNotEmpty()
            ? $indiaDesk->pageIndustries
            : IndiaDeskIndustry::select('id', 'title', 'title_ja', 'description', 'description_ja')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('IndiaDesks/Show', [
            'lang'           => app()->getLocale(),
            'indiaDesk'        => $indiaDesk,
            'faqs'           => $faqs,
            'faqSource'      => $indiaDesk->pageFaqs->isNotEmpty() ? 'indiaDesk' : 'global',
            'industries'     => $industries,
            'industrySource' => $indiaDesk->pageIndustries->isNotEmpty() ? 'indiaDesk' : 'global',
            'indiaDeskNav'     => IndiaDesk::select('title', 'title_ja', 'slug')->orderBy('id')->get(),
        ]);
    }
}
