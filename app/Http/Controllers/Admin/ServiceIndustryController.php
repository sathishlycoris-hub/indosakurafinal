<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceIndustry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceIndustryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ServiceIndustries/Index', [
            'industries' => ServiceIndustry::orderBy('sort_order')->get(),
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

        ServiceIndustry::create($data);

        return back()->with('success', 'ServiceIndustry Saved successfully');
    }

    public function update(Request $request, ServiceIndustry $serviceIndustry)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_ja' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;

        $serviceIndustry->update($data);

        return back()->with('success', 'ServiceIndustry Updated successfully');
    }


    public function destroy(ServiceIndustry $serviceIndustry)
    {
        $serviceIndustry->delete();

        return back()->with('success', 'ServiceIndustry Deleted successfully');
    }
}
