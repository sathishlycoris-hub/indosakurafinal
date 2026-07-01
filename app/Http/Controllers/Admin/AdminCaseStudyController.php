<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaseStudyPage;
use App\Models\IndiaDesk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCaseStudyController extends Controller
{
    /**
     * Read-only aggregated view. Actual editing happens inside each
     * India Desk's edit sheet (Admin/IndiaDesks/Index.tsx).
     */
    public function index()
    {
        return Inertia::render('Admin/CaseStudies/Index', [
            'caseStudies' => IndiaDesk::allCaseStudiesFlattened(),
            'pageData'    => CaseStudyPage::first(),
        ]);
    }

    public function updatePage(Request $request)
    {
        $data = $request->validate([
            'hero_title'       => 'nullable|string|max:255',
            'hero_title_ja'    => 'nullable|string|max:255',
            'hero_subtitle'    => 'nullable|string|max:255',
            'hero_subtitle_ja' => 'nullable|string|max:255',
        ]);

        CaseStudyPage::updateOrCreate(['id' => 1], $data);

        return back()->with('success', 'Page settings saved');
    }
}