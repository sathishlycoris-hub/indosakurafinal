<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\IndiaDeskIndustry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndiaDeskIndustryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/IndiaDeskIndustries/Index', [
            'industries' => IndiaDeskIndustry::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_ja' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;

        IndiaDeskIndustry::create($data);

        return back()->with('success', 'IndiaDeskIndustry Saved successfully');
    }

    public function update(Request $request, IndiaDeskIndustry $indiaDeskIndustry)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_ja' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;

        $indiaDeskIndustry->update($data);

        return back()->with('success', 'IndiaDeskIndustry Updated successfully');
    }


    public function destroy(IndiaDeskIndustry $indiaDeskIndustry)
    {
        $indiaDeskIndustry->delete();

        return back()->with('success', 'IndiaDeskIndustry Deleted successfully');
    }
}
