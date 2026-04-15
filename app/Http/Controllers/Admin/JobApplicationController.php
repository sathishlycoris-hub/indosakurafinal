<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    //
    public function index(Request $request, $job = null)
    {
        $query = JobApplication::with('job')->latest();

        if ($job) {
            $query->where('job_id', $job);
        }

        return Inertia::render('Admin/JobApplication/Index', [
            'applications' => $query->get(),
        ]);
    }

    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return back()->with('success', 'Application deleted.');
    }
}
