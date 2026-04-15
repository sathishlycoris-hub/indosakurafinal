<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobSection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * List jobs (Admin table) — ordered by sort_order
     */
    public function index()
    {
        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => Job::with('sections')->orderBy('sort_order')->get(),
        ]);
    }

    /**
     * Store new job (Sheet - Add)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|string|max:255',
            'experience' => 'nullable|string|max:255',
            'salary' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'about_role' => 'nullable|string',

            'title_ja' => 'nullable|string|max:255',
            'department_ja' => 'nullable|string|max:255',
            'location_ja' => 'nullable|string|max:255',
            'employment_type_ja' => 'nullable|string|max:255',
            'experience_ja' => 'nullable|string|max:255',
            'salary_ja' => 'nullable|string|max:255',
            'short_description_ja' => 'nullable|string',
            'about_role_ja' => 'nullable|string',

            'status' => 'nullable|in:draft,published',

            'sections' => 'nullable|array|min:1',
            'sections.*.type' => 'nullable|in:responsibilities,requirements,preferred,offer',
            'sections.*.content' => 'nullable|string',
            'sections.*.content_ja' => 'nullable|string',
        ]);

        $job = Job::create([
            'title' => $data['title'] ?? null,
            'slug' => Str::slug($data['title'] ?? $data['title_ja']),
            'department' => $data['department'] ?? null,
            'location' => $data['location'] ?? null,
            'employment_type' => $data['employment_type'] ?? null,
            'experience' => $data['experience'] ?? null,
            'salary' => $data['salary'] ?? null,
            'short_description' => $data['short_description'] ?? null,
            'about_role' => $data['about_role'] ?? null,
            'about_role_ja' => $data['about_role_ja'] ?? null,

            'title_ja' => $data['title_ja'] ?? null,
            'department_ja' => $data['department_ja'] ?? null,
            'location_ja' => $data['location_ja'] ?? null,
            'employment_type_ja' => $data['employment_type_ja'] ?? null,
            'experience_ja' => $data['experience_ja'] ?? null,
            'salary_ja' => $data['salary_ja'] ?? null,
            'short_description_ja' => $data['short_description_ja'] ?? null,

            'status' => $data['status'],
            'sort_order' => Job::max('sort_order') + 1, // place new job at the end
        ]);

        foreach ($data['sections'] ?? [] as $index => $section) {
            JobSection::create([
                'job_id' => $job->id,
                'section_type' => $section['type'],
                'content' => $section['content'] ?? null,
                'content_ja' => $section['content_ja'] ?? null,
                'sort_order' => $index,
            ]);
        }

        return redirect()
            ->route('admin.jobs.index')
            ->with('success', 'Job created successfully');
    }

    /**
     * Update job (Sheet - Edit)
     */
    public function update(Request $request, Job $job)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|string|max:255',
            'experience' => 'nullable|string|max:255',
            'salary' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'about_role' => 'nullable|string',

            'status' => 'nullable|in:draft,published',
            'title_ja' => 'nullable|string|max:255',
            'department_ja' => 'nullable|string|max:255',
            'location_ja' => 'nullable|string|max:255',
            'employment_type_ja' => 'nullable|string|max:255',
            'experience_ja' => 'nullable|string|max:255',
            'salary_ja' => 'nullable|string|max:255',
            'short_description_ja' => 'nullable|string',
            'about_role_ja' => 'nullable|string',

            'sections' => 'nullable|array|min:1',
            'sections.*.type' => 'nullable|in:responsibilities,requirements,preferred,offer',
            'sections.*.content' => 'nullable|string',
            'sections.*.content_ja' => 'nullable|string',
        ]);

        $job->update([
            'title' => $data['title'] ?? null,
            'slug' => Str::slug(
                $data['title'] ?? $data['title_ja'] ?? $job->slug
            ),
            'department' => $data['department'] ?? null,
            'department_ja' => $data['department_ja'] ?? null,
            'location' => $data['location'] ?? null,
            'location_ja' => $data['location_ja'] ?? null,
            'employment_type' => $data['employment_type'] ?? null,
            'employment_type_ja' => $data['employment_type_ja'] ?? null,
            'experience' => $data['experience'] ?? null,
            'salary' => $data['salary'] ?? null,
            'short_description' => $data['short_description'] ?? null,
            'about_role' => $data['about_role'] ?? null,
            'title_ja' => $data['title_ja'] ?? null,
            'experience_ja' => $data['experience_ja'] ?? null,
            'salary_ja' => $data['salary_ja'] ?? null,
            'short_description_ja' => $data['short_description_ja'] ?? null,
            'about_role_ja' => $data['about_role_ja'] ?? null,
            'status' => $data['status'] ?? 'draft',
        ]);

        $job->sections()->delete();

        if (!empty($data['sections'])) {
            foreach ($data['sections'] as $index => $section) {
                JobSection::create([
                    'job_id' => $job->id,
                    'section_type' => $section['type'] ?? null,
                    'content' => $section['content'] ?? null,
                    'content_ja' => $section['content_ja'] ?? null,
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()
            ->route('admin.jobs.index')
            ->with('success', 'Job updated successfully');
    }

    /**
     * Delete job
     */
    public function destroy(Job $job)
    {
        $job->delete();

        return back()->with('success', 'Job deleted successfully');
    }

    /**
     * Reorder jobs — called via axios from the admin drag-and-drop UI.
     * Returns plain JSON (NOT Inertia) so axios handles it without errors.
     */
    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array']);

        foreach ($request->ids as $index => $id) {
            Job::where('id', $id)->update(['sort_order' => $index]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Public recruitment listing page
     */
    public function recruitment()
    {
        return Inertia::render('Recruitment', [
            'jobs' => Job::where('status', 'published')
                ->orderBy('sort_order') // respect admin ordering
                ->get([
                    'id', 'title', 'title_ja',
                    'department', 'department_ja',
                    'location', 'location_ja',
                    'employment_type', 'employment_type_ja',
                    'experience', 'experience_ja',
                    'salary', 'slug',
                ]),
        ]);
    }
}