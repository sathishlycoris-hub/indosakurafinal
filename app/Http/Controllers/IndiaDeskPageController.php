<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Faq;
use App\Models\IndiaDesk;
use App\Models\IndiaDeskFaq;
use App\Models\IndiaDeskIndustry;
use App\Models\IndiaDeskPage;
use Inertia\Inertia;
use App\Models\ServiceIndustry;   // global industries panel — untouched
use App\Models\Seo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class IndiaDeskPageController extends Controller
{

    public function indexTop()
    {
        $pageData = IndiaDeskPage::first();

        return Inertia::render('Admin/IndiaDeskPage/Index', [
            'pageData' => $pageData ? [
                'id' => $pageData->id,
                'hero_title' => $pageData->hero_title,
                'hero_title_ja' => $pageData->hero_title_ja,
                'hero_subtitle' => $pageData->hero_subtitle,
                'hero_subtitle_ja' => $pageData->hero_subtitle_ja,
                'hero_description' => $pageData->hero_description,
                'hero_description_ja' => $pageData->hero_description_ja,
                'hero_image' => $pageData->hero_image,
                'highlights' => $pageData->highlights,
                'highlights_ja' => $pageData->highlights_ja,
                'supporting_growth' => $pageData->supporting_growth,
                'supporting_growth_ja' => $pageData->supporting_growth_ja,
                'about' => $pageData->about,
                'about_ja' => $pageData->about_ja,
                'about_indosakura' => $pageData->about_indosakura,
                'about_indosakura_ja' => $pageData->about_indosakura_ja,
                'cta_label' => $pageData->cta_label,
                'cta_label_ja' => $pageData->cta_label_ja,
                'cta_url' => $pageData->cta_url,
            ] : null,
            'india_desks' => IndiaDesk::orderBy('id')->get(['id', 'title', 'title_ja', 'slug', 'overview', 'overview_ja']),
        ]);
    }

    /* ─── India Desk listing page ─── */
    public function index()
    {
        $pageData = IndiaDeskPage::first();

        return Inertia::render('IndiaDesks', [
            'lang' => app()->getLocale(),
            'seo'  => Seo::where('page', 'india-desks')->first(),

            'pageData' => $pageData ? [
                'hero_title'           => $pageData->hero_title,
                'hero_title_ja'        => $pageData->hero_title_ja,
                'hero_subtitle'        => $pageData->hero_subtitle,
                'hero_subtitle_ja'     => $pageData->hero_subtitle_ja,
                'hero_description'     => $pageData->hero_description,
                'hero_description_ja'  => $pageData->hero_description_ja,
                'hero_image'           => $pageData->hero_image,
                'highlights'           => $pageData->highlights,
                'highlights_ja'        => $pageData->highlights_ja,
                'service_items'        => $pageData->service_items,
                'service_items_ja'     => $pageData->service_items_ja,
                'supporting_growth'    => $pageData->supporting_growth,
                'supporting_growth_ja' => $pageData->supporting_growth_ja,
                'about'                => $pageData->about,
                'about_ja'             => $pageData->about_ja,
                'about_indosakura'     => $pageData->about_indosakura,
                'about_indosakura_ja'  => $pageData->about_indosakura_ja,
                'cta_label'            => $pageData->cta_label,
                'cta_label_ja'         => $pageData->cta_label_ja,
                'cta_url'              => $pageData->cta_url,
            ] : null,

            'indiaDesks' => IndiaDesk::select(
                'id',
                'title',
                'title_ja',
                'slug',
                'about',
                'about_ja',
                'about_indosakura',
                'about_indosakura_ja',
                'overview',
                'overview_ja',
                'subtitle',
                'subtitle_ja',
                'hero_image',
            )->orderBy('id')->get(),

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
            : IndiaDeskFaq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
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

    public function update(Request $request)
    {

        $request->validate([
            'hero_title'           => 'required|string|max:255',
            'hero_title_ja'        => 'nullable|string|max:255',
            'hero_subtitle'        => 'nullable|string|max:255',
            'hero_subtitle_ja'     => 'nullable|string|max:255',
            'hero_description'     => 'nullable|string',
            'hero_description_ja'  => 'nullable|string',
            'supporting_growth'    => 'nullable|string',
            'supporting_growth_ja' => 'nullable|string',
            'about'                => 'nullable|string',
            'about_ja'             => 'nullable|string',
            'about_indosakura'     => 'nullable|string',
            'about_indosakura_ja'  => 'nullable|string',
            'cta_label'            => 'nullable|string|max:255',
            'cta_label_ja'         => 'nullable|string|max:255',
            'cta_url'              => 'nullable|string|max:255',
            'hero_image'           => 'nullable|image|max:4096', // Matches 4MB form threshold
            'highlights'           => 'nullable|string', // Validated as string since it arrives JSON-encoded
            'highlights_ja'        => 'nullable|string',
        ]);

        $pageData = IndiaDeskPage::first();

        if (!$pageData) {
            $pageData = new IndiaDeskPage();
            $pageData->id = 1;   // Force ID = 1
            $pageData->save();
        }

        $oldImageToDelete = null;
        $newHeroImage = $pageData->hero_image;

        if ($request->hasFile('hero_image')) {
            if ($pageData->hero_image) {
                $oldImageToDelete = $pageData->hero_image;
            }
            $newHeroImage = $request->file('hero_image')->store('indiadesks_page', 'public');
        }

        try {
            DB::transaction(function () use ($request, $pageData, $newHeroImage) {

                $highlightsDecoded = $request->filled('highlights')
                    ? json_decode($request->input('highlights'), true)
                    : [];

                $highlightsJaDecoded = $request->filled('highlights_ja')
                    ? json_decode($request->input('highlights_ja'), true)
                    : [];

                $serviceItemsDecoded   = $request->filled('service_items')
                    ? json_decode($request->input('service_items'), true) : [];

                $serviceItemsJaDecoded = $request->filled('service_items_ja')
                    ? json_decode($request->input('service_items_ja'), true) : [];

                $pageData->update([
                    'hero_title'           => $request->hero_title,
                    'hero_title_ja'        => $request->hero_title_ja,
                    'hero_subtitle'        => $request->hero_subtitle,
                    'hero_subtitle_ja'     => $request->hero_subtitle_ja,
                    'hero_description'     => $request->hero_description,
                    'hero_description_ja'  => $request->hero_description_ja,
                    'supporting_growth'    => $request->supporting_growth,
                    'supporting_growth_ja' => $request->supporting_growth_ja,
                    'about'                => $request->about,
                    'about_ja'             => $request->about_ja,
                    'about_indosakura'     => $request->about_indosakura,
                    'about_indosakura_ja'  => $request->about_indosakura_ja,
                    'cta_label'            => $request->cta_label,
                    'cta_label_ja'         => $request->cta_label_ja,
                    'cta_url'              => $request->cta_url ?? '/contact',
                    'hero_image'           => $newHeroImage,
                    'highlights'           => $highlightsDecoded,
                    'highlights_ja'        => $highlightsJaDecoded,
                ]);
            });

            if ($oldImageToDelete) {
                Storage::disk('public')->delete($oldImageToDelete);
            }
        } catch (\Exception $e) {
            if ($request->hasFile('hero_image') && $newHeroImage) {
                Storage::disk('public')->delete($newHeroImage);
            }

            throw $e;
        }

        return redirect()->back()->with('success', 'India Desk layout changes applied successfully.');
    }
}
