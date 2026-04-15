<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobSection;
use Illuminate\Http\Request;

class JobSectionController extends Controller
{
    /**
     * Store a single section (optional / AJAX usage)
     */
    public function store(Request $request, Job $job)
    {
        $data = $request->validate([
            'section_type' => 'required|in:responsibilities,requirements,preferred,offer',
            'content' => 'required|string',
            'sort_order' => 'nullable|integer',
        ]);

        $section = JobSection::create([
            'job_id' => $job->id,
            'section_type' => $data['section_type'],
            'content' => $data['content'],
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return response()->json([
            'message' => 'Section created',
            'section' => $section,
        ]);
    }

    /**
     * Update a section
     */
    public function update(Request $request, JobSection $jobSection)
    {
        $data = $request->validate([
            'content' => 'required|string',
            'sort_order' => 'nullable|integer',
        ]);

        $jobSection->update($data);

        return response()->json([
            'message' => 'Section updated',
            'section' => $jobSection,
        ]);
    }

    /**
     * Delete a section
     */
    public function destroy(JobSection $jobSection)
    {
        $jobSection->delete();

        return response()->json([
            'message' => 'Section deleted',
        ]);
    }

    /**
     * Reorder sections (drag & drop support)
     */
    public function reorder(Request $request, Job $job)
    {
        $data = $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|exists:job_sections,id',
            'sections.*.sort_order' => 'required|integer',
        ]);

        foreach ($data['sections'] as $section) {
            JobSection::where('id', $section['id'])
                ->where('job_id', $job->id)
                ->update(['sort_order' => $section['sort_order']]);
        }

        return response()->json([
            'message' => 'Sections reordered',
        ]);
    }
}
