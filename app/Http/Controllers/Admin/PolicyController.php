<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Policy;
use App\Models\PolicySection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PolicyController extends Controller
{
    /**
     * List policies
     */
    public function index()
    {
        return Inertia::render('Admin/Policy/Index', [
            'policies' => Policy::with('sections')
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    /**
     * Store policy
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',

            'slug'  => 'nullable|string|max:255|unique:policies,slug',

            'intro' => 'nullable|string',
            'intro_ja' => 'nullable|string',

            'sections' => 'nullable|array|min:1',

            'sections.*.title' => 'nullable|string|max:255',
            'sections.*.title_ja' => 'nullable|string|max:255',

            'sections.*.description' => 'nullable|string',
            'sections.*.description_ja' => 'nullable|string',
        ]);

        $policy = Policy::create([
            'title' => $data['title'],
            'title_ja' => $data['title_ja'] ?? null,
            'slug' => Str::slug($data['slug']),
            'intro' => $data['intro'],
            'intro_ja' => $data['intro_ja'] ?? null,
        ]);

        foreach ($data['sections'] as $index => $section) {
            PolicySection::create([
                'policy_id' => $policy->id,
                'title' => $section['title'],
                'title_ja' => $section['title_ja'] ?? null,
                'description' => $section['description'],
                'description_ja' => $section['description_ja'] ?? null,
                'sort_order' => $index,
            ]);
        }

        return redirect()
            ->route('admin.policy.index')
            ->with('success', 'Policy created successfully');
    }

    /**
     * Update policy
     */
    public function update(Request $request, Policy $policy)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',

            'slug'  => 'nullable|string|max:255|unique:policies,slug,' . $policy->id,

            'intro' => 'nullable|string',
            'intro_ja' => 'nullable|string',

            'sections' => 'nullable|array|min:1',

            'sections.*.title' => 'nullable|string|max:255',
            'sections.*.title_ja' => 'nullable|string|max:255',

            'sections.*.description' => 'nullable|string',
            'sections.*.description_ja' => 'nullable|string',
        ]);

        $policy->update([
            'title' => $data['title'],
            'title_ja' => $data['title_ja'] ?? null,
            'slug' => Str::slug($data['slug']),
            'intro' => $data['intro'],
            'intro_ja' => $data['intro_ja'] ?? null,
        ]);

        // Remove old sections
        $policy->sections()->delete();

        foreach ($data['sections'] as $index => $section) {
            PolicySection::create([
                'policy_id' => $policy->id,
                'title' => $section['title'],
                'title_ja' => $section['title_ja'] ?? null,
                'description' => $section['description'],
                'description_ja' => $section['description_ja'] ?? null,
                'sort_order' => $index,
            ]);
        }

        return redirect()
            ->route('admin.policy.index')
            ->with('success', 'Policy updated successfully');
    }

    /**
     * Delete policy
     */
    public function destroy(Policy $policy)
    {
        $policy->delete();

        return back()->with('success', 'Policy deleted successfully');
    }
}