<?php

namespace App\Http\Controllers\Admin;

use App\Models\Service;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class ServiceController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [

            'services' => Service::with([
                'highlights',
                'benefits',
                // 'industries',
            ])
                ->latest()
                ->get(),
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',
            'slug' => 'nullable|string|unique:services',
            'subtitle' => 'nullable|string',
            'subtitle_ja' => 'nullable|string',
            'hero_description' => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'how_it_works' => 'nullable|string',
            'how_it_works_ja' => 'nullable|string',
            'hero_image' => 'nullable|image|max:4096',

            'highlights' => 'nullable',
            'benefits' => 'nullable',
            'industries' => 'nullable',
        ]);

        // Decode JSON arrays (FormData sends strings)
        foreach (['highlights', 'benefits'] as $key) {
            $data[$key] = $request->filled($key)
                ? json_decode($request->input($key), true)
                : [];
        }

        DB::transaction(function () use ($request, $data) {

            // Handle hero image
            if ($request->hasFile('hero_image')) {
                $data['hero_image'] = $request->file('hero_image')
                    ->store('services', 'public');
            }

            // Create service
            $service = Service::create([
                'title' => $data['title'],
                'title_ja' => $request->title_ja ?? null,

                'slug' => $data['slug'],

                'subtitle' => $data['subtitle'] ?? null,
                'subtitle_ja' => $request->subtitle_ja ?? null,

                'hero_description' => $data['hero_description'] ?? null,
                'hero_description_ja' => $request->hero_description_ja ?? null,

                'how_it_works' => $data['how_it_works'] ?? null,
                'how_it_works_ja' => $request->how_it_works_ja ?? null,

                'hero_image' => $data['hero_image'] ?? null,
            ]);

            // Highlights
            foreach ($data['highlights'] as $i => $item) {
                $service->highlights()->create([
                    'title' => $item['title'] ?? '',
                    'title_ja' => $item['title_ja'] ?? null,
                    'value' => $item['value'] ?? null,
                    'description' => $item['description'] ?? null,
                    'description_ja' => $item['description_ja'] ?? null,
                    'sort_order' => $i,
                ]);
            }

            // Benefits
            foreach ($data['benefits'] as $i => $item) {
                $service->benefits()->create([
                    'title' => $item['title'] ?? '',
                    'title_ja' => $item['title_ja'] ?? null,
                    'description' => $item['description'] ?? null,
                    'description_ja' => $item['description_ja'] ?? null,
                    'sort_order' => $i,
                ]);
            }

            // Industries
            // foreach ($data['industries'] as $i => $item) {
            //     $service->industries()->create([
            //         'title' => $item['title'] ?? '',
            //         'description' => $item['description'] ?? null,
            //         'sort_order' => $i,
            //     ]);
            // }
        });


        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service save successfully');
    }


    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',
            'slug' => 'nullable|string|unique:services,slug,' . $service->id,
            'subtitle' => 'nullable|string',
            'subtitle_ja' => 'nullable|string',
            'hero_description' => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'how_it_works' => 'nullable|string',
            'how_it_works_ja' => 'nullable|string',
            'hero_image' => 'nullable|image|max:4096',

            'highlights' => 'nullable',
            'benefits' => 'nullable',
            // 'industries' => 'nullable',
        ]);

        // Decode JSON
        foreach (['highlights', 'benefits'] as $key) {
            $data[$key] = $request->filled($key)
                ? json_decode($request->input($key), true)
                : [];
        }

        DB::transaction(function () use ($request, $service, $data) {

            // IMAGE (optional replace)
            if ($request->hasFile('hero_image')) {
                if ($service->hero_image) {
                    Storage::disk('public')->delete($service->hero_image);
                }

                $data['hero_image'] = $request->file('hero_image')
                    ->store('services', 'public');
            }

            // Update main service
            $service->update([
                'title' => $data['title'],
                'title_ja' => $request->title_ja ?? null,
                'slug' => $data['slug'],
                'subtitle' => $data['subtitle'] ?? null,
                'subtitle_ja' => $request->subtitle_ja ?? null,
                'hero_description' => $data['hero_description'] ?? null,
                'hero_description_ja' => $request->hero_description_ja ?? null,
                'how_it_works' => $data['how_it_works'] ?? null,
                'how_it_works_ja' => $request->how_it_works_ja ?? null,
            ]);

            // Clear relations
            $service->highlights()->delete();
            $service->benefits()->delete();
            // $service->industries()->delete();

            // Re-create highlights
            foreach ($data['highlights'] as $i => $item) {
                $service->highlights()->create([
                    'title' => $item['title'] ?? '',
                    'title_ja' => $item['title_ja'] ?? null,
                    'value' => $item['value'] ?? null,
                    'description' => $item['description'] ?? null,
                    'description_ja' => $item['description_ja'] ?? null,
                    'sort_order' => $i,
                ]);
            }

            // Re-create benefits
            foreach ($data['benefits'] as $i => $item) {
                $service->benefits()->create([
                    'title' => $item['title'] ?? '',
                    'description' => $item['description'] ?? null,
                    'sort_order' => $i,
                ]);
            }

            // Re-create industries
            // foreach ($data['industries'] as $i => $item) {
            //     $service->industries()->create([
            //         'title' => $item['title'] ?? '',
            //         'description' => $item['description'] ?? null,
            //         'sort_order' => $i,
            //     ]);
            // }
        });

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service Updated successfully');
    }

    public function show(Service $service)
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::with(['highlights', 'benefits'])->get(),
            'service' => $service->load(['highlights', 'benefits']),
        ]);
    }

    public function destroy(Service $service)
    {
        DB::transaction(function () use ($service) {

            // Delete hero image
            if ($service->hero_image) {
                Storage::disk('public')->delete($service->hero_image);
            }

            // Delete relations
            $service->highlights()->delete();
            $service->benefits()->delete();
            // $service->industries()->delete();

            // Delete service
            $service->delete();
        });

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service deleted successfully');
    }
}
