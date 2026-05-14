<?php

namespace App\Http\Controllers\Admin;

use App\Models\Service;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    private const WITH = ['highlights', 'benefits', 'pageFaqs', 'pageIndustries'];

    /* ─────────── INDEX ─────────── */

    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::with(self::WITH)->latest()->get(),
        ]);
    }

    /* ─────────── VALIDATION ─────────── */

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        $slugRule = $ignoreId
            ? 'nullable|string|unique:services,slug,' . $ignoreId
            : 'nullable|string|unique:services';

        $request->validate([
            'title'               => 'nullable|string',
            'title_ja'            => 'nullable|string',
            'slug'                => $slugRule,
            'subtitle'            => 'nullable|string',
            'subtitle_ja'         => 'nullable|string',
            'hero_description'    => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'how_it_works'        => 'nullable|string',
            'how_it_works_ja'     => 'nullable|string',
            'overview'            => 'nullable|string',
            'overview_ja'         => 'nullable|string',
            'cta_label'           => 'nullable|string|max:255',
            'cta_label_ja'        => 'nullable|string|max:255',
            'cta_url'             => 'nullable|string|max:255',
            'hero_image'          => 'nullable|image|max:4096',
            'highlights'          => 'nullable',
            'benefits'            => 'nullable',
            'service_items'       => 'nullable',
            'why_choose'          => 'nullable',
            'approach_steps'      => 'nullable',
            'testimonials'        => 'nullable',
            'tech_stack'          => 'nullable',
            'page_faqs'           => 'nullable',        // NEW key
            'page_industries'     => 'nullable',        // NEW key
        ]);

        $jsonKeys = [
            'highlights', 'benefits',
            'service_items', 'why_choose', 'approach_steps',
            'testimonials', 'tech_stack',
            'page_faqs',        // NEW
            'page_industries',  // NEW
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

    private function syncRelations(Service $service, array $decoded): void
    {
        // Highlights
        $service->highlights()->delete();
        foreach ($decoded['highlights'] as $i => $item) {
            $service->highlights()->create([
                'title'          => $item['title'] ?? '',
                'title_ja'       => $item['title_ja'] ?? null,
                'value'          => $item['value'] ?? null,
                'description'    => $item['description'] ?? null,
                'description_ja' => $item['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        // Benefits
        $service->benefits()->delete();
        foreach ($decoded['benefits'] as $i => $item) {
            $service->benefits()->create([
                'title'          => $item['title'] ?? '',
                'title_ja'       => $item['title_ja'] ?? null,
                'description'    => $item['description'] ?? null,
                'description_ja' => $item['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        // Per-service Page FAQs → service_page_faqs
        $service->pageFaqs()->delete();
        foreach ($decoded['page_faqs'] as $i => $item) {
            $service->pageFaqs()->create([
                'question'    => $item['question'] ?? '',
                'question_ja' => $item['question_ja'] ?? null,
                'answer'      => $item['answer'] ?? '',
                'answer_ja'   => $item['answer_ja'] ?? null,
                'sort_order'  => $i,
            ]);
        }

        // Per-service Page Industries → service_page_industries
        $service->pageIndustries()->delete();
        foreach ($decoded['page_industries'] as $i => $item) {
            $service->pageIndustries()->create([
                'title'          => $item['title'] ?? '',
                'title_ja'       => $item['title_ja'] ?? null,
                'description'    => $item['description'] ?? null,
                'description_ja' => $item['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        // JSON columns on the service row
        $service->update([
            'service_items'  => $decoded['service_items'],
            'why_choose'     => $decoded['why_choose'],
            'approach_steps' => $decoded['approach_steps'],
            'testimonials'   => $decoded['testimonials'],
            'tech_stack'     => $decoded['tech_stack'],
        ]);
    }

    /* ─────────── STORE ─────────── */

    public function store(Request $request)
    {
        $decoded = $this->validated($request);

        DB::transaction(function () use ($request, $decoded) {
            $heroImage = $request->hasFile('hero_image')
                ? $request->file('hero_image')->store('services', 'public')
                : null;

            $service = Service::create([
                'title'               => $request->title,
                'title_ja'            => $request->title_ja,
                'slug'                => $request->slug,
                'subtitle'            => $request->subtitle,
                'subtitle_ja'         => $request->subtitle_ja,
                'hero_description'    => $request->hero_description,
                'hero_description_ja' => $request->hero_description_ja,
                'how_it_works'        => $request->how_it_works,
                'how_it_works_ja'     => $request->how_it_works_ja,
                'overview'            => $request->overview,
                'overview_ja'         => $request->overview_ja,
                'cta_label'           => $request->cta_label,
                'cta_label_ja'        => $request->cta_label_ja,
                'cta_url'             => $request->cta_url ?? '/contact',
                'hero_image'          => $heroImage,
            ]);

            $this->syncRelations($service, $decoded);
        });

        return redirect()->route('admin.services.index')
            ->with('success', 'Service saved successfully');
    }

    /* ─────────── UPDATE ─────────── */

    public function update(Request $request, Service $service)
    {
        $decoded = $this->validated($request, $service->id);

        DB::transaction(function () use ($request, $service, $decoded) {
            $heroImage = $service->hero_image;
            if ($request->hasFile('hero_image')) {
                if ($service->hero_image) {
                    Storage::disk('public')->delete($service->hero_image);
                }
                $heroImage = $request->file('hero_image')->store('services', 'public');
            }

            $service->update([
                'title'               => $request->title,
                'title_ja'            => $request->title_ja,
                'slug'                => $request->slug,
                'subtitle'            => $request->subtitle,
                'subtitle_ja'         => $request->subtitle_ja,
                'hero_description'    => $request->hero_description,
                'hero_description_ja' => $request->hero_description_ja,
                'how_it_works'        => $request->how_it_works,
                'how_it_works_ja'     => $request->how_it_works_ja,
                'overview'            => $request->overview,
                'overview_ja'         => $request->overview_ja,
                'cta_label'           => $request->cta_label,
                'cta_label_ja'        => $request->cta_label_ja,
                'cta_url'             => $request->cta_url ?? '/contact',
                'hero_image'          => $heroImage,
            ]);

            $this->syncRelations($service, $decoded);
        });

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully');
    }

    /* ─────────── SHOW (admin panel view) ─────────── */

    public function show(Service $service)
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::with(self::WITH)->get(),
            'service'  => $service->load(self::WITH),
        ]);
    }

    /* ─────────── DESTROY ─────────── */

    public function destroy(Service $service)
    {
        DB::transaction(function () use ($service) {
            if ($service->hero_image) {
                Storage::disk('public')->delete($service->hero_image);
            }
            $service->highlights()->delete();
            $service->benefits()->delete();
            $service->pageFaqs()->delete();
            $service->pageIndustries()->delete();
            $service->delete();
        });

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully');
    }
}