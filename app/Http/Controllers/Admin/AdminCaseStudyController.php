<?php

namespace App\Http\Controllers\Admin;

use App\Models\CaseStudy;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCaseStudyController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/CaseStudies/Index', [
            'caseStudies' => CaseStudy::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
     $data = $request->validate([
    'title' => 'required|string|max:255',
    'title_ja' => 'nullable|string|max:255',

    'subtitle' => 'nullable|string|max:255',
    'subtitle_ja' => 'nullable|string|max:255',

    'slug' => 'required|unique:case_studies,slug',

    'hero_description' => 'nullable|string',
    'hero_description_ja' => 'nullable|string',

    'content' => 'nullable|string',
    'content_ja' => 'nullable|string',

    'benefit' => 'nullable|string',
    'benefit_ja' => 'nullable|string',

    'implementation' => 'nullable|string',
    'implementation_ja' => 'nullable|string',

    'tags' => 'nullable|string',

    'hero_image' => 'nullable|image|max:4096',
]);

        if ($request->hasFile('hero_image')) {
            $data['hero_image'] = $request->file('hero_image')->store('cases', 'public');
        }

        // sections from React
        // $data['sections'] = json_decode($request->sections, true);

        CaseStudy::create($data);

        return back()->with('success', 'Case study created successfully');
    }

    public function update(Request $request, CaseStudy $caseStudy)
    {
       $data = $request->validate([
    'title' => 'required|string|max:255',
    'title_ja' => 'nullable|string|max:255',

    'subtitle' => 'nullable|string|max:255',
    'subtitle_ja' => 'nullable|string|max:255',

    'slug' => 'required|unique:case_studies,slug,' . $caseStudy->id,

    'hero_description' => 'nullable|string',
    'hero_description_ja' => 'nullable|string',

    'content' => 'nullable|string',
    'content_ja' => 'nullable|string',

    'benefit' => 'nullable|string',
    'benefit_ja' => 'nullable|string',

    'implementation' => 'nullable|string',
    'implementation_ja' => 'nullable|string',

    'tags' => 'nullable|string',

    'hero_image' => 'nullable|image|max:4096',

    'secondary_image' => 'nullable|image|max:4096',   // NEW
]);

        if ($request->hasFile('hero_image')) {
            $data['hero_image'] = $request->file('hero_image')->store('cases', 'public');
        }

        if ($request->hasFile('secondary_image')) {
    $data['secondary_image'] = $request->file('secondary_image')->store('cases', 'public');
}

        // $data['sections'] = json_decode($request->sections, true);

        $caseStudy->update($data);

        return back()->with('success', 'Case study updated successfully');
    }

    public function destroy(CaseStudy $caseStudy)
    {
        $caseStudy->delete();

        return back()->with('success', 'Case study deleted');
    }
}
