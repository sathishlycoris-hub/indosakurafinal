<?php

namespace App\Http\Controllers\Admin;

use App\Models\Service;
use App\Models\Blog;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\ServicePage;

class ServiceController extends Controller
{
    private const WITH = ['highlights', 'benefits', 'pageFaqs', 'pageIndustries', 'adminBlogs'];

    /* ─── INDEX ─── */
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::with(self::WITH)->latest()->get(),
            'pageData' => ServicePage::first(),
            // ★ NEW — full blog list for the "attach blogs to this service"
            // checklist. Kept lightweight (no content/HTML) since this is
            // just a picker, not an editor — blogs are still authored from
            // the dedicated Blogs admin section.
            'availableBlogs' => Blog::select('id', 'title', 'title_ja', 'slug', 'service_id', 'status')
                ->orderByDesc('published_date')
                ->get(),
        ]);
    }

    /* ─── VALIDATION ─── */
    private function validated(Request $request, ?int $ignoreId = null): array
    {
        $slugRule = $ignoreId
            ? 'required|string|max:255|unique:services,slug,' . $ignoreId
            : 'required|string|max:255|unique:services,slug';

        $request->validate([
            'title'               => 'required|string|max:255',
            'title_ja'            => 'nullable|string|max:255',
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
            // SEO
            'meta_title'          => 'nullable|string|max:255',
            'meta_title_ja'       => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_description_ja' => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
            'meta_keywords_ja'    => 'nullable|string|max:500',
            'og_image'            => 'nullable|image|max:4096',
            // JSON arrays
            'highlights'          => 'nullable',
            'benefits'            => 'nullable',
            'service_items'       => 'nullable',
            'why_choose'          => 'nullable',
            'approach_steps'      => 'nullable',
            'testimonials'        => 'nullable',
            'tech_stack'          => 'nullable',
            'page_faqs'           => 'nullable',
            'page_industries'     => 'nullable',
            // ★ NEW — array of existing blog IDs to attach to this service
            'blog_ids'            => 'nullable|array',
            'blog_ids.*'          => 'integer|exists:blogs,id',
        ], [
            'title.required' => 'The service title is required.',
            'slug.required'  => 'The slug is required. It is used in the URL.',
            'slug.unique'    => 'This slug is already taken by another service.',
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

        // ★ NEW — plain array field, not a JSON blob like the keys above
        $decoded['blog_ids'] = $request->input('blog_ids', []);

        return $decoded;
    }

    /* ─── SYNC RELATIONS ─── */
    private function syncRelations(Service $service, array $decoded): void
    {
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

        $service->update([
            'service_items'  => $decoded['service_items'],
            'why_choose'     => $decoded['why_choose'],
            'approach_steps' => $decoded['approach_steps'],
            'testimonials'   => $decoded['testimonials'],
            'tech_stack'     => $decoded['tech_stack'],
        ]);

        // ★ Sync attached blogs — one-to-many (a blog belongs to at most one
        // service). Detach any blog previously assigned to this service but
        // no longer in the submitted list, then assign the submitted ones.
        $blogIds = array_values(array_filter(array_map('intval', $decoded['blog_ids'] ?? [])));

        Blog::where('service_id', $service->id)
            ->whereNotIn('id', $blogIds)
            ->update(['service_id' => null]);

        if (!empty($blogIds)) {
            Blog::whereIn('id', $blogIds)->update(['service_id' => $service->id]);
        }
    }

    /* ─── BUILD PAYLOAD ─── */
    private function buildPayload(Request $request, ?string $existingImage = null, ?string $existingOgImage = null): array
    {
        $slug = trim($request->input('slug', ''));
        if ($slug === '') {
            $slug = Str::slug($request->input('title', 'service-' . time()));
        }

        return [
            'title'               => $request->title,
            'title_ja'            => $request->title_ja,
            'slug'                => $slug,
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
            'hero_image'          => $existingImage,
            // SEO
            'meta_title'          => $request->meta_title,
            'meta_title_ja'       => $request->meta_title_ja,
            'meta_description'    => $request->meta_description,
            'meta_description_ja' => $request->meta_description_ja,
            'meta_keywords'       => $request->meta_keywords,
            'meta_keywords_ja'    => $request->meta_keywords_ja,
            'og_image'            => $existingOgImage,
        ];
    }

    /* ─── STORE ─── */
    public function store(Request $request)
    {
        $decoded = $this->validated($request);

        DB::transaction(function () use ($request, $decoded) {
            $heroImage = $request->hasFile('hero_image')
                ? $request->file('hero_image')->store('services', 'public')
                : null;

            $ogImage = $request->hasFile('og_image')
                ? $request->file('og_image')->store('services/og', 'public')
                : null;

            $payload = $this->buildPayload($request, $heroImage, $ogImage);
            $service = Service::create($payload);
            $this->syncRelations($service, $decoded);
        });

        return redirect()->route('admin.services.index')->with('success', 'Service saved successfully.');
    }

    /* ─── UPDATE ─── */
    public function update(Request $request, Service $service)
    {
        $decoded = $this->validated($request, $service->id);

        DB::transaction(function () use ($request, $service, $decoded) {
            $heroImage = $service->hero_image;
            if ($request->hasFile('hero_image')) {
                if ($service->hero_image) Storage::disk('public')->delete($service->hero_image);
                $heroImage = $request->file('hero_image')->store('services', 'public');
            }

            $ogImage = $service->og_image;
            if ($request->hasFile('og_image')) {
                if ($service->og_image) Storage::disk('public')->delete($service->og_image);
                $ogImage = $request->file('og_image')->store('services/og', 'public');
            }

            $payload = $this->buildPayload($request, $heroImage, $ogImage);
            $service->update($payload);
            $this->syncRelations($service, $decoded);
        });

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully.');
    }

    /* ─── SHOW (admin panel view) ─── */
    public function show(Service $service)
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::with(self::WITH)->get(),
            'service'  => $service->load(self::WITH),
        ]);
    }

    /* ─── DESTROY ─── */
    public function destroy(Service $service)
    {
        DB::transaction(function () use ($service) {
            foreach (['hero_image', 'og_image'] as $img) {
                if ($service->{$img}) Storage::disk('public')->delete($service->{$img});
            }
            $service->highlights()->delete();
            $service->benefits()->delete();
            $service->pageFaqs()->delete();
            $service->pageIndustries()->delete();
            $service->delete();
        });

        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully.');
    }

    // add this new method
    public function updatePage(Request $request)
    {
        $data = $request->validate([
            'hero_title'       => 'nullable|string|max:255',
            'hero_title_ja'    => 'nullable|string|max:255',
            'hero_subtitle'    => 'nullable|string|max:255',
            'hero_subtitle_ja' => 'nullable|string|max:255',
        ]);

        ServicePage::updateOrCreate(['id' => 1], $data);

        return back()->with('success', 'Page settings saved');
    }
}
