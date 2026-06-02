<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\IndiaDesk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class IndiaDeskController extends Controller
{
    private const WITH = ['highlights', 'benefits', 'pageFaqs', 'pageIndustries'];

    /* ─────────── INDEX ─────────── */

    public function index()
    {
        return Inertia::render('Admin/IndiaDesks/Index', [
            'india_desks' => IndiaDesk::with(self::WITH)->latest()->get(),
        ]);
    }

    /* ─────────── VALIDATION ─────────── */

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        /*
         * Slug is REQUIRED — never allow null to reach the DB.
         * If somehow empty, fall back to a slugified title so the
         * DB constraint is never violated.
         */
        $slugRule = $ignoreId
            ? 'required|string|max:255|unique:india_desks,slug,' . $ignoreId
            : 'required|string|max:255|unique:india_desks,slug';

        $request->validate([
            'title'               => 'required|string|max:255',
            'title_ja'            => 'nullable|string|max:255',
            'slug'                => $slugRule,
            'subtitle'            => 'nullable|string',
            'subtitle_ja'         => 'nullable|string',
            'hero_description'    => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'supporting_growth'        => 'nullable|string',
            'supporting_growth_ja'     => 'nullable|string',
            'about'                => 'nullable|string',
            'about_ja'             => 'nullable|string',
            'about_indosakura'     => 'nullable|string',
            'about_indosakura_ja'  => 'nullable|string',
            'overview'            => 'nullable|string',
            'overview_ja'         => 'nullable|string',
            'cta_label'           => 'nullable|string|max:255',
            'cta_label_ja'        => 'nullable|string|max:255',
            'cta_url'             => 'nullable|string|max:255',
            'hero_image'          => 'nullable|image|max:4096',
            /* JSON arrays sent as strings via FormData */
            'highlights'          => 'nullable',
            'benefits'            => 'nullable',
            'service_items'       => 'nullable',
            'why_choose'          => 'nullable',
            'approach_steps'      => 'nullable',
            'testimonials'        => 'nullable',
            'tech_stack'          => 'nullable',
            'page_faqs'           => 'nullable',
            'page_industries'     => 'nullable',
        ], [
            'title.required' => 'The India Desk title is required.',
            'slug.required'  => 'The slug is required. It is used in the URL.',
            'slug.unique'    => 'This slug is already taken by another India Desk.',
        ]);

        $jsonKeys = [
            'highlights',
            'benefits',
            'service_items',
            'why_choose',
            'approach_steps',
            'testimonials',
            'tech_stack',
            'page_faqs',
            'page_industries',
        ];

        $decoded = [];
        foreach ($jsonKeys as $key) {
            $decoded[$key] = $request->filled($key)
                ? json_decode($request->input($key), true)
                : [];
        }

        return $decoded;
    }

    /* ─────────── SYNC RELATIONS ─────────── */

    private function syncRelations(IndiaDesk $indiaDesk, array $decoded): void
    {
        // Highlights
        $indiaDesk->highlights()->delete();
        foreach ($decoded['highlights'] as $i => $item) {
            $indiaDesk->highlights()->create([
                'title'          => $item['title'] ?? '',
                'title_ja'       => $item['title_ja'] ?? null,
                'value'          => $item['value'] ?? null,
                'description'    => $item['description'] ?? null,
                'description_ja' => $item['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        // Benefits
        $indiaDesk->benefits()->delete();
        foreach ($decoded['benefits'] as $i => $item) {
            $indiaDesk->benefits()->create([
                'title'          => $item['title'] ?? '',
                'title_ja'       => $item['title_ja'] ?? null,
                'description'    => $item['description'] ?? null,
                'description_ja' => $item['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        // Per-IndiaDesk FAQs → india_desk_page_faqs
        $indiaDesk->pageFaqs()->delete();
        foreach ($decoded['page_faqs'] as $i => $item) {
            $indiaDesk->pageFaqs()->create([
                'question'    => $item['question'] ?? '',
                'question_ja' => $item['question_ja'] ?? null,
                'answer'      => $item['answer'] ?? '',
                'answer_ja'   => $item['answer_ja'] ?? null,
                'sort_order'  => $i,
            ]);
        }

        // Per-IndiaDesk Industries → india_desk_page_industries
        $indiaDesk->pageIndustries()->delete();
        foreach ($decoded['page_industries'] as $i => $item) {
            $indiaDesk->pageIndustries()->create([
                'title'          => $item['title'] ?? '',
                'title_ja'       => $item['title_ja'] ?? null,
                'description'    => $item['description'] ?? null,
                'description_ja' => $item['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        // JSON columns stored on the service row
        $indiaDesk->update([
            'service_items'  => $decoded['service_items'],
            'why_choose'     => $decoded['why_choose'],
            'approach_steps' => $decoded['approach_steps'],
            'testimonials'   => $decoded['testimonials'],
            'tech_stack'     => $decoded['tech_stack'],
        ]);
    }

    /* ─────────── BUILD MAIN PAYLOAD ─────────── */

    private function buildPayload(Request $request, ?string $existingImage = null): array
    {
        /*
         * Safety net: if slug is somehow still empty after validation,
         * generate one from the title rather than let a null hit the DB.
         */
        $slug = trim($request->input('slug', ''));
        if ($slug === '') {
            $slug = Str::slug($request->input('title', 'indiadesk-' . time()));
        }

        return [
            'title'               => $request->title,
            'title_ja'            => $request->title_ja,
            'slug'                => $slug,
            'subtitle'            => $request->subtitle,
            'subtitle_ja'         => $request->subtitle_ja,
            'hero_description'    => $request->hero_description,
            'hero_description_ja' => $request->hero_description_ja,
            'supporting_growth'        => $request->supporting_growth,
            'supporting_growth_ja'     => $request->supporting_growth_ja,
            'about'        => $request->about,
            'about_ja'     => $request->about_ja,
            'about_indosakura'     => $request->about_indosakura,
            'about_indosakura_ja'  => $request->about_indosakura_ja,
            'overview'            => $request->overview,
            'overview_ja'         => $request->overview_ja,
            'cta_label'           => $request->cta_label,
            'cta_label_ja'        => $request->cta_label_ja,
            'cta_url'             => $request->cta_url ?? '/contact',
            'hero_image'          => $existingImage,
        ];
    }

    /* ─────────── STORE ─────────── */

    public function store(Request $request)
    {
        $decoded = $this->validated($request);

        DB::transaction(function () use ($request, $decoded) {
            $heroImage = $request->hasFile('hero_image')
                ? $request->file('hero_image')->store('indiadesks', 'public')
                : null;

            $payload = $this->buildPayload($request, $heroImage);
            $indiaDesk = IndiaDesk::create($payload);
            $this->syncRelations($indiaDesk, $decoded);
        });

        return redirect()->route('admin.india_desks.index')
            ->with('success', 'IndiaDesk saved successfully.');
    }

    /* ─────────── UPDATE ─────────── */

    public function update(Request $request, IndiaDesk $indiaDesk)
    {
        $decoded = $this->validated($request, $indiaDesk->id);

        DB::transaction(function () use ($request, $indiaDesk, $decoded) {
            $heroImage = $indiaDesk->hero_image;
            if ($request->hasFile('hero_image')) {
                if ($indiaDesk->hero_image) {
                    Storage::disk('public')->delete($indiaDesk->hero_image);
                }
                $heroImage = $request->file('hero_image')->store('indiadesks', 'public');
            }

            $payload = $this->buildPayload($request, $heroImage);
            $indiaDesk->update($payload);
            $this->syncRelations($indiaDesk, $decoded);
        });

        return redirect()->route('admin.india_desks.index')
            ->with('success', 'IndiaDesk updated successfully.');
    }

    /* ─────────── SHOW (admin panel view) ─────────── */

    public function show(IndiaDesk $indiaDesk)
    {
        return Inertia::render('Admin/IndiaDesks/Index', [
            'indiadesks' => IndiaDesk::with(self::WITH)->get(),
            'indiaDesk'  => $indiaDesk->load(self::WITH),
        ]);
    }

    /* ─────────── DESTROY ─────────── */

    public function destroy(IndiaDesk $indiaDesk)
    {
        DB::transaction(function () use ($indiaDesk) {
            if ($indiaDesk->hero_image) {
                Storage::disk('public')->delete($indiaDesk->hero_image);
            }
            $indiaDesk->highlights()->delete();
            $indiaDesk->benefits()->delete();
            $indiaDesk->pageFaqs()->delete();
            $indiaDesk->pageIndustries()->delete();
            $indiaDesk->delete();
        });

        return redirect()->route('admin.india_desks.index')
            ->with('success', 'IndiaDesk deleted successfully.');
    }
}
