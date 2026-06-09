<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Solution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SolutionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Solutions/Index', [
            'solutions' => Solution::with(['features', 'useCases', 'caseStudies', 'industries'])
                ->latest()->get(),
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
        ]);

        $decoded = $this->decodeRelations($request);

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
        ]);

        $decoded = $this->decodeRelations($request);

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
        $solution->caseStudies()->delete();
        $solution->industries()->delete();
        $solution->delete();

        return redirect()->route('admin.solutions.index')->with('success', 'Solution deleted successfully');
    }

    /* ─── HELPERS ─── */

    private function decodeRelations(Request $request): array
    {
        $decoded = [];
        foreach (['features', 'use_cases', 'case_studies', 'industries'] as $key) {
            $decoded[$key] = $request->filled($key)
                ? json_decode($request->input($key), true) ?? []
                : [];
        }
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
                'title'      => $c['title'] ?? '',
                'title_ja'   => $c['title_ja'] ?? null,
                'summary'    => $c['summary'] ?? null,
                'summary_ja' => $c['summary_ja'] ?? null,
                'sort_order' => $i,
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
    }
}