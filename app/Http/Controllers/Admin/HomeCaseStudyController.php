<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeCaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomeCaseStudyController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/HomeCaseStudies/Index', [
            'homeCaseStudies' => HomeCaseStudy::orderBy('sort_order')->orderByDesc('id')->get(),
        ]);
    }

    private function rules(?int $ignoreId = null): array
    {
        $slugRule = $ignoreId
            ? 'required|string|max:255|unique:home_case_studies,slug,' . $ignoreId
            : 'required|string|max:255|unique:home_case_studies,slug';

        return [
            'title'               => 'required|string|max:255',
            'title_ja'            => 'nullable|string|max:255',
            'slug'                => $slugRule,
            'subtitle'            => 'nullable|string|max:255',
            'subtitle_ja'         => 'nullable|string|max:255',
            'company_name'        => 'nullable|string|max:255',
            'company_name_ja'     => 'nullable|string|max:255',
            'ceo_name'            => 'nullable|string|max:255',
            'ceo_name_ja'         => 'nullable|string|max:255',
            'tags'                => 'nullable|string|max:255',
            'tags_ja'             => 'nullable|string|max:255',
            'hero_description'    => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'benefit'             => 'nullable|string',
            'benefit_ja'          => 'nullable|string',
            'implementation'      => 'nullable|string',
            'implementation_ja'   => 'nullable|string',
            'content'             => 'nullable|string',
            'content_ja'          => 'nullable|string',
            'sort_order'          => 'nullable|integer',
            'logo'                => 'nullable|image|max:2048',
            'hero_image'          => 'nullable|image|max:4096',
            'secondary_image'     => 'nullable|image|max:4096',
            'meta_title'          => 'nullable|string|max:255',
            'meta_title_ja'       => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_description_ja' => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
            'meta_keywords_ja'    => 'nullable|string|max:500',
            'og_image'            => 'nullable|image|max:4096',
        ];
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        if ($data['slug'] === '') {
            $data['slug'] = Str::slug($request->input('title', 'case-study-' . time()));
        }

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('home-casestudies/logos', 'public');
        }
        if ($request->hasFile('hero_image')) {
            $data['hero_image'] = $request->file('hero_image')->store('home-casestudies/hero', 'public');
        }
        if ($request->hasFile('secondary_image')) {
            $data['secondary_image'] = $request->file('secondary_image')->store('home-casestudies/secondary', 'public');
        }
        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('home-casestudies/og', 'public');
        }

        HomeCaseStudy::create($data);

        return back()->with('success', 'Home case study created successfully.');
    }

    public function update(Request $request, HomeCaseStudy $homeCaseStudy)
    {
        $data = $request->validate($this->rules($homeCaseStudy->id));

        if ($data['slug'] === '') {
            $data['slug'] = $homeCaseStudy->slug;
        }

        foreach (['logo', 'hero_image', 'secondary_image', 'og_image'] as $field) {
            if ($request->hasFile($field)) {
                if ($homeCaseStudy->{$field} && Storage::disk('public')->exists($homeCaseStudy->{$field})) {
                    Storage::disk('public')->delete($homeCaseStudy->{$field});
                }
                $folder = $field === 'og_image' ? 'home-casestudies/og' : "home-casestudies/{$field}";
                $data[$field] = $request->file($field)->store($folder, 'public');
            } else {
                unset($data[$field]);
            }
        }

        $homeCaseStudy->update($data);

        return back()->with('success', 'Home case study updated successfully.');
    }

    public function destroy(HomeCaseStudy $homeCaseStudy)
    {
        foreach (['logo', 'hero_image', 'secondary_image', 'og_image'] as $field) {
            if ($homeCaseStudy->{$field} && Storage::disk('public')->exists($homeCaseStudy->{$field})) {
                Storage::disk('public')->delete($homeCaseStudy->{$field});
            }
        }

        $homeCaseStudy->delete();

        return back()->with('success', 'Home case study deleted successfully.');
    }
}
