<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Faq;
use Inertia\Inertia;
use App\Models\ServiceIndustry;
use App\Models\Seo;
use App\Models\ServicePage;

class ServicePageController extends Controller
{
    /* ─── Services listing page ─── */
    public function index()
    {
        return Inertia::render('Services', [
            'lang' => app()->getLocale(),
            'seo'  => Seo::where('page', 'services')->first(),
            'pageData' => ServicePage::first(),
            'services' => Service::select(
                'id', 'title', 'title_ja', 'slug',
                'subtitle', 'subtitle_ja', 'hero_image'
            )->orderBy('id')->get(),

            'faqs' => Faq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
                ->orderBy('id')->get(),

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
                'pageFaqs',
                'pageIndustries',
            ])
            ->firstOrFail();

        $lang = app()->getLocale();

        $faqs = $service->pageFaqs->isNotEmpty()
            ? $service->pageFaqs
            : Faq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
                ->orderBy('id')
                ->get();

        $industries = $service->pageIndustries->isNotEmpty()
            ? $service->pageIndustries
            : ServiceIndustry::select('id', 'title', 'title_ja', 'description', 'description_ja')
                ->orderBy('sort_order')
                ->get();

        return Inertia::render('Services/Show', [
            'lang'    => $lang,
            'service' => $service,
            'faqs'    => $faqs,

            // Resolved SEO data ready for <Head> in React
            'pageSeo' => [
                'meta_title'       => $service->getEffectiveMetaTitle($lang),
                'meta_description' => $service->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($service->meta_keywords_ja ?? $service->meta_keywords ?? '')
                    : ($service->meta_keywords ?? ''),
                'og_image'         => $service->og_image
                    ? asset('storage/' . $service->og_image)
                    : ($service->hero_image ? asset('storage/' . $service->hero_image) : null),
            ],

            'faqSource'      => $service->pageFaqs->isNotEmpty() ? 'service' : 'global',
            'industries'     => $industries,
            'industrySource' => $service->pageIndustries->isNotEmpty() ? 'service' : 'global',
            'serviceNav'     => Service::select('title', 'title_ja', 'slug')->orderBy('id')->get(),
        ]);
    }
}