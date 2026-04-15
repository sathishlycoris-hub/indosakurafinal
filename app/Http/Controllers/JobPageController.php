<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use Inertia\Inertia;

class JobPageController extends Controller
{
    /**
     * Public recruitment listing — ordered by sort_order set in admin.
     */
    public function index()
    {
        $jobs = Job::where('status', 'published')
            ->orderBy('sort_order')
            ->get([
                'id', 'title', 'title_ja',
                'department', 'department_ja',
                'location', 'location_ja',
                'employment_type', 'employment_type_ja',
                'experience', 'experience_ja',
                'salary', 'slug',
            ]);

        return Inertia::render('Recruitment/Index', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Public job detail page.
     */
    public function show(string $slug)
    {
        $job = Job::where('slug', $slug)
            ->where('status', 'published')
            ->with(['sections' => fn($q) => $q->orderBy('sort_order')])
            ->firstOrFail([
                'id', 'title', 'title_ja',
                'department', 'department_ja',
                'location', 'location_ja',
                'employment_type', 'employment_type_ja',
                'experience', 'experience_ja',
                'salary', 'salary_ja',
                'short_description', 'short_description_ja',
                'about_role', 'about_role_ja',
                'slug', 'status',
            ]);

        $jobs = Job::where('status', 'published')
            ->orderBy('sort_order')
            ->get(['id', 'title', 'title_ja', 'slug']);

        return Inertia::render('Recruitment/JobDetails', [
            'job'  => $job,
            'jobs' => $jobs,
        ]);
    }
}