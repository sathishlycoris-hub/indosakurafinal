<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CorporateInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CorporateInfoPage;
class CorporateInfoController extends Controller
{
    public function index()
{
    return Inertia::render('Admin/CorporateInfo/Index', [
        'items'    => CorporateInfo::orderBy('sort_order')->get(),
        'pageData' => CorporateInfoPage::first(), 
    ]);
}
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',
            'path' => 'nullable|string',
            'image' => 'nullable|image|max:max:4096',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('corporate', 'public');
        }

        CorporateInfo::create($data);

        return back()->with('success', 'Created');
    }

   public function update(Request $request, CorporateInfo $corporateInfo)
{
    $data = $request->validate([
        'title' => 'nullable|string',
        'title_ja' => 'nullable|string',
        'path' => 'nullable|string',
        'image' => 'nullable|image|max:4096',
    ]);

    //  If new image uploaded
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('corporate', 'public');
    } else {
        //  KEEP OLD IMAGE
        $data['image'] = $corporateInfo->image;
    }

    $corporateInfo->update($data);

    return back()->with('success', 'Updated');
}
    public function destroy(CorporateInfo $corporateInfo)
    {
        $corporateInfo->delete();
        return back()->with('success', 'Deleted');
    }

     // ── NEW: save page-level hero fields ──
    public function updatePage(Request $request)
    {
        $data = $request->validate([
            'hero_title'    => 'nullable|string|max:255',
            'hero_title_ja' => 'nullable|string|max:255',
            'hero_subtitle'    => 'nullable|string|max:255',
            'hero_subtitle_ja' => 'nullable|string|max:255',
        ]);

        CorporateInfoPage::updateOrCreate(['id' => 1], $data);

        return back()->with('success', 'Page settings saved');
    }
}