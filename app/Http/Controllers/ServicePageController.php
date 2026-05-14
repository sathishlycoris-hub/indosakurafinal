<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Faq;
use Inertia\Inertia;
use App\Models\ServiceIndustry;   // global industries panel — untouched
use App\Models\Seo;

class ServicePageController extends Controller
{
    /* ─── Services listing page ─── */
    public function index()
    {
        return Inertia::render('Services', [
            'lang' => app()->getLocale(),
            'seo'  => Seo::where('page', 'services')->first(),

            'services' => Service::select('id', 'title', 'title_ja', 'slug', 'subtitle', 'subtitle_ja', 'hero_image')
                ->orderBy('id')->get(),

            'faqs' => Faq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
                ->orderBy('id')->get(),

            // Global industries (ServiceIndustry panel) used on the /services listing page
            'industries' => ServiceIndustry::select('id', 'title', 'title_ja', 'description', 'description_ja')
                ->orderBy('sort_order')->get(),

            'serviceNav' => Service::select('title', 'title_ja', 'slug')->orderBy('id')->get(),
        ]);
    }

    /* ─── Service detail page ─── */
    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)
            ->with([
                'highlights',
                'benefits',
                'pageFaqs',        // service_page_faqs
                'pageIndustries',  // service_page_industries
            ])
            ->firstOrFail();

        /*
         * FAQ resolution:
         *   Per-service page FAQs (service_page_faqs) take priority.
         *   Falls back to the global Faq table when none are set.
         */
        $faqs = $service->pageFaqs->isNotEmpty()
            ? $service->pageFaqs
            : Faq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
                ->orderBy('id')
                ->get();

        /*
         * Industry resolution:
         *   Per-service page industries (service_page_industries) take priority.
         *   Falls back to the global ServiceIndustry table when none are set.
         */
        $industries = $service->pageIndustries->isNotEmpty()
            ? $service->pageIndustries
            : ServiceIndustry::select('id', 'title', 'title_ja', 'description', 'description_ja')
                ->orderBy('sort_order')
                ->get();

        return Inertia::render('Services/Show', [
            'lang'           => app()->getLocale(),
            'service'        => $service,
            'faqs'           => $faqs,
            'faqSource'      => $service->pageFaqs->isNotEmpty() ? 'service' : 'global',
            'industries'     => $industries,
            'industrySource' => $service->pageIndustries->isNotEmpty() ? 'service' : 'global',
            'serviceNav'     => Service::select('title', 'title_ja', 'slug')->orderBy('id')->get(),
        ]);
    }
}