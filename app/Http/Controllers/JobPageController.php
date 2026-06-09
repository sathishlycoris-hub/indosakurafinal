<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use Inertia\Inertia;

class JobPageController extends Controller
{
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
                // SEO columns must be selected so the model methods work
                'meta_title', 'meta_title_ja',
                'meta_description', 'meta_description_ja',
                'meta_keywords', 'meta_keywords_ja',
                'og_image',
            ]);

        $jobs = Job::where('status', 'published')
            ->orderBy('sort_order')
            ->get(['id', 'title', 'title_ja', 'slug']);

        $lang = app()->getLocale();

        return Inertia::render('Recruitment/JobDetails', [
            'job'  => $job,
            'jobs' => $jobs,
            'pageSeo' => [
                'meta_title'       => $job->getEffectiveMetaTitle($lang),
                'meta_description' => $job->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($job->meta_keywords_ja ?? $job->meta_keywords ?? '')
                    : ($job->meta_keywords ?? ''),
                'og_image' => $job->og_image
                    ? asset('storage/' . $job->og_image)
                    : null,
            ],
        ]);
    }
}