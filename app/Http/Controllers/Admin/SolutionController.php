<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Solution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;



class SolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/Solutions/Index', [
            'solutions' => Solution::with(['features', 'useCases', 'caseStudies', 'industries'])
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',
            'slug' => 'nullable|string|unique:solutions',
            'subtitle' => 'nullable|string',
            'subtitle_ja' => 'nullable|string',
            'hero_description' => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'hero_image' => 'nullable|image|max:4096',
            'link' => 'nullable|string',
            'features' => 'nullable',
            'features_ja' => 'nullable',
            'use_cases' => 'nullable',
            'use_cases_ja' => 'nullable',
            'case_studies' => 'nullable',
            'case_studies_ja' => 'nullable',
            'industries' => 'nullable',
            'industries_ja' => 'nullable',
        ]);

        // 2Decode JSON arrays (FormData sends strings)
        foreach (['features', 'use_cases', 'case_studies', 'industries'] as $key) {
            if ($request->filled($key)) {
                $data[$key] = json_decode($request->input($key), true) ?? [];
            } else {
                $data[$key] = [];
            }
        }

        //  Handle hero image
        if ($request->hasFile('hero_image')) {
            $data['hero_image'] = $request->file('hero_image')
                ->store('solutions', 'public');
        }

        //  Create solution
        $solution = Solution::create([
            'title' => $data['title'],
            'title_ja' => $data['title_ja'] ?? null,

            'subtitle' => $data['subtitle'] ?? null,
            'subtitle_ja' => $data['subtitle_ja'] ?? null,
            
            'hero_description' => $data['hero_description'] ?? null,
            'hero_description_ja' => $data['hero_description_ja'] ?? null,

            'slug' => $data['slug'],
            'link' => $data['link'] ?? null,

            'hero_image' => $data['hero_image'] ?? null,
        ]);

        // Features
        foreach ($data['features'] as $i => $feature) {
            $solution->features()->create([
                'title' => $feature['title'] ?? '',
                'title_ja' => $feature['title_ja'] ?? null,
                'description' => $feature['description'] ?? null,
                'description_ja' => $feature['description_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        //  Use cases
        foreach ($data['use_cases'] as $i => $useCase) {
            $solution->useCases()->create([
                'title' => $useCase['title'] ?? '',
                'title_ja' => $useCase['title_ja'] ?? null,
                'description' => $useCase['description'] ?? null,
                'description_ja' => $useCase['description_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        //  Case studies
        foreach ($data['case_studies'] as $i => $caseStudy) {
            $solution->caseStudies()->create([
                'title' => $caseStudy['title'] ?? '',
                'title_ja' => $caseStudy['title_ja'] ?? null,
                'summary' => $caseStudy['summary'] ?? null,
                'summary_ja' => $caseStudy['summary_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        // Industries
        foreach ($data['industries'] as $i => $industry) {
            $solution->industries()->create([
                'title' => $industry['title'] ?? '',
                'title_ja' => $industry['title_ja'] ?? null,
                'description' => $industry['description'] ?? null,
                'description_ja' => $industry['description_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        return redirect()
            ->route('admin.solutions.index')
            ->with('success', 'Solution created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Solution $solution)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solution $solution)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Solution $solution)
    {
        //
        // 1️⃣ Validate
        $data = $request->validate([
            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',

            'subtitle' => 'nullable|string',
            'subtitle_ja' => 'nullable|string',

            'hero_description' => 'nullable|string',
            'hero_description_ja' => 'nullable|string',

            'slug' => 'nullable|string|unique:solutions,slug,' . ($solution->id ?? 'NULL'),

            'hero_image' => 'nullable|image|max:4096',
            'link' => 'nullable|string',
            'features' => 'nullable',
            'use_cases' => 'nullable',
            'case_studies' => 'nullable',
            'industries' => 'nullable',
        ]);

        // 2️⃣ Decode JSON arrays
        foreach (['features', 'use_cases', 'case_studies', 'industries'] as $key) {
            if ($request->filled($key)) {
                $data[$key] = json_decode($request->input($key), true) ?? [];
            } else {
                $data[$key] = [];
            }
        }

        // 3️⃣ Hero image replace (delete old)
        if ($request->hasFile('hero_image')) {
            if ($solution->hero_image) {
                Storage::disk('public')->delete($solution->hero_image);
            }

            $data['hero_image'] = $request->file('hero_image')
                ->store('solutions', 'public');
        }

        // 4️⃣ Update solution
        $solution->update([
            'title' => $data['title'],
            'title_ja' => $data['title_ja'] ?? null,
            'slug' => $data['slug'],
            'subtitle' => $data['subtitle'] ?? null,
            'subtitle_ja' => $data['subtitle_ja'] ?? null,
            'hero_description' => $data['hero_description'] ?? null,
            'hero_description_ja' => $data['hero_description_ja'] ?? null,
            'hero_image' => $data['hero_image'] ?? $solution->hero_image,
            'link' => $data['link'] ?? null,
        ]);

        // 5️⃣ Sync children (delete → recreate)

        $solution->features()->delete();
        foreach ($data['features'] as $i => $feature) {
            $solution->features()->create([
                'title' => $feature['title'] ?? '',
                'title_ja' => $feature['title_ja'] ?? null,
                'description' => $feature['description'] ?? null,
                'description_ja' => $feature['description_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        $solution->useCases()->delete();
        foreach ($data['use_cases'] as $i => $useCase) {
            $solution->useCases()->create([
                'title' => $useCase['title'] ?? '',
                'title_ja' => $useCase['title_ja'] ?? null,
                'description' => $useCase['description'] ?? null,
                'description_ja' => $useCase['description_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        $solution->caseStudies()->delete();
        foreach ($data['case_studies'] as $i => $caseStudy) {
            $solution->caseStudies()->create([
                'title' => $caseStudy['title'] ?? '',
                'title_ja' => $caseStudy['title_ja'] ?? null,
                'summary' => $caseStudy['summary'] ?? null,
                'summary_ja' => $caseStudy['summary_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        $solution->industries()->delete();
        foreach ($data['industries'] as $i => $industry) {
            $solution->industries()->create([
                'title' => $industry['title'] ?? '',
                'title_ja' => $industry['title_ja'] ?? null,
                'description' => $industry['description'] ?? null,
                'description_ja' => $industry['description_ja'] ?? null,
                'sort_order' => $i,
            ]);
        }

        return redirect()
            ->route('admin.solutions.index')
            ->with('success', 'Solution deleted successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solution $solution)
    {

        if ($solution->hero_image && Storage::disk('public')->exists($solution->hero_image)) {
            Storage::disk('public')->delete($solution->hero_image);
        }


        $solution->features()->delete();
        $solution->useCases()->delete();
        $solution->caseStudies()->delete();
        $solution->industries()->delete();


        $solution->delete();

        return redirect()
            ->route('admin.solutions.index')
            ->with('success', 'Solution deleted successfully');
    }
}
