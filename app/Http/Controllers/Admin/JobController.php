<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobSection;
use App\Models\Seo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => Job::with('sections')->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'                => 'nullable|string|max:255',
            'department'           => 'nullable|string|max:255',
            'location'             => 'nullable|string|max:255',
            'employment_type'      => 'nullable|string|max:255',
            'experience'           => 'nullable|string|max:255',
            'salary'               => 'nullable|string|max:255',
            'short_description'    => 'nullable|string',
            'about_role'           => 'nullable|string',
            'title_ja'             => 'nullable|string|max:255',
            'department_ja'        => 'nullable|string|max:255',
            'location_ja'          => 'nullable|string|max:255',
            'employment_type_ja'   => 'nullable|string|max:255',
            'experience_ja'        => 'nullable|string|max:255',
            'salary_ja'            => 'nullable|string|max:255',
            'short_description_ja' => 'nullable|string',
            'about_role_ja'        => 'nullable|string',
            'status'               => 'nullable|in:draft,published',
            'sections'             => 'nullable|array',
            'sections.*.type'      => 'nullable|in:responsibilities,requirements,preferred,offer',
            'sections.*.content'   => 'nullable|string',
            'sections.*.content_ja'=> 'nullable|string',
            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('jobs/og', 'public');
        }

        $job = Job::create([
            'title'             => $data['title'] ?? null,
            'slug'              => Str::slug($data['title'] ?? $data['title_ja'] ?? ''),
            'department'        => $data['department'] ?? null,
            'location'          => $data['location'] ?? null,
            'employment_type'   => $data['employment_type'] ?? null,
            'experience'        => $data['experience'] ?? null,
            'salary'            => $data['salary'] ?? null,
            'short_description' => $data['short_description'] ?? null,
            'about_role'        => $data['about_role'] ?? null,
            'about_role_ja'     => $data['about_role_ja'] ?? null,
            'title_ja'          => $data['title_ja'] ?? null,
            'department_ja'     => $data['department_ja'] ?? null,
            'location_ja'       => $data['location_ja'] ?? null,
            'employment_type_ja'=> $data['employment_type_ja'] ?? null,
            'experience_ja'     => $data['experience_ja'] ?? null,
            'salary_ja'         => $data['salary_ja'] ?? null,
            'short_description_ja' => $data['short_description_ja'] ?? null,
            'status'            => $data['status'] ?? 'draft',
            'sort_order'        => Job::max('sort_order') + 1,
            // SEO
            'meta_title'           => $data['meta_title'] ?? null,
            'meta_title_ja'        => $data['meta_title_ja'] ?? null,
            'meta_description'     => $data['meta_description'] ?? null,
            'meta_description_ja'  => $data['meta_description_ja'] ?? null,
            'meta_keywords'        => $data['meta_keywords'] ?? null,
            'meta_keywords_ja'     => $data['meta_keywords_ja'] ?? null,
            'og_image'             => $data['og_image'] ?? null,
        ]);

        foreach ($data['sections'] ?? [] as $index => $section) {
            JobSection::create([
                'job_id'       => $job->id,
                'section_type' => $section['type'],
                'content'      => $section['content'] ?? null,
                'content_ja'   => $section['content_ja'] ?? null,
                'sort_order'   => $index,
            ]);
        }

        return redirect()->route('admin.jobs.index')->with('success', 'Job created successfully');
    }

    public function update(Request $request, Job $job)
    {
        $data = $request->validate([
            'title'                => 'nullable|string|max:255',
            'department'           => 'nullable|string|max:255',
            'location'             => 'nullable|string|max:255',
            'employment_type'      => 'nullable|string|max:255',
            'experience'           => 'nullable|string|max:255',
            'salary'               => 'nullable|string|max:255',
            'short_description'    => 'nullable|string',
            'about_role'           => 'nullable|string',
            'status'               => 'nullable|in:draft,published',
            'title_ja'             => 'nullable|string|max:255',
            'department_ja'        => 'nullable|string|max:255',
            'location_ja'          => 'nullable|string|max:255',
            'employment_type_ja'   => 'nullable|string|max:255',
            'experience_ja'        => 'nullable|string|max:255',
            'salary_ja'            => 'nullable|string|max:255',
            'short_description_ja' => 'nullable|string',
            'about_role_ja'        => 'nullable|string',
            'sections'             => 'nullable|array',
            'sections.*.type'      => 'nullable|in:responsibilities,requirements,preferred,offer',
            'sections.*.content'   => 'nullable|string',
            'sections.*.content_ja'=> 'nullable|string',
            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('og_image')) {
            if ($job->og_image) Storage::disk('public')->delete($job->og_image);
            $data['og_image'] = $request->file('og_image')->store('jobs/og', 'public');
        } else {
            unset($data['og_image']); // don't overwrite existing
        }

        $job->update([
            'title'             => $data['title'] ?? null,
            'slug'              => Str::slug($data['title'] ?? $data['title_ja'] ?? $job->slug),
            'department'        => $data['department'] ?? null,
            'department_ja'     => $data['department_ja'] ?? null,
            'location'          => $data['location'] ?? null,
            'location_ja'       => $data['location_ja'] ?? null,
            'employment_type'   => $data['employment_type'] ?? null,
            'employment_type_ja'=> $data['employment_type_ja'] ?? null,
            'experience'        => $data['experience'] ?? null,
            'experience_ja'     => $data['experience_ja'] ?? null,
            'salary'            => $data['salary'] ?? null,
            'salary_ja'         => $data['salary_ja'] ?? null,
            'short_description' => $data['short_description'] ?? null,
            'short_description_ja' => $data['short_description_ja'] ?? null,
            'about_role'        => $data['about_role'] ?? null,
            'about_role_ja'     => $data['about_role_ja'] ?? null,
            'status'            => $data['status'] ?? 'draft',
            // SEO
            'meta_title'           => $data['meta_title'] ?? null,
            'meta_title_ja'        => $data['meta_title_ja'] ?? null,
            'meta_description'     => $data['meta_description'] ?? null,
            'meta_description_ja'  => $data['meta_description_ja'] ?? null,
            'meta_keywords'        => $data['meta_keywords'] ?? null,
            'meta_keywords_ja'     => $data['meta_keywords_ja'] ?? null,
        ] + (isset($data['og_image']) ? ['og_image' => $data['og_image']] : []));

        $job->sections()->delete();
        foreach ($data['sections'] ?? [] as $index => $section) {
            JobSection::create([
                'job_id'       => $job->id,
                'section_type' => $section['type'] ?? null,
                'content'      => $section['content'] ?? null,
                'content_ja'   => $section['content_ja'] ?? null,
                'sort_order'   => $index,
            ]);
        }

        return redirect()->route('admin.jobs.index')->with('success', 'Job updated successfully');
    }

    public function destroy(Job $job)
    {
        if ($job->og_image) Storage::disk('public')->delete($job->og_image);
        $job->delete();
        return back()->with('success', 'Job deleted successfully');
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        foreach ($request->ids as $index => $id) {
            Job::where('id', $id)->update(['sort_order' => $index]);
        }
        return response()->json(['success' => true]);
    }

    public function recruitment()
    {
        return Inertia::render('Recruitment', [
            'jobs' => Job::where('status', 'published')
                ->orderBy('sort_order')
                ->get([
                    'id', 'title', 'title_ja',
                    'department', 'department_ja',
                    'location', 'location_ja',
                    'employment_type', 'employment_type_ja',
                    'experience', 'experience_ja',
                    'salary', 'slug',
                ]),
            'seo' => Seo::where('page', 'recruitment')->first(),
        ]);
    }
}