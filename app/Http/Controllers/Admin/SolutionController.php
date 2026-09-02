<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Solution;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\SolutionPage; // add this import

class SolutionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Solutions/Index', [
            'solutions' => Solution::with(['features', 'useCases', 'caseStudies', 'industries', 'faqs', 'featuredBlogs'])
                ->latest()->get(),
            'pageData' => SolutionPage::first(), // ← add this
            // ★ NEW — full blog list for the "feature blogs on this solution"
            // checklist. Blogs are still authored under their actual parent
            // Service (Blogs admin section) — this is a display-only picker.
            'availableBlogs' => Blog::select('id', 'title', 'title_ja', 'slug', 'service_id', 'status')
                ->orderByDesc('published_date')
                ->get(),
        ]);
    }

    public function create() {}

    /* ─── STORE ─── */
    public function store(Request $request)
    {
        $request->validate([
            'title'               => 'nullable|string',
            'title_ja'            => 'nullable|string',
            'slug'                => 'nullable|string|unique:solutions',
            'subtitle'            => 'nullable|string',
            'subtitle_ja'         => 'nullable|string',
            'hero_description'    => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'hero_image'          => 'nullable|image|max:4096',
            'link'                => 'nullable|string',
            'meta_title'          => 'nullable|string|max:255',
            'meta_title_ja'       => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_description_ja' => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
            'meta_keywords_ja'    => 'nullable|string|max:500',
            'og_image'            => 'nullable|image|max:4096',
            'features'            => 'nullable',
            'use_cases'           => 'nullable',
            'case_studies'        => 'nullable',
            'industries'          => 'nullable',
            'faqs'                => 'nullable',
            // Case study media — indexed file inputs, same pattern as India Desk
            'case_study_logos'             => 'nullable|array',
            'case_study_logos.*'           => 'nullable|image|max:2048',
            'case_study_hero_images'       => 'nullable|array',
            'case_study_hero_images.*'     => 'nullable|image|max:4096',
            'case_study_secondary_images'  => 'nullable|array',
            'case_study_secondary_images.*' => 'nullable|image|max:4096',
            // ★ NEW — array of existing blog IDs to feature on this solution
            'blog_ids'            => 'nullable|array',
            'blog_ids.*'          => 'integer|exists:blogs,id',
        ]);

        $decoded = $this->decodeRelations($request);

        $decoded['case_studies'] = $this->processCaseStudyMedia(
            $request,
            $decoded['case_studies'] ?? []
        );

        $heroImage = $request->hasFile('hero_image')
            ? $request->file('hero_image')->store('solutions', 'public')
            : null;

        $ogImage = $request->hasFile('og_image')
            ? $request->file('og_image')->store('solutions/og', 'public')
            : null;

        $solution = Solution::create([
            'title'               => $request->title,
            'title_ja'            => $request->title_ja,
            'subtitle'            => $request->subtitle,
            'subtitle_ja'         => $request->subtitle_ja,
            'hero_description'    => $request->hero_description,
            'hero_description_ja' => $request->hero_description_ja,
            'slug'                => $request->slug,
            'link'                => $request->link,
            'hero_image'          => $heroImage,
            'meta_title'          => $request->meta_title,
            'meta_title_ja'       => $request->meta_title_ja,
            'meta_description'    => $request->meta_description,
            'meta_description_ja' => $request->meta_description_ja,
            'meta_keywords'       => $request->meta_keywords,
            'meta_keywords_ja'    => $request->meta_keywords_ja,
            'og_image'            => $ogImage,
        ]);

        $this->syncChildren($solution, $decoded);

        return redirect()->route('admin.solutions.index')->with('success', 'Solution created successfully');
    }

    public function show(Solution $solution) {}
    public function edit(Solution $solution) {}

    /* ─── UPDATE ─── */
    public function update(Request $request, Solution $solution)
    {
        $request->validate([
            'title'               => 'nullable|string',
            'title_ja'            => 'nullable|string',
            'subtitle'            => 'nullable|string',
            'subtitle_ja'         => 'nullable|string',
            'hero_description'    => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'slug'                => 'nullable|string|unique:solutions,slug,' . $solution->id,
            'hero_image'          => 'nullable|image|max:4096',
            'link'                => 'nullable|string',
            'meta_title'          => 'nullable|string|max:255',
            'meta_title_ja'       => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_description_ja' => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
            'meta_keywords_ja'    => 'nullable|string|max:500',
            'og_image'            => 'nullable|image|max:4096',
            'features'            => 'nullable',
            'use_cases'           => 'nullable',
            'case_studies'        => 'nullable',
            'industries'          => 'nullable',
            'faqs'                => 'nullable',
            'case_study_logos'             => 'nullable|array',
            'case_study_logos.*'           => 'nullable|image|max:2048',
            'case_study_hero_images'       => 'nullable|array',
            'case_study_hero_images.*'     => 'nullable|image|max:4096',
            'case_study_secondary_images'  => 'nullable|array',
            'case_study_secondary_images.*' => 'nullable|image|max:4096',
            // ★ NEW — array of existing blog IDs to feature on this solution
            'blog_ids'            => 'nullable|array',
            'blog_ids.*'          => 'integer|exists:blogs,id',
        ]);

        $decoded = $this->decodeRelations($request);

        $decoded['case_studies'] = $this->processCaseStudyMedia(
            $request,
            $decoded['case_studies'] ?? [],
            $solution->caseStudies()->orderBy('sort_order')->get()->toArray()
        );

        $heroImage = $solution->hero_image;
        if ($request->hasFile('hero_image')) {
            if ($solution->hero_image) Storage::disk('public')->delete($solution->hero_image);
            $heroImage = $request->file('hero_image')->store('solutions', 'public');
        }

        $ogImage = $solution->og_image;
        if ($request->hasFile('og_image')) {
            if ($solution->og_image) Storage::disk('public')->delete($solution->og_image);
            $ogImage = $request->file('og_image')->store('solutions/og', 'public');
        }

        $solution->update([
            'title'               => $request->title,
            'title_ja'            => $request->title_ja,
            'slug'                => $request->slug,
            'subtitle'            => $request->subtitle,
            'subtitle_ja'         => $request->subtitle_ja,
            'hero_description'    => $request->hero_description,
            'hero_description_ja' => $request->hero_description_ja,
            'hero_image'          => $heroImage,
            'link'                => $request->link,
            'meta_title'          => $request->meta_title,
            'meta_title_ja'       => $request->meta_title_ja,
            'meta_description'    => $request->meta_description,
            'meta_description_ja' => $request->meta_description_ja,
            'meta_keywords'       => $request->meta_keywords,
            'meta_keywords_ja'    => $request->meta_keywords_ja,
            'og_image'            => $ogImage,
        ]);

        $this->syncChildren($solution, $decoded);

        return redirect()->route('admin.solutions.index')->with('success', 'Solution updated successfully');
    }

    /* ─── DESTROY ─── */
    public function destroy(Solution $solution)
    {
        foreach (['hero_image', 'og_image'] as $img) {
            if ($solution->{$img} && Storage::disk('public')->exists($solution->{$img})) {
                Storage::disk('public')->delete($solution->{$img});
            }
        }
        $solution->features()->delete();
        $solution->useCases()->delete();

        foreach ($solution->caseStudies as $cs) {
            $this->deleteOldCaseStudyFile($cs->logo, true);
            $this->deleteOldCaseStudyFile($cs->hero_image, false);
            $this->deleteOldCaseStudyFile($cs->secondary_image, false);
        }
        $solution->caseStudies()->delete();

        $solution->industries()->delete();
        $solution->faqs()->delete();
        $solution->delete();

        return redirect()->route('admin.solutions.index')->with('success', 'Solution deleted successfully');
    }

    /* ─── HELPERS ─── */

    private function decodeRelations(Request $request): array
    {
        $decoded = [];
        foreach (['features', 'use_cases', 'case_studies', 'industries', 'faqs'] as $key) {
            $decoded[$key] = $request->filled($key)
                ? json_decode($request->input($key), true) ?? []
                : [];
        }
        // ★ NEW — plain array field, not a JSON blob like the keys above
        $decoded['blog_ids'] = $request->input('blog_ids', []);
        return $decoded;
    }

    private function syncChildren(Solution $solution, array $decoded): void
    {
        $solution->features()->delete();
        foreach ($decoded['features'] as $i => $f) {
            $solution->features()->create([
                'title'          => $f['title'] ?? '',
                'title_ja'       => $f['title_ja'] ?? null,
                'description'    => $f['description'] ?? null,
                'description_ja' => $f['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        $solution->useCases()->delete();
        foreach ($decoded['use_cases'] as $i => $u) {
            $solution->useCases()->create([
                'title'          => $u['title'] ?? '',
                'title_ja'       => $u['title_ja'] ?? null,
                'description'    => $u['description'] ?? null,
                'description_ja' => $u['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        $solution->caseStudies()->delete();
        foreach ($decoded['case_studies'] as $i => $c) {
            $solution->caseStudies()->create([
                'slug'                => $c['slug'] ?? null,
                'title'               => $c['title'] ?? '',
                'title_ja'            => $c['title_ja'] ?? null,
                'subtitle'            => $c['subtitle'] ?? null,
                'subtitle_ja'         => $c['subtitle_ja'] ?? null,
                'company_name'        => $c['company_name'] ?? null,
                'company_name_ja'     => $c['company_name_ja'] ?? null,
                'ceo_name'            => $c['ceo_name'] ?? null,
                'ceo_name_ja'         => $c['ceo_name_ja'] ?? null,
                'logo'                => $c['logo'] ?? null,
                'hero_image'          => $c['hero_image'] ?? null,
                'secondary_image'     => $c['secondary_image'] ?? null,
                'tags'                => $c['tags'] ?? null,
                'tags_ja'             => $c['tags_ja'] ?? null,
                'hero_description'    => $c['hero_description'] ?? null,
                'hero_description_ja' => $c['hero_description_ja'] ?? null,
                'benefit'             => $c['benefit'] ?? null,
                'benefit_ja'          => $c['benefit_ja'] ?? null,
                'implementation'      => $c['implementation'] ?? null,
                'implementation_ja'   => $c['implementation_ja'] ?? null,
                'content'             => $c['content'] ?? null,
                'content_ja'          => $c['content_ja'] ?? null,
                'meta_title'          => $c['meta_title'] ?? null,
                'meta_title_ja'       => $c['meta_title_ja'] ?? null,
                'meta_description'    => $c['meta_description'] ?? null,
                'meta_description_ja' => $c['meta_description_ja'] ?? null,
                'meta_keywords'       => $c['meta_keywords'] ?? null,
                'meta_keywords_ja'    => $c['meta_keywords_ja'] ?? null,
                'og_image'            => $c['og_image'] ?? null,
                'sort_order'          => $i,
            ]);
        }

        $solution->industries()->delete();
        foreach ($decoded['industries'] as $i => $ind) {
            $solution->industries()->create([
                'title'          => $ind['title'] ?? '',
                'title_ja'       => $ind['title_ja'] ?? null,
                'description'    => $ind['description'] ?? null,
                'description_ja' => $ind['description_ja'] ?? null,
                'sort_order'     => $i,
            ]);
        }

        $solution->faqs()->delete();
        foreach ($decoded['faqs'] as $i => $f) {
            $solution->faqs()->create([
                'question'    => $f['question'] ?? '',
                'question_ja' => $f['question_ja'] ?? null,
                'answer'      => $f['answer'] ?? '',
                'answer_ja'   => $f['answer_ja'] ?? null,
                'sort_order'  => $i,
            ]);
        }

        // ★ NEW — Sync featured blogs — many-to-many via the solution_blog
        // pivot (a blog can be featured on several solutions; a solution can
        // feature several blogs). Blog content stays owned by its actual
        // parent Service (Blog.service_id) — untouched by this sync.
        $blogIds = array_values(array_filter(array_map('intval', $decoded['blog_ids'] ?? [])));
        $syncData = [];
        foreach ($blogIds as $i => $id) {
            $syncData[$id] = ['sort_order' => $i];
        }
        $solution->featuredBlogs()->sync($syncData);
    }

    /**
     * For each case study in the decoded array:
     *  - If a new file was uploaded at case_study_logos[i]/hero/secondary, store
     *    it and set the URL/path.
     *  - Otherwise preserve the existing value from $existing[i].
     * Old files are deleted from storage when replaced.
     * Also assigns a stable, unique-per-solution slug (preserved on edit).
     *
     * Mirrors IndiaDeskController::processCaseStudyMedia().
     */
    private function processCaseStudyMedia(
        Request $request,
        array $caseStudies,
        array $existing = []
    ): array {
        $usedSlugs = array_filter(array_column($caseStudies, 'slug'));

        foreach ($caseStudies as $i => &$cs) {
            // Logo (stored as full asset() URL — legacy behavior, matches India Desk)
            if ($request->hasFile("case_study_logos.{$i}")) {
                $this->deleteOldCaseStudyFile($existing[$i]['logo'] ?? null, true);
                $stored     = $request->file("case_study_logos.{$i}")->store('solutions/cs_logos', 'public');
                $cs['logo'] = asset('storage/' . $stored);
            } else {
                $cs['logo'] = $existing[$i]['logo'] ?? ($cs['logo'] ?? null);
            }

            // Hero image (relative path)
            if ($request->hasFile("case_study_hero_images.{$i}")) {
                $this->deleteOldCaseStudyFile($existing[$i]['hero_image'] ?? null, false);
                $cs['hero_image'] = $request->file("case_study_hero_images.{$i}")->store('solutions/cs_hero', 'public');
            } else {
                $cs['hero_image'] = $existing[$i]['hero_image'] ?? ($cs['hero_image'] ?? null);
            }

            // Secondary image (relative path)
            if ($request->hasFile("case_study_secondary_images.{$i}")) {
                $this->deleteOldCaseStudyFile($existing[$i]['secondary_image'] ?? null, false);
                $cs['secondary_image'] = $request->file("case_study_secondary_images.{$i}")->store('solutions/cs_secondary', 'public');
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
            $cs['slug']    = $slug;
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

    // ── add this new method ──
    public function updatePage(Request $request)
    {
        $data = $request->validate([
            'hero_title'       => 'nullable|string|max:255',
            'hero_title_ja'    => 'nullable|string|max:255',
            'hero_subtitle'    => 'nullable|string|max:255',
            'hero_subtitle_ja' => 'nullable|string|max:255',
        ]);

        SolutionPage::updateOrCreate(['id' => 1], $data);

        return back()->with('success', 'Page settings saved');
    }
}
