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
            'supporting_growth'   => 'nullable|string',
            'supporting_growth_ja' => 'nullable|string',
            'about'               => 'nullable|string',
            'about_ja'            => 'nullable|string',
            'about_indosakura'    => 'nullable|string',
            'about_indosakura_ja' => 'nullable|string',
            'overview'            => 'nullable|string',
            'overview_ja'         => 'nullable|string',
            'cta_label'           => 'nullable|string|max:255',
            'cta_label_ja'        => 'nullable|string|max:255',
            'cta_url'             => 'nullable|string|max:255',
            'hero_image'          => 'nullable|image|max:4096',
            // SEO
            'meta_title'          => 'nullable|string|max:255',
            'meta_title_ja'       => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_description_ja' => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
            'meta_keywords_ja'    => 'nullable|string|max:500',
            'og_image'            => 'nullable|image|max:4096',
            // Case study logos — indexed file inputs
            'case_study_logos'    => 'nullable|array',
            'case_study_logos.*'  => 'nullable|image|max:2048',
            'case_study_hero_images'       => 'nullable|array',
            'case_study_hero_images.*'     => 'nullable|image|max:4096',
            // JSON arrays
            'highlights'          => 'nullable',
            'benefits'            => 'nullable',
            'service_items'       => 'nullable',
            'why_choose'          => 'nullable',
            'approach_steps'      => 'nullable',
            'testimonials'        => 'nullable',
            'tech_stack'          => 'nullable',
            'case_studies'        => 'nullable',
            'page_faqs'           => 'nullable',
            'page_industries'     => 'nullable',
            'case_study_secondary_images'  => 'nullable|array',
            'case_study_secondary_images.*' => 'nullable|image|max:4096',
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
            'case_studies',
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

    /* ─────────── PROCESS CASE STUDY LOGOS ─────────── */

    /**
     * For each case study in the decoded array:
     *  - If a new file was uploaded at case_study_logos[i], store it and set logo URL.
     *  - Otherwise preserve the existing logo URL from $existing[i]['logo'].
     * Old logo files are deleted from storage when replaced.
     */
     private function processCaseStudyMedia(
        Request $request,
        array $caseStudies,
        array $existing = []
    ): array {
        $usedSlugs = array_filter(array_column($caseStudies, 'slug'));

        foreach ($caseStudies as $i => &$cs) {
            // Logo (stored as full asset() URL — legacy behavior)
            if ($request->hasFile("case_study_logos.{$i}")) {
                $this->deleteOldCaseStudyFile($existing[$i]['logo'] ?? null, true);
                $stored     = $request->file("case_study_logos.{$i}")->store('indiadesks/cs_logos', 'public');
                $cs['logo'] = asset('storage/' . $stored);
            } else {
                $cs['logo'] = $existing[$i]['logo'] ?? ($cs['logo'] ?? null);
            }

            // Hero image (stored as relative path, like the desk's own hero_image)
            if ($request->hasFile("case_study_hero_images.{$i}")) {
                $this->deleteOldCaseStudyFile($existing[$i]['hero_image'] ?? null, false);
                $cs['hero_image'] = $request->file("case_study_hero_images.{$i}")->store('indiadesks/cs_hero', 'public');
            } else {
                $cs['hero_image'] = $existing[$i]['hero_image'] ?? ($cs['hero_image'] ?? null);
            }

            // Secondary image
            if ($request->hasFile("case_study_secondary_images.{$i}")) {
                $this->deleteOldCaseStudyFile($existing[$i]['secondary_image'] ?? null, false);
                $cs['secondary_image'] = $request->file("case_study_secondary_images.{$i}")->store('indiadesks/cs_secondary', 'public');
            } else {
                $cs['secondary_image'] = $existing[$i]['secondary_image'] ?? ($cs['secondary_image'] ?? null);
            }

            // Slug — preserve on edit (keeps public URLs stable), derive from title otherwise
            $preserved = $existing[$i]['slug'] ?? ($cs['slug'] ?? null);
            $base      = $preserved ?: (Str::slug($cs['title'] ?? '') ?: 'case-study-' . ($i + 1));
            $slug      = $base;
            $n         = 2;
            while (in_array($slug, array_diff($usedSlugs, [$preserved]), true) || (isset($cs['slug']) === false && in_array($slug, $usedSlugs, true))) {
                $slug = $base . '-' . $n++;
            }
            $cs['slug']  = $slug;
            $usedSlugs[$i] = $slug;
        }
        unset($cs);

        return $caseStudies;
    }

     private function deleteOldCaseStudyFile(?string $value, bool $isAssetUrl): void
    {
        if (!$value) return;
        $relative = $isAssetUrl
            ? ltrim(str_replace(asset('storage'), '', $value), '/')
            : $value;
        if ($relative && Storage::disk('public')->exists($relative)) {
            Storage::disk('public')->delete($relative);
        }
    }

    /* ─────────── SYNC RELATIONS ─────────── */

    private function syncRelations(IndiaDesk $indiaDesk, array $decoded): void
    {
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

        $indiaDesk->update([
            'service_items'  => $decoded['service_items'],
            'why_choose'     => $decoded['why_choose'],
            'approach_steps' => $decoded['approach_steps'],
            'testimonials'   => $decoded['testimonials'],
            'tech_stack'     => $decoded['tech_stack'],
            'case_studies'   => $decoded['case_studies'], // logos already baked in
        ]);
    }

    /* ─────────── BUILD MAIN PAYLOAD ─────────── */

    private function buildPayload(
        Request $request,
        ?string $existingImage = null,
        ?string $existingOgImage = null
    ): array {
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
            'supporting_growth'   => $request->supporting_growth,
            'supporting_growth_ja' => $request->supporting_growth_ja,
            'about'               => $request->about,
            'about_ja'            => $request->about_ja,
            'about_indosakura'    => $request->about_indosakura,
            'about_indosakura_ja' => $request->about_indosakura_ja,
            'overview'            => $request->overview,
            'overview_ja'         => $request->overview_ja,
            'cta_label'           => $request->cta_label,
            'cta_label_ja'        => $request->cta_label_ja,
            'cta_url'             => $request->cta_url ?? '/contact',
            'hero_image'          => $existingImage,
            'meta_title'          => $request->meta_title,
            'meta_title_ja'       => $request->meta_title_ja,
            'meta_description'    => $request->meta_description,
            'meta_description_ja' => $request->meta_description_ja,
            'meta_keywords'       => $request->meta_keywords,
            'meta_keywords_ja'    => $request->meta_keywords_ja,
            'og_image'            => $existingOgImage,
        ];
    }

    /* ─────────── STORE ─────────── */

  public function store(Request $request)
    {
        $decoded = $this->validated($request);

        $decoded['case_studies'] = $this->processCaseStudyMedia(
            $request,
            $decoded['case_studies'] ?? []
        );

        DB::transaction(function () use ($request, $decoded) {
            $heroImage = $request->hasFile('hero_image')
                ? $request->file('hero_image')->store('indiadesks', 'public')
                : null;

            $ogImage = $request->hasFile('og_image')
                ? $request->file('og_image')->store('indiadesks/og', 'public')
                : null;

            $payload   = $this->buildPayload($request, $heroImage, $ogImage);
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

        $decoded['case_studies'] = $this->processCaseStudyMedia(
            $request,
            $decoded['case_studies'] ?? [],
            $indiaDesk->case_studies ?? []
        );

        DB::transaction(function () use ($request, $indiaDesk, $decoded) {
            // ...unchanged hero/og image handling...
            $heroImage = $indiaDesk->hero_image;
            if ($request->hasFile('hero_image')) {
                if ($indiaDesk->hero_image) {
                    Storage::disk('public')->delete($indiaDesk->hero_image);
                }
                $heroImage = $request->file('hero_image')->store('indiadesks', 'public');
            }

            $ogImage = $indiaDesk->og_image;
            if ($request->hasFile('og_image')) {
                if ($indiaDesk->og_image) {
                    Storage::disk('public')->delete($indiaDesk->og_image);
                }
                $ogImage = $request->file('og_image')->store('indiadesks/og', 'public');
            }

            $payload = $this->buildPayload($request, $heroImage, $ogImage);
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
            foreach (['hero_image', 'og_image'] as $img) {
                if ($indiaDesk->{$img}) {
                    Storage::disk('public')->delete($indiaDesk->{$img});
                }
            }

            // Delete all case study logos stored in JSON
            if (is_array($indiaDesk->case_studies)) {
                foreach ($indiaDesk->case_studies as $cs) {
                    $logoUrl = $cs['logo'] ?? null;
                    if ($logoUrl) {
                        $relative = ltrim(str_replace(asset('storage'), '', $logoUrl), '/');
                        if ($relative && Storage::disk('public')->exists($relative)) {
                            Storage::disk('public')->delete($relative);
                        }
                    }
                }
            }
            if (is_array($indiaDesk->case_studies)) {
                foreach ($indiaDesk->case_studies as $cs) {
                    $this->deleteOldCaseStudyFile($cs['logo'] ?? null, true);
                    $this->deleteOldCaseStudyFile($cs['hero_image'] ?? null, false);
                    $this->deleteOldCaseStudyFile($cs['secondary_image'] ?? null, false);
                }
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
