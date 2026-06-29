<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index(Request $request, $job = null)
    {
        $query = JobApplication::with('job')->latest();

        if ($job) {
            $query->where('job_id', $job);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhereHas('job', function ($q2) use ($search) {
                      $q2->where('title', 'like', "%{$search}%")
                         ->orWhere('department', 'like', "%{$search}%");
                  });
            });
        }

        $paginated = $query->paginate(10);

        return Inertia::render('Admin/JobApplication/Index', [
            'applications' => $paginated->appends($request->query()),
            'filters'      => $request->only('search'),
        ]);
    }

    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return back()->with('success', 'Application deleted.');
    }
}