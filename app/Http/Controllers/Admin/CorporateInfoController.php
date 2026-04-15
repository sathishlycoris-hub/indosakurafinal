<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CorporateInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CorporateInfoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/CorporateInfo/Index', [
            'items' => CorporateInfo::orderBy('sort_order')->get()
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

    // ✅ If new image uploaded
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('corporate', 'public');
    } else {
        // ✅ KEEP OLD IMAGE
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
}